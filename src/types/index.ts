export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  ingredients?: string[];
  benefits?: string[];
  variants?: {
    shades?: string[];
    sizes?: string[];
  };
  inStock: boolean;
  isNew?: boolean;
  isTrending?: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedVariant?: {
    shade?: string;
    size?: string;
  };
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  orderDate: string;
  trackingNumber?: string;
}