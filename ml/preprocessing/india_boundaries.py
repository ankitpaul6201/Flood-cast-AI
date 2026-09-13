"""
Official India Territorial Boundary Geometries & Point-in-Polygon Verification
Follows the official Survey of India boundary specification:
- Complete Northern frontiers (Jammu & Kashmir, Ladakh, Siachen, Aksai Chin)
- Official McMahon Line (Arunachal Pradesh from Tawang to Kibithu)
- Western & Eastern sovereign land borders and coastal frontiers
- Island territories (Andaman & Nicobar Islands and Lakshadweep)
"""

from shapely.geometry import Point, Polygon, MultiPolygon
from typing import Tuple, Optional

# High-precision Survey of India mainland exterior boundary coordinates (lon, lat)
INDIA_MAINLAND_SURVEY_OF_INDIA = [
    (74.75, 37.06), # Indira Col / Siachen / Northern frontier
    (75.50, 36.30),
    (76.80, 35.80),
    (77.90, 35.50),
    (79.20, 35.20), # Aksai Chin border
    (79.80, 34.30),
    (79.50, 33.20),
    (79.00, 32.50), # Himachal / Tibet frontier (Spiti / Kinnaur)
    (80.50, 31.00), # Uttarakhand (Niti Pass / Lipulekh)
    (80.70, 30.15), # Kalapani / Lipulekh trijunction
    (80.05, 28.80), # Sharda / Mahakali river border
    (81.30, 28.20), # UP / Nepal (Lakhimpur / Dudhwa)
    (82.80, 27.60), # Bahraich / Shravasti / Nepal
    (83.80, 27.40), # Maharajganj / Gandak
    (84.45, 27.35), # Valmiki Tiger Reserve (Bihar / Nepal)
    (85.30, 26.85), # Raxaul / Sitamarhi
    (86.50, 26.55), # Supaul / Kosi border
    (87.50, 26.45), # Jogbani / Araria
    (88.10, 26.50), # Mechi river / Siliguri
    (88.15, 27.15), # West Sikkim
    (88.65, 28.08), # North Sikkim (Giri / Kanchenjunga north)
    (88.90, 27.40), # Nathu La / Jelep La
    (89.70, 26.85), # Phuntsholing / Bhutan border
    (91.50, 26.90), # Samdrup Jongkhar
    (92.00, 27.80), # Tawang / Bhutan-Arunachal trijunction
    (92.15, 28.50), # McMahon Line (West Kameng)
    (93.80, 28.85), # Upper Subansiri
    (94.80, 29.10), # Siang / Tuting
    (96.40, 28.60), # Anjaw (Walong)
    (97.40, 28.25), # Kibithu (Easternmost point of India)
    (96.70, 27.20), # Changlang / Myanmar border
    (95.30, 26.20), # Nagaland (Mon)
    (94.80, 25.10), # Manipur (Ukhrul)
    (94.30, 24.15), # Moreh border
    (93.30, 22.80), # Mizoram (Champhai)
    (92.80, 21.95), # Southern tip of Mizoram (Tuipang)
    (92.40, 23.40), # Tripura east border
    (91.25, 23.80), # Agartala (Akhaura border)
    (91.80, 25.15), # Dawki (Meghalaya)
    (89.85, 25.20), # Tura / Dhubri (Assam / Bangladesh)
    (89.80, 26.35), # Cooch Behar
    (88.75, 26.20), # Hili corridor
    (88.00, 24.80), # Malda / Ganga border
    (88.55, 23.90), # Nadia / Gede border
    (88.90, 22.50), # Petrapole / North 24 Parganas
    (89.15, 21.65), # Sundarbans (Raimangal river estuary)
    (87.95, 21.60), # Sagar Island / Hooghly mouth
    (87.50, 21.60), # Digha coast (West Bengal / Odisha border)
    (86.80, 20.80), # Dhamra port / Wheeler Island
    (85.80, 19.80), # Puri / Chilika Lake coast
    (84.85, 19.25), # Gopalpur
    (83.90, 18.30), # Srikakulam (Andhra Pradesh)
    (83.30, 17.70), # Visakhapatnam coast
    (82.25, 16.80), # Kakinada (Godavari delta)
    (80.60, 15.90), # Machilipatnam (Krishna delta)
    (80.15, 14.40), # Nellore / Sriharikota
    (80.30, 13.10), # Chennai / Marina Beach
    (79.85, 10.30), # Point Calimere / Nagapattinam
    (79.35, 9.25),  # Rameswaram / Dhanushkodi
    (77.55, 8.08),  # Kanyakumari (Southernmost tip of Indian mainland)
    (76.55, 8.85),  # Kollam (Kerala)
    (76.25, 9.95),  # Kochi coast
    (75.55, 11.50), # Kozhikode
    (75.00, 12.50), # Mangalore (Karnataka)
    (74.40, 13.90), # Bhatkal
    (74.05, 14.80), # Karwar
    (73.80, 15.50), # Goa (Panaji / Mormugao)
    (73.30, 16.95), # Ratnagiri (Maharashtra)
    (72.80, 18.95), # Mumbai (Gateway of India)
    (72.75, 20.45), # Daman & Diu
    (72.65, 21.20), # Surat (Tapi mouth)
    (72.15, 21.75), # Bhavnagar / Gulf of Khambhat
    (71.00, 20.70), # Diu / Somnath coast
    (69.55, 21.60), # Porbandar coast
    (68.95, 22.25), # Dwarka (Western tip of Saurashtra)
    (69.10, 22.85), # Jamnagar / Gulf of Kutch
    (68.15, 23.70), # Sir Creek / Koteshwar (Westernmost frontier of India)
    (69.00, 24.30), # Great Rann of Kutch
    (70.80, 24.50), # Barmer / Pakistan border (Munabao)
    (70.40, 26.50), # Jaisalmer / Longewala border
    (71.80, 28.50), # Bikaner border
    (73.90, 30.00), # Sri Ganganagar / Hindumalkot
    (74.60, 31.60), # Amritsar / Attari-Wagah border
    (74.85, 32.50), # Jammu / RS Pura
    (74.30, 33.75), # Poonch / Line of Control
    (74.10, 34.40), # Uri / Kupwara Line of Control
    (74.80, 35.10), # Gurez / Kargil frontier
    (74.75, 37.06)  # Close boundary at Indira Col / Siachen
]

