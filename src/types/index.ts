export type ProductCategory = 
  | 'All'
  | 'Baby Tees & Tops'
  | 'Leather & Jackets'
  | 'Denim & Bottoms'
  | 'Dresses & Skirts'
  | 'Hoodies & Knits'
  | 'Bags & Accessories';

export type ProductCondition = 
  | 'Deadstock Vintage'
  | 'Vintage Archive'
  | 'Excellent Vintage'
  | 'Like New'
  | 'Good';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  condition: ProductCondition;
  era: string; // e.g. "1994", "1998", "Y2K (2001)"
  sizes: string[];
  primaryImage: string;
  secondaryImage?: string;
  images: string[];
  featured?: boolean;
  isNewDrop?: boolean;
  isBestSeller?: boolean;
  isRarePiece?: boolean;
  stockCount: number;
  description: string;
  details: string[];
  measurements: {
    pitToPit?: string;
    length?: string;
    shoulder?: string;
    waist?: string;
    inseam?: string;
    legOpening?: string;
  };
  material: string;
  origin: string;
  color: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'error';
}

export interface FilterOptions {
  category: ProductCategory;
  condition: string;
  size: string;
  priceRange: [number, number];
  searchQuery: string;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rare';
}
