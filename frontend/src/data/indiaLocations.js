/**
 * Comprehensive India Administrative Geo-Registry
 * Contains all 28 States and 8 Union Territories of India with
 * complete district lists, river basins, map centers, and coordinates.
 */

export const INDIAN_STATES_AND_UTS = [
  { id: 'all', name: 'All India (National Overview)', type: 'National' },
  // 28 States
  { id: 'andhra-pradesh', name: 'Andhra Pradesh', type: 'State' },
  { id: 'arunachal-pradesh', name: 'Arunachal Pradesh', type: 'State' },
  { id: 'assam', name: 'Assam', type: 'State' },
  { id: 'bihar', name: 'Bihar', type: 'State' },
  { id: 'chhattisgarh', name: 'Chhattisgarh', type: 'State' },
  { id: 'goa', name: 'Goa', type: 'State' },
  { id: 'gujarat', name: 'Gujarat', type: 'State' },
  { id: 'haryana', name: 'Haryana', type: 'State' },
  { id: 'himachal-pradesh', name: 'Himachal Pradesh', type: 'State' },
  { id: 'jharkhand', name: 'Jharkhand', type: 'State' },
  { id: 'karnataka', name: 'Karnataka', type: 'State' },
  { id: 'kerala', name: 'Kerala', type: 'State' },
  { id: 'madhya-pradesh', name: 'Madhya Pradesh', type: 'State' },
  { id: 'maharashtra', name: 'Maharashtra', type: 'State' },
  { id: 'manipur', name: 'Manipur', type: 'State' },
  { id: 'meghalaya', name: 'Meghalaya', type: 'State' },
  { id: 'mizoram', name: 'Mizoram', type: 'State' },
  { id: 'nagaland', name: 'Nagaland', type: 'State' },
  { id: 'odisha', name: 'Odisha', type: 'State' },
  { id: 'punjab', name: 'Punjab', type: 'State' },
  { id: 'rajasthan', name: 'Rajasthan', type: 'State' },
  { id: 'sikkim', name: 'Sikkim', type: 'State' },
  { id: 'tamil-nadu', name: 'Tamil Nadu', type: 'State' },
  { id: 'telangana', name: 'Telangana', type: 'State' },
  { id: 'tripura', name: 'Tripura', type: 'State' },
  { id: 'uttar-pradesh', name: 'Uttar Pradesh', type: 'State' },
  { id: 'uttarakhand', name: 'Uttarakhand', type: 'State' },
  { id: 'west-bengal', name: 'West Bengal', type: 'State' },
  // 8 Union Territories
  { id: 'andaman-nicobar', name: 'Andaman & Nicobar Islands', type: 'UT' },
  { id: 'chandigarh', name: 'Chandigarh', type: 'UT' },
  { id: 'dadra-nagar-daman-diu', name: 'Dadra & Nagar Haveli and Daman & Diu', type: 'UT' },
  { id: 'delhi', name: 'Delhi (NCT)', type: 'UT' },
  { id: 'jammu-kashmir', name: 'Jammu & Kashmir', type: 'UT' },
  { id: 'ladakh', name: 'Ladakh', type: 'UT' },
  { id: 'lakshadweep', name: 'Lakshadweep Islands', type: 'UT' },
  { id: 'puducherry', name: 'Puducherry', type: 'UT' }
];