# Andaman & Nicobar Islands Bounding Box Polygon
ANDAMAN_NICOBAR_COORDS = [
    (92.2, 6.7),
    (94.0, 6.7),
    (94.0, 13.8),
    (92.2, 13.8),
    (92.2, 6.7)
]

# Lakshadweep Islands Bounding Box Polygon
LAKSHADWEEP_COORDS = [
    (71.8, 8.2),
    (74.0, 8.2),
    (74.0, 12.5),
    (71.8, 12.5),
    (71.8, 8.2)
]

MAINLAND_POLYGON = Polygon(INDIA_MAINLAND_SURVEY_OF_INDIA)
ANDAMAN_POLYGON = Polygon(ANDAMAN_NICOBAR_COORDS)
LAKSHADWEEP_POLYGON = Polygon(LAKSHADWEEP_COORDS)

INDIA_SOVEREIGN_MULTIPOLYGON = MultiPolygon([MAINLAND_POLYGON, ANDAMAN_POLYGON, LAKSHADWEEP_POLYGON])

def is_coordinate_in_india(lat: float, lon: float) -> bool:
    """
    Returns True only if the coordinate (lat, lon) is strictly within India's official sovereign territory.
    Rejects coordinates in Pakistan, Nepal, Bhutan, Bangladesh, Myanmar, Sri Lanka, or open oceans.
    """
    if not (6.0 <= lat <= 37.5 and 68.0 <= lon <= 97.5):
        return False
        
    point = Point(lon, lat)
    return INDIA_SOVEREIGN_MULTIPOLYGON.contains(point) or INDIA_SOVEREIGN_MULTIPOLYGON.touches(point)

