export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Antibiotic Resistance: What Pharmacies Need to Know',
    excerpt: 'Learn about the growing challenge of antibiotic resistance and how pharmacies can play a crucial role in combating this global health threat.',
    content: 'Antibiotic resistance is one of the biggest threats to global health, food security, and development today. Pharmacies are on the frontline of this battle...',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    author: 'Dr. Sarah Johnson',
    date: '2026-02-20',
    category: 'Healthcare',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Best Practices for Medication Storage and Inventory Management',
    excerpt: 'Essential guidelines for proper medication storage, temperature control, and efficient inventory management in your pharmacy.',
    content: 'Proper medication storage is critical for maintaining drug efficacy and patient safety. Temperature-sensitive medications require special attention...',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800',
    author: 'Mark Thompson',
    date: '2026-02-15',
    category: 'Operations',
    readTime: '7 min read'
  },
  {
    id: '3',
    title: 'New Regulations: 2026 Pharmaceutical Industry Updates',
    excerpt: 'Stay informed about the latest regulatory changes affecting pharmaceutical distribution and pharmacy operations.',
    content: 'The pharmaceutical industry continues to evolve with new regulations aimed at improving patient safety and supply chain security...',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
    author: 'Jennifer Lee',
    date: '2026-02-10',
    category: 'Regulations',
    readTime: '6 min read'
  },
  {
    id: '4',
    title: 'Optimizing Your Pharmacy: Technology Solutions for 2026',
    excerpt: 'Discover the latest technology solutions that can streamline operations and improve patient care in modern pharmacies.',
    content: 'Digital transformation is revolutionizing pharmacy operations. From automated dispensing systems to AI-powered inventory management...',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
    author: 'Robert Chen',
    date: '2026-02-05',
    category: 'Technology',
    readTime: '8 min read'
  },
  {
    id: '5',
    title: 'Managing Controlled Substances: Compliance and Security',
    excerpt: 'A comprehensive guide to handling controlled substances while maintaining compliance with federal and state regulations.',
    content: 'Controlled substances require strict handling procedures and meticulous record-keeping. Understanding DEA requirements is essential...',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800',
    author: 'Dr. Michael Brown',
    date: '2026-01-28',
    category: 'Compliance',
    readTime: '10 min read'
  },
  {
    id: '6',
    title: 'Seasonal Flu Preparedness: Stocking Essentials',
    excerpt: 'Prepare your pharmacy for flu season with our comprehensive guide to essential medications and supplies.',
    content: 'As flu season approaches, pharmacies need to ensure adequate stock of antivirals, vaccines, and symptomatic relief medications...',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800',
    author: 'Emily Davis',
    date: '2026-01-22',
    category: 'Seasonal',
    readTime: '5 min read'
  }
];