export const STATE_CENTERS = {
  all: { center: [22.80, 79.50], zoom: 5 },
  'andhra-pradesh': { center: [15.91, 79.74], zoom: 7 },
  'arunachal-pradesh': { center: [28.21, 94.72], zoom: 7 },
  assam: { center: [26.20, 92.80], zoom: 7 },
  bihar: { center: [25.90, 85.80], zoom: 7 },
  chhattisgarh: { center: [21.27, 81.86], zoom: 7 },
  goa: { center: [15.29, 74.12], zoom: 9 },
  gujarat: { center: [22.25, 71.50], zoom: 7 },
  haryana: { center: [29.05, 76.08], zoom: 7 },
  'himachal-pradesh': { center: [31.90, 77.20], zoom: 7 },
  jharkhand: { center: [23.61, 85.27], zoom: 7 },
  karnataka: { center: [15.31, 75.71], zoom: 7 },
  kerala: { center: [10.20, 76.50], zoom: 8 },
  'madhya-pradesh': { center: [22.97, 78.65], zoom: 6 },
  maharashtra: { center: [19.00, 75.70], zoom: 7 },
  manipur: { center: [24.66, 93.90], zoom: 8 },
  meghalaya: { center: [25.46, 91.36], zoom: 8 },
  mizoram: { center: [23.16, 92.93], zoom: 8 },
  nagaland: { center: [26.15, 94.56], zoom: 8 },
  odisha: { center: [20.40, 84.80], zoom: 7 },
  punjab: { center: [31.14, 75.34], zoom: 7 },
  rajasthan: { center: [27.02, 74.21], zoom: 6 },
  sikkim: { center: [27.53, 88.51], zoom: 9 },
  'tamil-nadu': { center: [11.12, 78.65], zoom: 7 },
  telangana: { center: [18.11, 79.01], zoom: 7 },
  tripura: { center: [23.94, 91.98], zoom: 8 },
  'uttar-pradesh': { center: [26.84, 80.94], zoom: 7 },
  uttarakhand: { center: [30.06, 79.01], zoom: 7 },
  'west-bengal': { center: [23.50, 87.80], zoom: 7 },
  'andaman-nicobar': { center: [11.74, 92.65], zoom: 7 },
  chandigarh: { center: [30.73, 76.77], zoom: 11 },
  'dadra-nagar-daman-diu': { center: [20.42, 72.83], zoom: 9 },
  delhi: { center: [28.61, 77.20], zoom: 10 },
  'jammu-kashmir': { center: [33.77, 74.85], zoom: 7 },
  ladakh: { center: [34.15, 77.57], zoom: 7 },
  lakshadweep: { center: [10.56, 72.64], zoom: 8 },
  puducherry: { center: [11.94, 79.80], zoom: 10 }
};

