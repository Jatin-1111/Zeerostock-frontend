// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errorCode?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  success: false;
  message: string;
  errorCode?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

// User & Authentication Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  companyName?: string;
  gstNumber?: string;
  roles: string[];
  activeRole: "buyer" | "supplier" | "admin";
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  buyerProfile?: BuyerProfile;
  supplierProfile?: SupplierProfile;
}

export interface BuyerProfile {
  industry?: string;
  purchaseFrequency?: string;
  preferredPaymentTerms?: string;
}

export interface SupplierProfile {
  businessName?: string;
  businessType?: string;
  businessDescription?: string;
  specializations?: string[];
  certifications?: string[];
  isVerified: boolean;
  verificationStatus?: "pending" | "approved" | "rejected" | "under_review";
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface OTPVerificationResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// Product Types
export interface Product {
  productId: string;
  title: string;
  slug: string;
  description?: string;
  image: string;
  images?: string[];
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  condition: "new" | "like-new" | "good" | "fair";
  listingType: "auction" | "fixed" | "negotiable";
  category: {
    id: string;
    name: string;
    slug: string;
  };
  industry?: {
    id: string;
    name: string;
    slug: string;
  };
  city?: string;
  state?: string;
  seller: {
    id: string;
    name: string;
    rating?: number;
    isVerified: boolean;
  };
  views?: number;
  watchers?: number;
  stockQuantity?: number;
  minimumOrderQuantity?: number;
  timeLeft?: number;
  isFeatured?: boolean;
  isSponsored?: boolean;
  createdAt: string;
}

export interface ProductDetail extends Product {
  specifications?: Record<string, unknown>;
  warranty?: string;
  returnPolicy?: string;
  shippingInfo?: string;
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  categoryId?: string;
  industryId?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string | string[];
  listingType?: string | string[];
  verified?: boolean;
  city?: string;
  minDiscount?: number;
  maxDiscount?: number;
  q?: string;
  sort?:
    | "relevance"
    | "price-asc"
    | "price-desc"
    | "newest"
    | "views"
    | "ending-soon"
    | "rating"
    | "discount";
}

// Category & Industry Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  productCount?: number;
  isActive: boolean;
}

export interface Industry {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  productCount?: number;
  isActive: boolean;
}

// Cart Types
export interface CartItem {
  itemId: string; // Backend returns itemId, not id
  cartItemId?: string; // Alias for itemId
  productId: string;
  title: string;
  slug?: string | null;
  image?: string | null;
  quantity: number;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  gstPercent?: number;
  listingType?: string;
  condition?: string;
  unit?: string;
  category?: string | null; // Category name as string
  seller?: {
    id: string | null;
    name: string;
    verified: boolean;
  };
  availability?: {
    isAvailable: boolean;
    priceChanged: boolean;
    stockChanged: boolean;
    currentStock: number;
  };
  available?: boolean; // Convenience field for quick check
  addedAt: string;
  // Computed fields
  subtotal?: number; // Can be computed: price * quantity
  product?: Product; // Legacy support
}

export interface CartPricing {
  subtotal: number;
  discount: number;
  gst: number;
  shipping: number;
  platformFee: number;
  total: number;
  savings?: number;
}

export interface PricingSummary {
  itemSubtotal: number;
  discountAmount: number;
  couponDiscount: number;
  subtotalAfterDiscounts: number;
  gstAmount: number;
  shippingCharges: number;
  platformFee: number;
  finalPayableAmount: number;
  totalSavings: number;
  couponDetails?: {
    code: string;
    discountType: string;
    discountValue: number;
  } | null;
  itemsBreakdown?: Array<{
    itemId: string;
    productId: string;
    title: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    subtotal: number;
  }>;
}

export interface CheckoutSessionResponse {
  sessionToken: string;
  sessionId: string;
  cartItems: CartItem[];
  itemCount: number;
  pricingSummary: PricingSummary;
  expiresAt: string;
  expiresIn: number;
}

export interface Cart {
  items: CartItem[];
  itemCount: number;
  summary: CartPricing; // Backend returns "summary" not "pricing"
  pricing?: CartPricing; // Alias for backward compatibility
  coupon?: {
    code: string;
    discount: number;
    type: "percentage" | "fixed";
  };
  hasIssues?: boolean;
  warnings?: string[];
}

// Homepage Types
export interface HeroBanner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  isActive: boolean;
  order: number;
}

export interface MarketInsights {
  activeListings: number;
  liveAuctions: number;
  volumeToday: number;
  transactionsToday: number;
  marketHeatIndex: number;
  demandSupplyRatio: number;
  newListingsToday: number;
  newSignupsToday: number;
  topCategories: Array<{
    name: string;
    volume: number;
    growth: number;
  }>;
}

export interface QuickStats {
  totalUsers: number;
  formattedUsers: string;
  transactionVolume: number;
  formattedVolume: string;
  successRate: number;
  formattedSuccessRate: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  isFeatured: boolean;
  verified: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  image?: string;
  isFeatured: boolean;
}

// Search Types
export interface SearchSuggestion {
  text: string;
  type: "product" | "category" | "query";
  count?: number;
}

export interface PopularSearch {
  query: string;
  count: number;
}

// Review Types
export interface Review {
  id: string;
  rating: number;
  title?: string;
  comment: string;
  userName: string;
  userImage?: string;
  isVerifiedPurchase: boolean;
  helpful: number;
  createdAt: string;
}

// Auction Types
export interface Auction {
  id: string;
  productId: string;
  startPrice: number;
  currentPrice: number;
  bidIncrement: number;
  startTime: string;
  endTime: string;
  totalBids: number;
  highestBidder?: string;
  isActive: boolean;
}

// Form Data Types
export interface SignupFormData {
  firstName: string;
  lastName: string;
  businessEmail: string;
  mobile: string;
  password: string;
  companyName: string;
  gstNumber?: string;
  businessType: string;
  acceptedTerms: boolean;
}

export interface LoginFormData {
  identifier: string; // email or mobile
  password: string;
  requestedRole?: "buyer" | "supplier" | "admin"; // Optional role selection
}

export interface OTPVerifyData {
  identifier: string;
  otp: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  companyName?: string;
}

// Supplier Verification Types
export interface SupplierVerificationRequest {
  businessName: string;
  businessType: string;
  gstNumber: string;
  businessAddress: string;
  city: string;
  state: string;
  pincode: string;
  businessDescription: string;
  specializations: string[];
  yearsInBusiness: number;
  annualTurnover?: number;
  certifications?: string[];
  documents?: File[];
}

export interface SupplierVerification {
  id: string;
  userId: string;
  status: "pending" | "approved" | "rejected" | "under_review";
  businessName: string;
  businessType: string;
  gstNumber: string;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
  rejectionReason?: string;
}