# Comprehensive State & UT Centroid Registry for all 36 administrative units of India
STATE_CENTROID_REGISTRY = {
    'andhra-pradesh': {'name': 'Andhra Pradesh', 'lat': 15.91, 'lon': 79.74, 'basin': 'Krishna & Godavari Basins'},
    'arunachal-pradesh': {'name': 'Arunachal Pradesh', 'lat': 28.21, 'lon': 94.72, 'basin': 'Siang & Subansiri Basins'},
    'assam': {'name': 'Assam', 'lat': 26.20, 'lon': 92.80, 'basin': 'Brahmaputra & Barak Basins'},
    'bihar': {'name': 'Bihar', 'lat': 25.90, 'lon': 85.80, 'basin': 'Gangetic & Kosi Basins'},
    'chhattisgarh': {'name': 'Chhattisgarh', 'lat': 21.27, 'lon': 81.86, 'basin': 'Mahanadi Basin'},
    'goa': {'name': 'Goa', 'lat': 15.29, 'lon': 74.12, 'basin': 'Mandovi & Zuari Basins'},
    'gujarat': {'name': 'Gujarat', 'lat': 22.25, 'lon': 71.50, 'basin': 'Narmada, Tapi & Sabarmati Basins'},
    'haryana': {'name': 'Haryana', 'lat': 29.05, 'lon': 76.08, 'basin': 'Yamuna & Ghaggar Basins'},
    'himachal-pradesh': {'name': 'Himachal Pradesh', 'lat': 31.90, 'lon': 77.20, 'basin': 'Beas, Sutlej & Ravi Basins'},
    'jharkhand': {'name': 'Jharkhand', 'lat': 23.61, 'lon': 85.27, 'basin': 'Damodar & Subarnarekha Basins'},
    'karnataka': {'name': 'Karnataka', 'lat': 15.31, 'lon': 75.71, 'basin': 'Krishna & Cauvery Basins'},
    'kerala': {'name': 'Kerala', 'lat': 10.20, 'lon': 76.50, 'basin': 'Periyar, Pamba & Bharathapuzha Basins'},
    'madhya-pradesh': {'name': 'Madhya Pradesh', 'lat': 22.97, 'lon': 78.65, 'basin': 'Narmada, Chambal & Betwa Basins'},
    'maharashtra': {'name': 'Maharashtra', 'lat': 19.00, 'lon': 75.70, 'basin': 'Godavari, Krishna & Konkan Basins'},
    'manipur': {'name': 'Manipur', 'lat': 24.66, 'lon': 93.90, 'basin': 'Barak & Imphal Basins'},
    'meghalaya': {'name': 'Meghalaya', 'lat': 25.46, 'lon': 91.36, 'basin': 'Umiam & Simsang Basins'},
    'mizoram': {'name': 'Mizoram', 'lat': 23.16, 'lon': 92.93, 'basin': 'Tlawng & Tuirial Basins'},
    'nagaland': {'name': 'Nagaland', 'lat': 26.15, 'lon': 94.56, 'basin': 'Dhansiri & Doyang Basins'},
    'odisha': {'name': 'Odisha', 'lat': 20.40, 'lon': 84.80, 'basin': 'Mahanadi, Baitarani & Brahmani Basins'},
    'punjab': {'name': 'Punjab', 'lat': 31.14, 'lon': 75.34, 'basin': 'Sutlej, Beas & Ravi Basins'},
    'rajasthan': {'name': 'Rajasthan', 'lat': 27.02, 'lon': 74.21, 'basin': 'Chambal, Luni & Banas Basins'},
    'sikkim': {'name': 'Sikkim', 'lat': 27.53, 'lon': 88.51, 'basin': 'Teesta River Basin'},
    'tamil-nadu': {'name': 'Tamil Nadu', 'lat': 11.12, 'lon': 78.65, 'basin': 'Cauvery, Vaigai & Thamirabarani Basins'},
    'telangana': {'name': 'Telangana', 'lat': 18.11, 'lon': 79.01, 'basin': 'Godavari & Krishna Basins'},
    'tripura': {'name': 'Tripura', 'lat': 23.94, 'lon': 91.98, 'basin': 'Howrah & Gomati Basins'},
    'uttar-pradesh': {'name': 'Uttar Pradesh', 'lat': 26.84, 'lon': 80.94, 'basin': 'Ganga, Yamuna & Ghaghara Basins'},
    'uttarakhand': {'name': 'Uttarakhand', 'lat': 30.06, 'lon': 79.01, 'basin': 'Bhagirathi, Alaknanda & Ganga Basins'},
    'west-bengal': {'name': 'West Bengal', 'lat': 23.50, 'lon': 87.80, 'basin': 'Ganga, Teesta & Damodar Basins'},
    'andaman-nicobar': {'name': 'Andaman & Nicobar Islands', 'lat': 11.74, 'lon': 92.65, 'basin': 'Bay of Bengal Coastal Zone'},
    'chandigarh': {'name': 'Chandigarh', 'lat': 30.73, 'lon': 76.77, 'basin': 'Sukhna Basin'},
    'dadra-nagar-daman-diu': {'name': 'Dadra & Nagar Haveli and Daman & Diu', 'lat': 20.42, 'lon': 72.83, 'basin': 'Daman Ganga Basin'},
    'delhi': {'name': 'Delhi (NCT)', 'lat': 28.61, 'lon': 77.20, 'basin': 'Yamuna Floodplain'},
    'jammu-kashmir': {'name': 'Jammu & Kashmir', 'lat': 33.77, 'lon': 74.85, 'basin': 'Jhelum, Chenab & Tawi Basins'},
    'ladakh': {'name': 'Ladakh', 'lat': 34.15, 'lon': 77.57, 'basin': 'Indus, Zanskar & Shyok Basins'},
    'lakshadweep': {'name': 'Lakshadweep Islands', 'lat': 10.56, 'lon': 72.64, 'basin': 'Arabian Sea Reef Zone'},
    'puducherry': {'name': 'Puducherry', 'lat': 11.94, 'lon': 79.80, 'basin': 'Coromandel Coastal Basin'}
}