export const DISTRICTS_BY_STATE = {
  all: [
    'All Districts & Basins',
    'Brahmaputra Floodplains (Assam)',
    'Kosi River Basin (Bihar)',
    'Lower Periyar Delta (Kerala)',
    'Mahanadi Delta (Odisha)',
    'Chiplun Coastal Basin (Maharashtra)',
    'Yamuna Floodplain (UP/Delhi)',
    'Sundarbans Estuary (West Bengal)',
    'Banaskantha Basin (Gujarat)',
    'Cauvery Delta (Tamil Nadu)'
  ],
  'andhra-pradesh': [
    'All Districts',
    'Godavari Delta (East Godavari)',
    'Krishna Delta (Krishna)',
    'Srikakulam (Nagavali / Vamsadhara)',
    'Visakhapatnam',
    'Guntur',
    'Prakasam',
    'Nellore (Pennar Basin)',
    'Kurnool (Tungabhadra)',
    'Anantapur'
  ],
  'arunachal-pradesh': [
    'All Districts',
    'Siang Valley (Pasighat)',
    'Upper Subansiri (Daporijo)',
    'Lohit Basin (Tezu)',
    'Dibang Valley (Roing)',
    'Papum Pare (Itanagar)',
    'West Kameng (Bhalukpong)',
    'Tawang'
  ],
  assam: [
    'All Districts',
    'Barpeta (Brahmaputra / Manas)',
    'Dhubri (Brahmaputra / Gadadhar)',
    'Silchar & Cachar (Barak Valley)',
    'Kamrup & Guwahati Metro',
    'Morigaon & Nagaon (Kopili)',
    'Dhemaji & Lakhimpur (Subansiri)',
    'Dibrugarh (Upper Brahmaputra)',
    'Golaghat (Dhansiri)',
    'Goalpara',
    'Sonitpur (Tezpur)'
  ],
  bihar: [
    'All Districts',
    'Kosi Active Basin (Supaul / Saharsa)',
    'Gandak Floodplains (Gopalganj)',
    'Bagmati Basin (Muzaffarpur)',
    'Darbhanga & Madhubani (Kamla)',
    'Patna & Danapur (Ganga / Son)',
    'Bhagalpur (Lower Ganga)',
    'Purnia & Katihar (Mahananda)',
    'East Champaran (Motihari)',
    'Khagaria (Confluence Delta)'
  ],
  chhattisgarh: [
    'All Districts',
    'Mahanadi Upper Basin (Raipur)',
    'Bilaspur (Arpa River)',
    'Durg & Bhilai (Shivnath)',
    'Korba (Hasdeo River)',
    'Bastar (Indravati Basin)',
    'Janjgir-Champa',
    'Rajnandgaon'
  ],
  goa: [
    'All Districts',
    'North Goa (Mandovi River / Panaji)',
    'South Goa (Zuari River / Margao)',
    'Tiswadi (Chorao / Divar Islands)',
    'Bardez (Mapusa River)',
    'Salcete Lowlands'
  ],
  gujarat: [
    'All Districts',
    'Banaskantha & Dantiwada (Banas)',
    'Morbi & Rajkot (Machchhu)',
    'Bharuch (Narmada Estuary)',
    'Surat (Tapi Flood Basin)',
    'Patan (Saraswati River)',
    'Ahmedabad (Sabarmati)',
    'Vadodara (Vishwamitri Basin)',
    'Kutch & Rann Lowlands',
    'Junagadh (Ozath River)'
  ],
  haryana: [
    'All Districts',
    'Yamunanagar (Hathnikund Barrage)',
    'Karnal (Yamuna Basin)',
    'Panipat & Sonipat (Yamuna Belt)',
    'Ambala (Ghaggar / Tangri)',
    'Kurukshetra (Markanda River)',
    'Faridabad',
    'Gurugram (Najafgarh Drain Basin)'
  ],
  'himachal-pradesh': [
    'All Districts',
    'Kullu & Manali (Beas River)',
    'Mandi (Beas Surge)',
    'Shimla (Sutlej Basin)',
    'Kangra (Chakki / Pong Dam)',
    'Solan & Baddi (Sirsa River)',
    'Sirmaur (Giri River)',
    'Chamba (Ravi Basin)',
    'Kinnaur'
  ],
  jharkhand: [
    'All Districts',
    'Ranchi (Subarnarekha Basin)',
    'Jamshedpur (Subarnarekha / Kharkai)',
    'Dhanbad (Damodar Basin)',
    'Sahibganj (Ganga Floodway)',
    'Bokaro (Damodar River)',
    'Hazaribagh (Barakar River)',
    'Dumka (Mayurakshi Basin)'
  ],
  karnataka: [
    'All Districts',
    'Belagavi & Chikkodi (Krishna)',
    'Bagalkote & Vijayapura (Ghataprabha / Malaprabha)',
    'Dakshina Kannada (Netravati / Mangaluru)',
    'Udupi (Swarna / Sita Rivers)',
    'Uttara Kannada (Sharavathi / Kali)',
    'Kodagu / Coorg (Cauvery Upper Catchment)',
    'Shivamogga (Tunga / Bhadra)',
    'Bengaluru (Vrishabhavathi Basin)'
  ],
  kerala: [
    'All Districts',
    'Aluva & Ernakulam (Periyar Delta)',
    'Kuttanad & Alappuzha (Pamba / Vembanad)',
    'Chalakudy & Thrissur (Chalakudy River)',
    'Idukki (Cheruthoni / Mullaperiyar)',
    'Wayanad (Kabini Basin)',
    'Pathanamthitta (Achankovil / Pamba)',
    'Kottayam (Meenachil River)',
    'Kozhikode (Chaliyar River)',
    'Kannur (Valapattanam River)',
    'Malappuram (Bharathappuzha)'
  ],
  'madhya-pradesh': [
    'All Districts',
    'Hoshangabad / Narmadapuram (Narmada)',
    'Jabalpur (Bhedaghat / Narmada)',
    'Gwalior & Chambal (Chambal Basin)',
    'Rewa (Tons / Bihad Rivers)',
    'Ujjain & Indore (Kshipra / Khan)',
    'Sheopur (Kuno / Kwari Rivers)',
    'Bhopal (Betwa Basin)'
  ],
  maharashtra: [
    'All Districts',
    'Chiplun (Vashishti River Basin)',
    'Mahad (Savitri River Estuary)',
    'Kolhapur & Shirol (Panchganga)',
    'Sangli & Miraj (Krishna River Front)',
    'Satara & Karad (Koyna / Krishna)',
    'Mumbai Suburban (Mithi River / Mahim)',
    'Raigad & Panvel (Patalganga / Amba)',
    'Thane & Kalyan (Ulhas River)',
    'Nagpur & Wardha (Wainganga Basin)',
    'Nanded (Godavari Basin)'
  ],
  manipur: [
    'All Districts',
    'Imphal West & East (Imphal River)',
    'Thoubal & Kakching (Thoubal River)',
    'Bishnupur (Loktak Lake Basin)',
    'Churachandpur (Khuga River)',
    'Noney & Tamenglong (Irang Basin)'
  ],
  meghalaya: [
    'All Districts',
    'East Khasi Hills (Shillong / Umngot)',
    'West Garo Hills (Tura / Brahmaputra border)',
    'South Garo Hills (Simsang River / Baghmara)',
    'Ri-Bhoi (Umiam Basin)',
    'Jaintia Hills (Myntdu River)'
  ],
  mizoram: [
    'All Districts',
    'Aizawl (Tlawng River Basin)',
    'Lunglei (Khawthlangtuipui River)',
    'Champhai (Tuipui River)',
    'Kolasib (Serlui / Bairabi Basin)',
    'Mamit (Langkayi River)'
  ],
  nagaland: [
    'All Districts',
    'Dimapur & Chümoukedima (Dhansiri River)',
    'Kohima (Dzüna River)',
    'Mokokchung (Milak Basin)',
    'Mon (Dikhu Basin)',
    'Wokha (Doyang Hydro Reservoir)'
  ],
  odisha: [
    'All Districts',
    'Mundali & Cuttack (Mahanadi Apex)',
    'Kendrapara & Jagatsinghpur (Devi / Kathajodi)',
    'Puri (Daya / Bhargavi Rivers)',
    'Jajpur & Bhadrak (Baitarani Basin)',
    'Balasore (Subarnarekha / Budhabalanga)',
    'Sambalpur (Hirakud Dam Outflow)',
    'Ganjam (Rushikulya Basin)'
  ],
  punjab: [
    'All Districts',
    'Rupnagar & Anandpur Sahib (Sutlej)',
    'Firozpur & Harike Pattan (Sutlej / Beas Sangam)',
    'Patiala (Ghaggar / Badi Nadi)',
    'Amritsar & Gurdaspur (Ravi River)',
    'Jalandhar & Kapurthala (Beas Basin)',
    'Ludhiana (Buddha Nullah / Sutlej)',
    'Fazilka (Tail-end Sutlej Inundation)'
  ],
  rajasthan: [
    'All Districts',
    'Kota & Jhalawar (Chambal Basin / Kalisindh)',
    'Dholpur (Chambal Downstream)',
    'Barmer & Jalore (Luni River Flash Surge)',
    'Sirohi & Mount Abu (West Banas)',
    'Bharatpur (Banganga Basin)',
    'Bikaner & Sri Ganganagar (Ghaggar Floodway)'
  ],
  sikkim: [
    'All Districts',
    'Mangan / North Sikkim (Lachen / Lachung / Teesta)',
    'Gangtok (Rani Khola Basin)',
    'Namchi / South Sikkim (Rangeet River)',
    'Gyalshing / West Sikkim (Kaleej River)',
    'Pakyong (Teesta Lower Gorge)'
  ],
  'tamil-nadu': [
    'All Districts',
    'Chennai (Adyar / Cooum / Kosasthalaiyar)',
    'Thanjavur & Tiruvarur (Cauvery Delta)',
    'Cuddalore (Pennaiyar / Gadilam Rivers)',
    'Nagapattinam (Vettar / Vennar Estuaries)',
    'Madurai (Vaigai River)',
    'Tirunelveli & Thoothukudi (Thamirabarani)',
    'Trichy / Tiruchirappalli (Cauvery / Kollidam)'
  ],
  telangana: [
    'All Districts',
    'Hyderabad (Musi River / Osmansagar)',
    'Bhadradri Kothagudem (Godavari / Bhadrachalam)',
    'Warangal & Hanamkonda (Munneru Basin)',
    'Karimnagar & Peddapalli (Manair / Godavari)',
    'Nizamabad (Godavari / Sriramsagar Dam)',
    'Khammam (Munneru River Flash Surge)',
    'Mahabubnagar (Krishna Basin)'
  ],
  tripura: [
    'All Districts',
    'West Tripura / Agartala (Howrah River)',
    'Unakoti / Kailashahar (Manu River)',
    'South Tripura / Belonia (Muhuri River)',
    'Gomati / Udaipur (Gumti River)',
    'Khowai (Khowai Basin)',
    'North Tripura / Dharmanagar (Juri River)'
  ],
  'uttar-pradesh': [
    'All Districts',
    'Varanasi (Ganga & Varuna Plains)',
    'Prayagraj / Allahabad (Ganga & Yamuna Sangam)',
    'Gorakhpur (Rapti & Rohini Basins)',
    'Ayodhya (Sarayu / Ghaghara Basin)',
    'Mathura & Agra (Yamuna Lowlands)',
    'Lucknow (Gomti River Floodplain)',
    'Kanpur (Ganga Upper Floodplain)',
    'Ballia (Ganga-Ghaghara Confluence)',
    'Bahraich & Shravasti (Ghaghara / Rapti)',
    'Lakhimpur Kheri (Sharda River)'
  ],
  uttarakhand: [
    'All Districts',
    'Rudraprayag & Kedarnath (Mandakini River)',
    'Chamoli & Joshimath (Alaknanda / Dhauliganga)',
    'Uttarkashi (Bhagirathi River)',
    'Haridwar & Rishikesh (Ganga Plains Entrance)',
    'Dehradun (Song / Rispana Basins)',
    'Pithoragarh (Kali / Gori Ganga)',
    'Nainital & Haldwani (Gaula River)'
  ],
  'west-bengal': [
    'All Districts',
    'Sundarbans Delta (South & North 24 Parganas)',
    'Murshidabad & Malda (Bhagirathi / Ganga / Farakka)',
    'Ghatal & Paschim Medinipur (Silabati / Damodar)',
    'Howrah & Hooghly (Rupnarayan / Damodar)',
    'Jalpaiguri & Alipurduar (Teesta / Torsa / Jaldhaka)',
    'Cooch Behar (Torsa / Mansai Rivers)',
    'Kolkata & Bidhannagar (Hooghly Estuary)'
  ],
  'andaman-nicobar': [
    'All Districts',
    'South Andaman (Port Blair)',
    'North & Middle Andaman (Mayabunder / Diglipur)',
    'Nicobar (Car Nicobar / Great Nicobar / Campbell Bay)'
  ],
  chandigarh: [
    'All Districts',
    'Chandigarh Capital Region',
    'Sukhna Lake Catchment Basin',
    'Patiali Rao & N-Choe Drainage Corridor'
  ],
  'dadra-nagar-daman-diu': [
    'All Districts',
    'Daman (Daman Ganga River)',
    'Diu (Coastal Arabian Sea)',
    'Dadra & Nagar Haveli / Silvassa (Daman Ganga Basin)'
  ],
  delhi: [
    'All Districts',
    'Central Delhi (Yamuna Floodplain / Kashmere Gate)',
    'East Delhi (Mayur Vihar / Geeta Colony Lowlands)',
    'North Delhi (Wazirabad / Burari Yamuna Plains)',
    'South East Delhi (Okhla Barrage / Kalindi Kunj)',
    'South West Delhi (Najafgarh Drain Basin)'
  ],
  'jammu-kashmir': [
    'All Districts',
    'Srinagar (Jhelum River & Dal Lake Basin)',
    'Anantnag / Islamabad (Upper Jhelum)',
    'Baramulla & Sopore (Wular Lake / Lower Jhelum)',
    'Pulwama & Pampore (Jhelum Basin)',
    'Jammu (Tawi River Basin)',
    'Rajouri & Poonch (Poonch River)',
    'Kishtwar & Doda (Chenab Gorge Basin)'
  ],
  ladakh: [
    'All Districts',
    'Leh (Indus River Basin / Choglamsar)',
    'Kargil (Suru River Basin)',
    'Nubra Valley (Shyok River)',
    'Zanskar Valley (Zanskar River)'
  ],
  lakshadweep: [
    'All Districts',
    'Kavaratti Island (Capital)',
    'Agatti Island Lagoon',
    'Minicoy Island',
    'Andrott Island',
    'Amini & Kadmat Islands'
  ],
  puducherry: [
    'All Districts',
    'Puducherry Coastal Basin (Gingee River / Bay of Bengal)',
    'Karaikal (Arasalar River / Cauvery Delta)',
    'Yanam (Godavari Delta Estuary)',
    'Mahe (Mahe River / Arabian Sea)'
  ]
};

