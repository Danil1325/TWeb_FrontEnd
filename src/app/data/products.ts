export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  fullDescription: string;
  price: number;
  image: string;
  inStock: boolean;
  stockQuantity: number;
  manufacturer: string;
  activeIngredient?: string;
  dosage?: string;
  packaging?: string;
  prescriptionRequired: boolean;
  featured?: boolean;
}

export const categories = [
  'All Products',
  'Antibiotics',
  'Pain Relief',
  'Cardiovascular',
  'Diabetes Care',
  'Respiratory',
  'Dermatology',
  'Vitamins & Supplements',
  'Medical Devices',
  'First Aid'
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Amoxicillin 500mg',
    category: 'Antibiotics',
    description: 'Broad-spectrum antibiotic for bacterial infections',
    fullDescription: 'Amoxicillin is a penicillin antibiotic that fights bacteria. It is used to treat many different types of infection caused by bacteria, such as tonsillitis, bronchitis, pneumonia, and infections of the ear, nose, throat, skin, or urinary tract.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
    inStock: true,
    stockQuantity: 500,
    manufacturer: 'PharmaCorp',
    activeIngredient: 'Amoxicillin Trihydrate',
    dosage: '500mg',
    packaging: '100 capsules/box',
    prescriptionRequired: true,
    featured: true
  },
  {
    id: '2',
    name: 'Ibuprofen 400mg',
    category: 'Pain Relief',
    description: 'Anti-inflammatory pain reliever',
    fullDescription: 'Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID). It works by reducing hormones that cause inflammation and pain in the body. Used to reduce fever and treat pain or inflammation.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    inStock: true,
    stockQuantity: 800,
    manufacturer: 'MediPharm',
    activeIngredient: 'Ibuprofen',
    dosage: '400mg',
    packaging: '50 tablets/box',
    prescriptionRequired: false,
    featured: true
  },
  {
    id: '3',
    name: 'Metformin 850mg',
    category: 'Diabetes Care',
    description: 'Oral diabetes medication',
    fullDescription: 'Metformin is an oral diabetes medicine that helps control blood sugar levels. It is used together with diet and exercise to improve blood sugar control in adults with type 2 diabetes mellitus.',
    price: 18.50,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400',
    inStock: true,
    stockQuantity: 350,
    manufacturer: 'DiabetesCare Inc',
    activeIngredient: 'Metformin Hydrochloride',
    dosage: '850mg',
    packaging: '60 tablets/box',
    prescriptionRequired: true,
    featured: true
  },
  {
    id: '4',
    name: 'Lisinopril 10mg',
    category: 'Cardiovascular',
    description: 'ACE inhibitor for blood pressure',
    fullDescription: 'Lisinopril is an ACE inhibitor that is used to treat high blood pressure (hypertension). Lowering high blood pressure helps prevent strokes, heart attacks, and kidney problems.',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400',
    inStock: true,
    stockQuantity: 420,
    manufacturer: 'CardioHealth',
    activeIngredient: 'Lisinopril',
    dosage: '10mg',
    packaging: '30 tablets/box',
    prescriptionRequired: true,
    featured: false
  },
  {
    id: '5',
    name: 'Salbutamol Inhaler',
    category: 'Respiratory',
    description: 'Bronchodilator for asthma relief',
    fullDescription: 'Salbutamol is a bronchodilator that relaxes muscles in the airways and increases air flow to the lungs. Used to treat or prevent bronchospasm in people with reversible obstructive airway disease.',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1587854680352-936b22b91030?w=400',
    inStock: true,
    stockQuantity: 200,
    manufacturer: 'RespiraTech',
    activeIngredient: 'Salbutamol Sulfate',
    dosage: '100mcg/dose',
    packaging: '200 doses/inhaler',
    prescriptionRequired: true,
    featured: true
  },
  {
    id: '6',
    name: 'Hydrocortisone Cream 1%',
    category: 'Dermatology',
    description: 'Topical corticosteroid for skin inflammation',
    fullDescription: 'Hydrocortisone topical is used to treat redness, swelling, itching, and discomfort of various skin conditions. It is a mild corticosteroid.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
    inStock: true,
    stockQuantity: 600,
    manufacturer: 'DermaCare',
    activeIngredient: 'Hydrocortisone',
    dosage: '1%',
    packaging: '30g tube',
    prescriptionRequired: false,
    featured: false
  },
  {
    id: '7',
    name: 'Vitamin D3 5000 IU',
    category: 'Vitamins & Supplements',
    description: 'Essential vitamin for bone health',
    fullDescription: 'Vitamin D3 supplement helps the body absorb calcium and phosphorus. Getting the right amount of vitamin D is important for normal growth and development of bones and teeth.',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1550572017-4ac774e296d1?w=400',
    inStock: true,
    stockQuantity: 750,
    manufacturer: 'VitaHealth',
    activeIngredient: 'Cholecalciferol (Vitamin D3)',
    dosage: '5000 IU',
    packaging: '120 softgels/bottle',
    prescriptionRequired: false,
    featured: true
  },
  {
    id: '8',
    name: 'Digital Thermometer',
    category: 'Medical Devices',
    description: 'Fast and accurate temperature reading',
    fullDescription: 'Professional digital thermometer with quick 10-second reading time. Accurate and easy to use for oral, rectal, or underarm temperature measurement.',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1584555684040-bad07f3f00ed?w=400',
    inStock: true,
    stockQuantity: 300,
    manufacturer: 'MediTech',
    packaging: '1 unit/box',
    prescriptionRequired: false,
    featured: false
  },
  {
    id: '9',
    name: 'First Aid Kit Complete',
    category: 'First Aid',
    description: 'Comprehensive emergency care kit',
    fullDescription: 'Complete first aid kit with all essential supplies including bandages, gauze, antiseptic wipes, medical tape, scissors, tweezers, and more. Perfect for home, office, or travel.',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400',
    inStock: true,
    stockQuantity: 150,
    manufacturer: 'SafetyFirst',
    packaging: '1 kit (150 pieces)',
    prescriptionRequired: false,
    featured: true
  },
  {
    id: '10',
    name: 'Azithromycin 250mg',
    category: 'Antibiotics',
    description: 'Macrolide antibiotic',
    fullDescription: 'Azithromycin is a macrolide antibiotic used to treat many different types of infections caused by bacteria, such as respiratory infections, skin infections, ear infections.',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
    inStock: true,
    stockQuantity: 380,
    manufacturer: 'PharmaCorp',
    activeIngredient: 'Azithromycin',
    dosage: '250mg',
    packaging: '6 tablets/box',
    prescriptionRequired: true,
    featured: false
  },
  {
    id: '11',
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    description: 'Pain reliever and fever reducer',
    fullDescription: 'Paracetamol (acetaminophen) is a pain reliever and a fever reducer. Used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers.',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    inStock: true,
    stockQuantity: 1000,
    manufacturer: 'MediPharm',
    activeIngredient: 'Paracetamol',
    dosage: '500mg',
    packaging: '100 tablets/box',
    prescriptionRequired: false,
    featured: false
  },
  {
    id: '12',
    name: 'Atorvastatin 20mg',
    category: 'Cardiovascular',
    description: 'Cholesterol-lowering medication',
    fullDescription: 'Atorvastatin is used along with a proper diet to help lower cholesterol and fats in the blood. It belongs to a group of drugs known as statins, which work by reducing the amount of cholesterol made by the liver.',
    price: 26.50,
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400',
    inStock: true,
    stockQuantity: 450,
    manufacturer: 'CardioHealth',
    activeIngredient: 'Atorvastatin Calcium',
    dosage: '20mg',
    packaging: '30 tablets/box',
    prescriptionRequired: true,
    featured: true
  }
];
