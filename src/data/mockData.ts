import { Product, Review } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Hydrating Vitamin C Serum',
    brand: 'GlowLab',
    category: 'skincare',
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.5,
    reviewCount: 128,
    images: [
      'https://images.unsplash.com/photo-1585232350744-974fc9804d65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGNyZWFtJTIwbW9pc3R1cml6ZXJ8ZW58MXx8fHwxNzU4NzgxOTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1643379850623-7eb6442cd262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBiZWF1dHklMjBza2luY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc1ODc0NDUwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: 'A powerful vitamin C serum that brightens skin and reduces dark spots with hyaluronic acid for hydration.',
    ingredients: ['Vitamin C (L-Ascorbic Acid)', 'Hyaluronic Acid', 'Vitamin E', 'Ferulic Acid'],
    benefits: ['Brightens skin tone', 'Reduces dark spots', 'Hydrates and plumps', 'Antioxidant protection'],
    variants: {
      sizes: ['15ml', '30ml', '50ml']
    },
    inStock: true,
    isNew: true,
    isTrending: true
  },
  {
    id: '2',
    name: 'Matte Liquid Lipstick',
    brand: 'VelvetKiss',
    category: 'makeup',
    price: 18.99,
    rating: 4.3,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1584013544027-acfe4d8ca478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBsaXBzdGljayUyMGV5ZXNoYWRvd3xlbnwxfHx8fDE3NTg3ODE5ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: 'Long-lasting matte liquid lipstick with intense color payoff that stays put all day.',
    benefits: ['Long-lasting wear', 'Intense color', 'Matte finish', 'Non-drying formula'],
    variants: {
      shades: ['Ruby Red', 'Nude Pink', 'Coral Sunset', 'Berry Crush', 'Classic Red']
    },
    inStock: true,
    isTrending: true
  },
  {
    id: '3',
    name: 'Nourishing Hair Mask',
    brand: 'SilkStrands',
    category: 'haircare',
    price: 24.99,
    rating: 4.7,
    reviewCount: 156,
    images: [
      'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwY2FyZSUyMHNoYW1wb28lMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTg3ODE5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: 'Deep conditioning hair mask with argan oil and keratin for damaged and dry hair.',
    ingredients: ['Argan Oil', 'Keratin', 'Shea Butter', 'Coconut Oil'],
    benefits: ['Deep conditioning', 'Repairs damage', 'Adds shine', 'Reduces frizz'],
    variants: {
      sizes: ['200ml', '500ml']
    },
    inStock: true,
    isNew: true
  },
  {
    id: '4',
    name: 'Glow Foundation',
    brand: 'LuminousBeauty',
    category: 'makeup',
    price: 32.99,
    rating: 4.4,
    reviewCount: 203,
    images: [
      'https://images.unsplash.com/photo-1643379850623-7eb6442cd262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBiZWF1dHklMjBza2luY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc1ODc0NDUwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: 'Buildable coverage foundation with a natural glow finish and SPF 30 protection.',
    benefits: ['Buildable coverage', 'Natural glow', 'SPF 30 protection', 'Long-wearing'],
    variants: {
      shades: ['Porcelain', 'Light', 'Medium', 'Tan', 'Deep']
    },
    inStock: true,
    isTrending: true
  },
  {
    id: '5',
    name: 'Retinol Night Serum',
    brand: 'SkinRenew',
    category: 'skincare',
    price: 45.99,
    originalPrice: 55.99,
    rating: 4.6,
    reviewCount: 97,
    images: [
      'https://images.unsplash.com/photo-1585232350744-974fc9804d65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGNyZWFtJTIwbW9pc3R1cml6ZXJ8ZW58MXx8fHwxNzU4NzgxOTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: 'Gentle retinol serum for evening use to reduce fine lines and improve skin texture.',
    ingredients: ['Retinol', 'Niacinamide', 'Hyaluronic Acid', 'Squalane'],
    benefits: ['Reduces fine lines', 'Improves texture', 'Evens skin tone', 'Anti-aging'],
    variants: {
      sizes: ['15ml', '30ml']
    },
    inStock: true,
    isNew: true
  },
  {
    id: '6',
    name: 'Volumizing Mascara',
    brand: 'LashLift',
    category: 'makeup',
    price: 22.99,
    rating: 4.2,
    reviewCount: 134,
    images: [
      'https://images.unsplash.com/photo-1584013544027-acfe4d8ca478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBsaXBzdGljayUyMGV5ZXNoYWRvd3xlbnwxfHx8fDE3NTg3ODE5ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: 'Dramatic volume and length mascara that lifts and separates lashes without clumping.',
    benefits: ['Dramatic volume', 'Length enhancement', 'No clumping', 'Waterproof formula'],
    variants: {
      shades: ['Black', 'Brown', 'Blue']
    },
    inStock: true
  }
];

export const reviews: Review[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Sarah M.',
    rating: 5,
    comment: 'This serum has completely transformed my skin! I noticed brighter, more even skin tone within just 2 weeks.',
    date: '2024-01-15',
    verified: true
  },
  {
    id: '2',
    userId: '2',
    userName: 'Emma K.',
    rating: 4,
    comment: 'Great product, love the texture and how it absorbs quickly. The vitamin C really works!',
    date: '2024-01-10',
    verified: true
  },
  {
    id: '3',
    userId: '3',
    userName: 'Lisa R.',
    rating: 5,
    comment: 'Best lipstick I\'ve ever used! The color is gorgeous and it truly lasts all day.',
    date: '2024-01-12',
    verified: true
  }
];

export const categories = [
  {
    id: 'skincare',
    name: 'Skincare',
    image: 'https://images.unsplash.com/photo-1585232350744-974fc9804d65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGNyZWFtJTIwbW9pc3R1cml6ZXJ8ZW58MXx8fHwxNzU4NzgxOTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    productCount: 150
  },
  {
    id: 'makeup',
    name: 'Makeup',
    image: 'https://images.unsplash.com/photo-1584013544027-acfe4d8ca478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBsaXBzdGljayUyMGV5ZXNoYWRvd3xlbnwxfHx8fDE3NTg3ODE5ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    productCount: 200
  },
  {
    id: 'haircare',
    name: 'Haircare',
    image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwY2FyZSUyMHNoYW1wb28lMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTg3ODE5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    productCount: 80
  },
  {
    id: 'fragrance',
    name: 'Fragrance',
    image: 'https://images.unsplash.com/photo-1643379850623-7eb6442cd262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBiZWF1dHklMjBza2luY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc1ODc0NDUwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    productCount: 45
  }
];