export type Language = 'nl' | 'en' | 'pl';

export type SportDiscipline = 
  | 'mma' 
  | 'boxing' 
  | 'kickboxing' 
  | 'muay-thai' 
  | 'grappling' 
  | 'karate' 
  | 'fitness';

export type ProductCategory = 
  | 'heren' 
  | 'dames' 
  | 'kids' 
  | 'fight-gear' 
  | 'training' 
  | 'accessoires' 
  | 'nieuw' 
  | 'sale' 
  | 'clubs';

export interface ProductBadge {
  type: 'new' | 'sale' | 'bestseller' | 'limited' | 'last-size';
  label: string;
}

export interface ProductReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  name_en?: string;
  name_pl?: string;
  brand: string;
  description: string;
  description_en?: string;
  description_pl?: string;
  shortDescription: string;
  shortDescription_en?: string;
  shortDescription_pl?: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: string[];
  category: ProductCategory;
  subcategory: string;
  subcategory_en?: string;
  subcategory_pl?: string;
  sport: SportDiscipline[];
  gender: 'men' | 'women' | 'unisex' | 'kids';
  collection?: string;
  material: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  stock: number;
  sku: string;
  badges: ProductBadge[];
  featured?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewCount: number;
  reviews?: ProductReview[];
  technicalDetails?: string[];
  careInstructions?: string[];
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface FilterState {
  category?: ProductCategory;
  subcategory?: string;
  sport?: SportDiscipline;
  gender?: string;
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  material?: string;
  saleOnly: boolean;
  newOnly: boolean;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
}

export interface LoyaltyTier {
  name: string;
  minPoints: number;
  perks: string[];
  discount: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'received' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
  carrier?: string;
  items: CartItem[];
  total: number;
  subtotalExclVat?: number;
  vatAmount?: number;
  isBusinessOrder?: boolean;
  companyName?: string;
  kvkNumber?: string;
  vatNumber?: string;
  paymentMethod?: string;
  idealTransactionRef?: string;
  idealIssuer?: string;
  shippingAddress: {
    name: string;
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
}

// ==========================================
// iDEAL Payment Gateway Types
// ==========================================
export interface IdealIssuer {
  id: string;
  name: string;
  bic: string;
  primaryColor: string;
  accentColor: string;
  badge: string;
  popular?: boolean;
}

export interface IdealPaymentRequest {
  amount: number;
  description: string;
  orderId: string;
  issuer: string;
  consumerName?: string;
  consumerEmail?: string;
}

export interface IdealTransaction {
  id: string;
  status: 'open' | 'pending' | 'authorized' | 'paid' | 'canceled' | 'failed' | 'expired';
  amount: number;
  currency: string;
  description: string;
  orderId: string;
  issuer: string;
  issuerName: string;
  createdAt: string;
  paidAt?: string;
  idealTransactionRef: string;
  consumerIban?: string;
  consumerBic?: string;
}

// ==========================================
// OctagonShop Supplier Catalog & Service Types
// ==========================================
export interface OctagonRawSupplierProduct {
  supplier_sku: string;
  name_pl: string;
  name_en?: string;
  category_path: string; // e.g. "Sprzęt / Rękawice bokserskie"
  collection?: string;   // e.g. "Zęby", "Pasy", "Legion Octagon"
  wholesale_price_pln: number; // Wholesale contract price from Poland
  suggested_retail_price_pln: number; // Suggested Polish retail price
  is_outlet?: boolean;
  stock_quantity: number;
  available_sizes: string[];
  colors: { name: string; hex: string }[];
  material: string;
  image_keys: string[];
  description_pl: string;
  description_en?: string;
  short_description_pl?: string;
  discipline: string; // "Boks", "MMA", "Kickboxing", "Muay Thai", "Streetwear", etc.
  gender: 'men' | 'women' | 'unisex' | 'kids';
  technical_specs?: string[];
  care_instructions?: string[];
}

export interface SupplierSyncConfig {
  plnToEurRate: number; // e.g. 4.30
  wholesaleContractDiscountPct: number; // e.g. 35% discount off Polish retail
  targetProfitMarginPct: number; // markup applied to wholesale cost to set EUR retail price
  dutchVatRatePct: number; // 21%
  importOutletDealsAsSale: boolean;
  minStockLevelToImport: number;
  selectedCategories: string[]; // empty means all
}

export interface SyncStepLog {
  step: string;
  timestamp: string;
  status: 'pending' | 'success' | 'warning' | 'error';
  message: string;
}

export interface CatalogSyncResult {
  success: boolean;
  timestamp: string;
  totalFetched: number;
  importedCount: number;
  updatedCount: number;
  skippedCount: number;
  categoriesBreakdown: Record<string, number>;
  logs: SyncStepLog[];
  errors: string[];
}