// Precise Coordinates for major Indian Districts to fly-to and inspect on selection
export const DISTRICT_COORDINATES = {
  // Assam
  'Barpeta (Brahmaputra / Manas)': [26.32, 91.00],
  'Dhubri (Brahmaputra / Gadadhar)': [26.02, 89.98],
  'Silchar & Cachar (Barak Valley)': [24.83, 92.77],
  'Kamrup & Guwahati Metro': [26.18, 91.75],
  'Morigaon & Nagaon (Kopili)': [26.25, 92.34],
  'Dhemaji & Lakhimpur (Subansiri)': [27.48, 94.58],
  'Dibrugarh (Upper Brahmaputra)': [27.47, 94.91],
  'Golaghat (Dhansiri)': [26.51, 93.96],
  // Bihar
  'Kosi Active Basin (Supaul / Saharsa)': [25.85, 86.85],
  'Gandak Floodplains (Gopalganj)': [26.47, 84.44],
  'Bagmati Basin (Muzaffarpur)': [26.12, 85.39],
  'Darbhanga & Madhubani (Kamla)': [26.15, 85.89],
  'Patna & Danapur (Ganga / Son)': [25.61, 85.14],
  'Bhagalpur (Lower Ganga)': [25.24, 86.98],
  'Purnia & Katihar (Mahananda)': [25.77, 87.47],
  // Kerala
  'Aluva & Ernakulam (Periyar Delta)': [10.11, 76.35],
  'Kuttanad & Alappuzha (Pamba / Vembanad)': [9.49, 76.43],
  'Chalakudy & Thrissur (Chalakudy River)': [10.30, 76.33],
  'Idukki (Cheruthoni / Mullaperiyar)': [9.85, 76.97],
  'Wayanad (Kabini Basin)': [11.68, 76.13],
  'Pathanamthitta (Achankovil / Pamba)': [9.26, 76.78],
  // Odisha
  'Mundali & Cuttack (Mahanadi Apex)': [20.44, 85.74],
  'Kendrapara & Jagatsinghpur (Devi / Kathajodi)': [20.50, 86.42],
  'Puri (Daya / Bhargavi Rivers)': [19.81, 85.83],
  'Jajpur & Bhadrak (Baitarani Basin)': [20.85, 86.33],
  'Balasore (Subarnarekha / Budhabalanga)': [21.49, 86.93],
  'Sambalpur (Hirakud Dam Outflow)': [21.46, 83.98],
  // Maharashtra
  'Chiplun (Vashishti River Basin)': [17.53, 73.51],
  'Mahad (Savitri River Estuary)': [18.08, 73.42],
  'Kolhapur & Shirol (Panchganga)': [16.70, 74.24],
  'Sangli & Miraj (Krishna River Front)': [16.85, 74.58],
  'Satara & Karad (Koyna / Krishna)': [17.28, 74.18],
  'Mumbai Suburban (Mithi River / Mahim)': [19.07, 72.87],
  'Thane & Kalyan (Ulhas River)': [19.24, 73.13],
  // Uttar Pradesh & Delhi
  'Varanasi (Ganga & Varuna Plains)': [25.31, 82.97],
  'Prayagraj / Allahabad (Ganga & Yamuna Sangam)': [25.43, 81.84],
  'Gorakhpur (Rapti & Rohini Basins)': [26.76, 83.37],
  'Ayodhya (Sarayu / Ghaghara Basin)': [26.79, 82.19],
  'Mathura & Agra (Yamuna Lowlands)': [27.17, 78.00],
  'Lucknow (Gomti River Floodplain)': [26.84, 80.94],
  'Kanpur (Ganga Upper Floodplain)': [26.44, 80.33],
  'Central Delhi (Yamuna Floodplain / Kashmere Gate)': [28.66, 77.22],
  'East Delhi (Mayur Vihar / Geeta Colony Lowlands)': [28.61, 77.29],
  // West Bengal
  'Sundarbans Delta (South & North 24 Parganas)': [22.05, 88.75],
  'Murshidabad & Malda (Bhagirathi / Ganga / Farakka)': [24.18, 88.27],
  'Ghatal & Paschim Medinipur (Silabati / Damodar)': [22.67, 87.72],
  'Howrah & Hooghly (Rupnarayan / Damodar)': [22.59, 88.26],
  'Jalpaiguri & Alipurduar (Teesta / Torsa / Jaldhaka)': [26.54, 88.71],
  // Gujarat
  'Banaskantha & Dantiwada (Banas)': [24.17, 72.43],
  'Morbi & Rajkot (Machchhu)': [22.81, 70.83],
  'Bharuch (Narmada Estuary)': [21.70, 72.99],
  'Surat (Tapi Flood Basin)': [21.17, 72.83],
  'Vadodara (Vishwamitri Basin)': [22.30, 73.18],
  // Tamil Nadu
  'Chennai (Adyar / Cooum / Kosasthalaiyar)': [13.08, 80.27],
  'Thanjavur & Tiruvarur (Cauvery Delta)': [10.78, 79.13],
  'Cuddalore (Pennaiyar / Gadilam Rivers)': [11.75, 79.76],
  'Nagapattinam (Vettar / Vennar Estuaries)': [10.76, 79.84],
  // Telangana & Andhra
  'Hyderabad (Musi River / Osmansagar)': [17.38, 78.48],
  'Bhadradri Kothagudem (Godavari / Bhadrachalam)': [17.66, 80.88],
  'Godavari Delta (East Godavari)': [16.98, 82.24],
  'Krishna Delta (Krishna)': [16.18, 81.13],
  // J&K & Ladakh
  'Srinagar (Jhelum River & Dal Lake Basin)': [34.08, 74.79],
  'Anantnag / Islamabad (Upper Jhelum)': [33.73, 75.15],
  'Jammu (Tawi River Basin)': [32.72, 74.85],
  'Leh (Indus River Basin / Choglamsar)': [34.15, 77.57],
  // Uttarakhand & Himachal
  'Rudraprayag & Kedarnath (Mandakini River)': [30.73, 79.06],
  'Chamoli & Joshimath (Alaknanda / Dhauliganga)': [30.55, 79.56],
  'Haridwar & Rishikesh (Ganga Plains Entrance)': [29.94, 78.16],
  'Kullu & Manali (Beas River)': [31.95, 77.10],
  'Mandi (Beas Surge)': [31.70, 76.93]
};
