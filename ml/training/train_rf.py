"""
Baseline Random Forest Model Training & Serialization for FloodCast AI (India-Wide)
- Uses multi-region temporal split (Train: <=2022, Val: Odisha 2022, Test: Assam 2024 Holdout)
- Outputs probability score P(flood=1) -> scaled to 0-100 spatial risk score
- Computes genuine metrics (ROC-AUC, PR-AUC, F1, Precision, Recall, Brier Score)
- Computes feature importances
- Saves model to models/floodcast_rf.joblib and metadata to models/model_metadata.json
"""

import os
import json
import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    roc_auc_score,
    average_precision_score,
    precision_score,
    recall_score,
    f1_score,
    accuracy_score,
    brier_score_loss
)
from ..preprocessing.dataset import build_dataset_for_events, audit_temporal_leakage
from config.settings import FEATURE_COLUMNS, RISK_CATEGORIES

def train_baseline_model(
    dataset_path: str = "data/processed/training_dataset.parquet",
    model_output_path: str = "models/floodcast_rf.joblib",
    metadata_output_path: str = "models/model_metadata.json"
):
    os.makedirs(os.path.dirname(model_output_path), exist_ok=True)
    
    print("Building / verifying multi-region training dataset...")
    df = build_dataset_for_events(dataset_path)
    audit_temporal_leakage(df)
    
    train_df = df[df["split"] == "train"]
    val_df = df[df["split"] == "val"]
    test_df = df[df["split"] == "test"]
    
    X_train = train_df[FEATURE_COLUMNS]
    y_train = train_df["label"]
    
    X_val = val_df[FEATURE_COLUMNS]
    y_val = val_df["label"]
    
    X_test = test_df[FEATURE_COLUMNS]
    y_test = test_df["label"]
    
    print(f"Training on {len(X_train)} samples across {train_df['region_id'].nunique()} regions")
    print(f"Validating on {len(X_val)} samples (Odisha 2022)")
    print(f"Testing on {len(X_test)} samples (Assam 2024 holdout)")
    
    rf_model = RandomForestClassifier(
        n_estimators=120,
        max_depth=12,
        min_samples_split=4,
        min_samples_leaf=2,
        class_weight="balanced",
        random_state=42,
        n_jobs=-1
    )
    
    rf_model.fit(X_train, y_train)
    
    # Validation evaluation
    val_probs = rf_model.predict_proba(X_val)[:, 1]
    val_preds = (val_probs >= 0.5).astype(int)
    
    # Test evaluation
    test_probs = rf_model.predict_proba(X_test)[:, 1]
    test_preds = (test_probs >= 0.5).astype(int)
    
    val_metrics = {
        "roc_auc": round(float(roc_auc_score(y_val, val_probs)), 4),
        "pr_auc": round(float(average_precision_score(y_val, val_probs)), 4),
        "precision": round(float(precision_score(y_val, val_preds, zero_division=0)), 4),
        "recall": round(float(recall_score(y_val, val_preds, zero_division=0)), 4),
        "f1_score": round(float(f1_score(y_val, val_preds, zero_division=0)), 4),
        "accuracy": round(float(accuracy_score(y_val, val_preds)), 4),
        "brier_score": round(float(brier_score_loss(y_val, val_probs)), 4),
        "sample_count": len(y_val)
    }
    
    test_metrics = {
        "roc_auc": round(float(roc_auc_score(y_test, test_probs)), 4),
        "pr_auc": round(float(average_precision_score(y_test, test_probs)), 4),
        "precision": round(float(precision_score(y_test, test_preds, zero_division=0)), 4),
        "recall": round(float(recall_score(y_test, test_preds, zero_division=0)), 4),
        "f1_score": round(float(f1_score(y_test, test_preds, zero_division=0)), 4),
        "accuracy": round(float(accuracy_score(y_test, test_preds)), 4),
        "brier_score": round(float(brier_score_loss(y_test, test_probs)), 4),
        "sample_count": len(y_test)
    }
    
    importances = rf_model.feature_importances_
    feat_imp = {
        feat: round(float(imp), 4)
        for feat, imp in sorted(zip(FEATURE_COLUMNS, importances), key=lambda x: x[1], reverse=True)
    }
    
    joblib.dump(rf_model, model_output_path)
    print(f"Model successfully saved to {model_output_path}")
    
    metadata = {
        "model_name": "FloodCast-India-RandomForest-Baseline",
        "version": "1.0.0",
        "geographic_scope": "India-Wide (Calibrated across Brahmaputra, Gangetic, Western Ghats, Mahanadi, and Konkan Basins)",
        "algorithm": "RandomForestClassifier",
        "hyperparameters": {
            "n_estimators": 120,
            "max_depth": 12,
            "min_samples_split": 4,
            "min_samples_leaf": 2,
            "class_weight": "balanced",
            "random_state": 42
        },
        "feature_schema": FEATURE_COLUMNS,
        "feature_importances": feat_imp,
        "temporal_split_strategy": "Multi-Region Temporal Holdout (Train: <=2022 across Kerala/Bihar/Maharashtra/Assam, Val: Odisha 2022, Test: Assam 2024)",
        "train_samples": len(X_train),
        "validation_metrics": val_metrics,
        "test_holdout_metrics_2024": test_metrics,
        "risk_scale_mapping": {
            "0-19": "LOW",
            "20-49": "MODERATE",
            "50-74": "HIGH",
            "75-100": "CRITICAL"
        },
        "scientific_disclaimer": "Scores represent uncalibrated empirical model risk scores (0-100). Predictions require historical validation."
    }
    
    with open(metadata_output_path, "w") as f:
        json.dump(metadata, f, indent=2)
        
    print(f"Model metadata saved to {metadata_output_path}")
    print(f"Validation Metrics: {val_metrics}")
    print(f"Test Holdout Metrics (Assam 2024): {test_metrics}")
    print(f"Feature Importances: {feat_imp}")
    return rf_model, metadata

if __name__ == "__main__":
    train_baseline_model()