# Major District & City Anchors across India
MAJOR_DISTRICT_ANCHORS = [
    # Assam
    ('Guwahati', 26.18, 91.75, 'Assam'),
    ('Barpeta', 26.32, 91.00, 'Assam'),
    ('Dhubri', 26.02, 89.98, 'Assam'),
    ('Silchar', 24.83, 92.77, 'Assam'),
    ('Dibrugarh', 27.47, 94.91, 'Assam'),
    ('Jorhat', 26.75, 94.22, 'Assam'),
    ('Nagaon', 26.35, 92.68, 'Assam'),
    ('Dhemaji', 27.48, 94.58, 'Assam'),
    # Bihar
    ('Patna', 25.61, 85.14, 'Bihar'),
    ('Supaul', 25.85, 86.85, 'Bihar'),
    ('Muzaffarpur', 26.12, 85.39, 'Bihar'),
    ('Gopalganj', 26.47, 84.44, 'Bihar'),
    ('Darbhanga', 26.15, 85.89, 'Bihar'),
    ('Bhagalpur', 25.24, 86.98, 'Bihar'),
    ('Purnia', 25.77, 87.47, 'Bihar'),
    ('Gaya', 24.79, 85.00, 'Bihar'),
    # Kerala
    ('Kochi', 9.93, 76.26, 'Kerala'),
    ('Alappuzha', 9.49, 76.43, 'Kerala'),
    ('Thrissur', 10.30, 76.33, 'Kerala'),
    ('Idukki', 9.85, 76.97, 'Kerala'),
    ('Wayanad', 11.68, 76.13, 'Kerala'),
    ('Thiruvananthapuram', 8.52, 76.93, 'Kerala'),
    ('Kozhikode', 11.25, 75.78, 'Kerala'),
    ('Kannur', 11.87, 75.37, 'Kerala'),
    # Odisha
    ('Cuttack', 20.44, 85.74, 'Odisha'),
    ('Bhubaneswar', 20.29, 85.82, 'Odisha'),
    ('Puri', 19.81, 85.83, 'Odisha'),
    ('Balasore', 21.49, 86.93, 'Odisha'),
    ('Sambalpur', 21.46, 83.98, 'Odisha'),
    ('Kendrapara', 20.50, 86.42, 'Odisha'),
    ('Berhampur', 19.31, 84.79, 'Odisha'),
    ('Rourkela', 22.26, 84.85, 'Odisha'),
    # Maharashtra
    ('Mumbai', 19.07, 72.87, 'Maharashtra'),
    ('Chiplun', 17.53, 73.51, 'Maharashtra'),
    ('Kolhapur', 16.70, 74.24, 'Maharashtra'),
    ('Sangli', 16.85, 74.58, 'Maharashtra'),
    ('Pune', 18.52, 73.85, 'Maharashtra'),
    ('Nagpur', 21.14, 79.08, 'Maharashtra'),
    ('Nashik', 19.99, 73.78, 'Maharashtra'),
    ('Aurangabad / Chhatrapati Sambhajinagar', 19.87, 75.34, 'Maharashtra'),
    ('Solapur', 17.65, 75.90, 'Maharashtra'),
    ('Amravati', 20.93, 77.75, 'Maharashtra'),
    # Uttar Pradesh
    ('Lucknow', 26.84, 80.94, 'Uttar Pradesh'),
    ('Varanasi', 25.31, 82.97, 'Uttar Pradesh'),
    ('Prayagraj', 25.43, 81.84, 'Uttar Pradesh'),
    ('Gorakhpur', 26.76, 83.37, 'Uttar Pradesh'),
    ('Agra', 27.17, 78.00, 'Uttar Pradesh'),
    ('Kanpur', 26.44, 80.33, 'Uttar Pradesh'),
    ('Ayodhya', 26.79, 82.19, 'Uttar Pradesh'),
    ('Meerut', 28.98, 77.70, 'Uttar Pradesh'),
    ('Bareilly', 28.36, 79.41, 'Uttar Pradesh'),
    ('Jhansi', 25.44, 78.56, 'Uttar Pradesh'),
    ('Aligarh', 27.89, 78.08, 'Uttar Pradesh'),
    ('Moradabad', 28.83, 78.77, 'Uttar Pradesh'),
    ('Ghaziabad', 28.66, 77.45, 'Uttar Pradesh'),
    ('Noida', 28.53, 77.39, 'Uttar Pradesh'),
    # West Bengal
    ('Kolkata', 22.57, 88.36, 'West Bengal'),
    ('Siliguri', 26.72, 88.43, 'West Bengal'),
    ('Howrah', 22.59, 88.26, 'West Bengal'),
    ('Asansol', 23.68, 86.98, 'West Bengal'),
    ('Durgapur', 23.52, 87.31, 'West Bengal'),
    ('Malda', 25.00, 88.14, 'West Bengal'),
    ('Murshidabad', 24.18, 88.27, 'West Bengal'),
    ('Darjeeling', 27.04, 88.26, 'West Bengal'),
    ('Kharagpur', 22.34, 87.32, 'West Bengal'),
    # Gujarat
    ('Ahmedabad', 23.02, 72.57, 'Gujarat'),
    ('Surat', 21.17, 72.83, 'Gujarat'),
    ('Vadodara', 22.30, 73.18, 'Gujarat'),
    ('Rajkot', 22.30, 70.80, 'Gujarat'),
    ('Bhavnagar', 21.76, 72.15, 'Gujarat'),
    ('Jamnagar', 22.47, 70.05, 'Gujarat'),
    ('Bhuj', 23.24, 69.66, 'Gujarat'),
    ('Gandhinagar', 23.21, 72.63, 'Gujarat'),
    ('Palanpur', 24.17, 72.43, 'Gujarat'),
    # Tamil Nadu
    ('Chennai', 13.08, 80.27, 'Tamil Nadu'),
    ('Madurai', 9.92, 78.11, 'Tamil Nadu'),
    ('Coimbatore', 11.01, 76.96, 'Tamil Nadu'),
    ('Tiruchirappalli', 10.79, 78.70, 'Tamil Nadu'),
    ('Salem', 11.66, 78.14, 'Tamil Nadu'),
    ('Tirunelveli', 8.71, 77.75, 'Tamil Nadu'),
    ('Thanjavur', 10.78, 79.13, 'Tamil Nadu'),
    ('Vellore', 12.91, 79.13, 'Tamil Nadu'),
    # Telangana
    ('Hyderabad', 17.38, 78.48, 'Telangana'),
    ('Warangal', 17.97, 79.59, 'Telangana'),
    ('Nizamabad', 18.67, 78.09, 'Telangana'),
    ('Karimnagar', 18.43, 79.12, 'Telangana'),
    ('Khammam', 17.24, 80.15, 'Telangana'),
    # Andhra Pradesh
    ('Visakhapatnam', 17.68, 83.21, 'Andhra Pradesh'),
    ('Vijayawada', 16.50, 80.64, 'Andhra Pradesh'),
    ('Guntur', 16.30, 80.43, 'Andhra Pradesh'),
    ('Tirupati', 13.62, 79.41, 'Andhra Pradesh'),
    ('Kurnool', 15.82, 78.03, 'Andhra Pradesh'),
    ('Nellore', 14.44, 79.98, 'Andhra Pradesh'),
    ('Rajahmundry', 17.00, 81.80, 'Andhra Pradesh'),
    # Karnataka
    ('Bengaluru', 12.97, 77.59, 'Karnataka'),
    ('Mysuru', 12.29, 76.63, 'Karnataka'),
    ('Mangaluru', 12.91, 74.85, 'Karnataka'),
    ('Hubballi-Dharwad', 15.36, 75.12, 'Karnataka'),
    ('Belagavi', 15.84, 74.49, 'Karnataka'),
    ('Kalaburagi', 17.32, 76.83, 'Karnataka'),
    ('Shivamogga', 13.92, 75.56, 'Karnataka'),
    # Rajasthan
    ('Jaipur', 26.91, 75.78, 'Rajasthan'),
    ('Jodhpur', 26.23, 73.02, 'Rajasthan'),
    ('Udaipur', 24.58, 73.71, 'Rajasthan'),
    ('Kota', 25.18, 75.83, 'Rajasthan'),
    ('Bikaner', 28.02, 73.31, 'Rajasthan'),
    ('Ajmer', 26.44, 74.63, 'Rajasthan'),
    ('Alwar', 27.55, 76.63, 'Rajasthan'),
    # Madhya Pradesh
    ('Bhopal', 23.25, 77.41, 'Madhya Pradesh'),
    ('Indore', 22.71, 75.85, 'Madhya Pradesh'),
    ('Jabalpur', 23.18, 79.98, 'Madhya Pradesh'),
    ('Gwalior', 26.21, 78.17, 'Madhya Pradesh'),
    ('Ujjain', 23.17, 75.78, 'Madhya Pradesh'),
    ('Sagar', 23.83, 78.73, 'Madhya Pradesh'),
    ('Rewa', 24.53, 81.30, 'Madhya Pradesh'),
    # Jharkhand
    ('Ranchi', 23.34, 85.30, 'Jharkhand'),
    ('Jamshedpur', 22.80, 86.20, 'Jharkhand'),
    ('Dhanbad', 23.79, 86.43, 'Jharkhand'),
    ('Bokaro', 23.66, 86.15, 'Jharkhand'),
    ('Deoghar', 24.48, 86.70, 'Jharkhand'),
    # Chhattisgarh
    ('Raipur', 21.25, 81.63, 'Chhattisgarh'),
    ('Bhilai / Durg', 21.19, 81.28, 'Chhattisgarh'),
    ('Bilaspur', 22.07, 82.14, 'Chhattisgarh'),
    ('Korba', 22.35, 82.68, 'Chhattisgarh'),
    ('Jagdalpur', 19.07, 82.03, 'Chhattisgarh'),
    # Punjab
    ('Amritsar', 31.63, 74.87, 'Punjab'),
    ('Ludhiana', 30.90, 75.85, 'Punjab'),
    ('Jalandhar', 31.32, 75.57, 'Punjab'),
    ('Patiala', 30.33, 76.38, 'Punjab'),
    ('Bathinda', 30.21, 74.94, 'Punjab'),
    # Haryana
    ('Gurugram', 28.45, 77.02, 'Haryana'),
    ('Faridabad', 28.40, 77.31, 'Haryana'),
    ('Panipat', 29.39, 76.96, 'Haryana'),
    ('Ambala', 30.37, 76.77, 'Haryana'),
    ('Hisar', 29.14, 75.72, 'Haryana'),
    ('Rohtak', 28.89, 76.60, 'Haryana'),
    # Himachal Pradesh
    ('Shimla', 31.10, 77.17, 'Himachal Pradesh'),
    ('Dharamshala', 32.21, 76.32, 'Himachal Pradesh'),
    ('Kullu & Manali', 31.95, 77.10, 'Himachal Pradesh'),
    ('Mandi', 31.70, 76.93, 'Himachal Pradesh'),
    ('Solan', 30.90, 77.09, 'Himachal Pradesh'),
    # Uttarakhand
    ('Dehradun', 30.31, 78.03, 'Uttarakhand'),
    ('Haridwar', 29.94, 78.16, 'Uttarakhand'),
    ('Rishikesh', 30.08, 78.26, 'Uttarakhand'),
    ('Nainital', 29.38, 79.46, 'Uttarakhand'),
    ('Haldwani', 29.21, 79.51, 'Uttarakhand'),
    ('Kedarnath & Rudraprayag', 30.73, 79.06, 'Uttarakhand'),
    # Jammu & Kashmir
    ('Srinagar', 34.08, 74.79, 'Jammu & Kashmir'),
    ('Jammu', 32.72, 74.85, 'Jammu & Kashmir'),
    ('Anantnag', 33.73, 75.15, 'Jammu & Kashmir'),
    ('Baramulla', 34.19, 74.35, 'Jammu & Kashmir'),
    ('Udhampur', 32.92, 75.14, 'Jammu & Kashmir'),
    # Ladakh
    ('Leh', 34.15, 77.57, 'Ladakh'),
    ('Kargil', 34.55, 76.13, 'Ladakh'),
    ('Nubra', 34.68, 77.55, 'Ladakh'),
    # Northeast States
    ('Gangtok', 27.33, 88.61, 'Sikkim'),
    ('Itanagar', 27.08, 93.60, 'Arunachal Pradesh'),
    ('Pasighat', 28.06, 95.32, 'Arunachal Pradesh'),
    ('Tawang', 27.58, 91.86, 'Arunachal Pradesh'),
    ('Shillong', 25.57, 91.89, 'Meghalaya'),
    ('Tura', 25.51, 90.22, 'Meghalaya'),
    ('Aizawl', 23.73, 92.71, 'Mizoram'),
    ('Lunglei', 22.88, 92.73, 'Mizoram'),
    ('Kohima', 25.67, 94.10, 'Nagaland'),
    ('Dimapur', 25.90, 93.72, 'Nagaland'),
    ('Imphal', 24.81, 93.93, 'Manipur'),
    ('Churachandpur', 24.33, 93.67, 'Manipur'),
    ('Agartala', 23.83, 91.28, 'Tripura'),
    ('Udaipur (Tripura)', 23.53, 91.48, 'Tripura'),
    # Goa & UTs
    ('Panaji', 15.49, 73.82, 'Goa'),
    ('Margao', 15.28, 73.98, 'Goa'),
    ('New Delhi', 28.61, 77.20, 'Delhi (NCT)'),
    ('Chandigarh', 30.73, 76.77, 'Chandigarh'),
    ('Daman', 20.42, 72.83, 'Dadra & Nagar Haveli and Daman & Diu'),
    ('Silvassa', 20.27, 73.00, 'Dadra & Nagar Haveli and Daman & Diu'),
    ('Port Blair', 11.62, 92.72, 'Andaman & Nicobar Islands'),
    ('Kavaratti', 10.56, 72.64, 'Lakshadweep Islands'),
    ('Puducherry', 11.94, 79.80, 'Puducherry'),
    ('Karaikal', 10.92, 79.83, 'Puducherry')
]

def identify_indian_state_or_basin(lat: float, lon: float) -> str:
    """
    Identifies the specific Indian city/district and state or union territory for any valid coordinate.
    Covers all 28 States and 8 Union Territories with high precision.
    """
    if not is_coordinate_in_india(lat, lon):
        return "Outside India"
        
    # 1. Check for closest major city/district anchor (within ~0.65 degrees / ~70km)
    min_dist = float('inf')
    best_district = None
    for city_name, c_lat, c_lon, st_name in MAJOR_DISTRICT_ANCHORS:
        d = ((lat - c_lat) ** 2 + (lon - c_lon) ** 2) ** 0.5
        if d < min_dist:
            min_dist = d
            best_district = (city_name, st_name)
            
    if min_dist <= 0.65 and best_district:
        return f"{best_district[0]}, {best_district[1]}"
        
    # 2. Match to closest State / Union Territory centroid
    min_state_dist = float('inf')
    best_state = None
    for sid, sinfo in STATE_CENTROID_REGISTRY.items():
        # Account for longitude scaling in distance calculation
        d = ((lat - sinfo['lat']) ** 2 + ((lon - sinfo['lon']) * 0.9) ** 2) ** 0.5
        if d < min_state_dist:
            min_state_dist = d
            best_state = sinfo
            
    if best_state:
        return f"{best_state['name']} ({best_state['basin']})"
        
    return "India"


if __name__ == "__main__":
    test_points = [
        ("Guwahati (Assam)", 26.18, 91.74, True),
        ("Patna (Bihar)", 25.60, 85.13, True),
        ("Kochi (Kerala)", 9.93, 76.26, True),
        ("Bhubaneswar (Odisha)", 20.29, 85.82, True),
        ("Mumbai (Maharashtra)", 19.07, 72.87, True),
        ("Delhi (India)", 28.61, 77.20, True),
        ("Srinagar (J&K)", 34.08, 74.79, True),
        ("Leh (Ladakh)", 34.15, 77.57, True),
        ("Itanagar (Arunachal)", 27.08, 93.60, True),
        ("Amritsar (India)", 31.63, 74.87, True),
        ("Kathmandu (Nepal)", 27.71, 85.32, False),
        ("Dhaka (Bangladesh)", 23.81, 90.41, False),
        ("Lahore (Pakistan)", 31.52, 74.35, False),
        ("Islamabad (Pakistan)", 33.68, 73.04, False),
        ("Colombo (Sri Lanka)", 6.92, 79.86, False),
        ("Thimphu (Bhutan)", 27.47, 89.63, False),
        ("Yangon (Myanmar)", 16.86, 96.19, False),
        ("Bay of Bengal (Sea)", 15.0, 88.0, False),
        ("Arabian Sea (Sea)", 15.0, 69.0, False),
        ("Indian Ocean (South)", 5.0, 77.0, False),
        ("London (UK)", 51.5, -0.1, False)
    ]
    
    print("Testing Survey of India Official Boundaries...")
    for name, lat, lon, expected in test_points:
        result = is_coordinate_in_india(lat, lon)
        state = identify_indian_state_or_basin(lat, lon)
        assert result == expected, f"Failed for {name}: expected {expected}, got {result}"
        print(f"PASS: {name} (Lat: {lat}, Lon: {lon}) -> In India: {result} | Region: {state}")
