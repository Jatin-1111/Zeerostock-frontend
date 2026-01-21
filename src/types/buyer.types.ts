/**
 * Buyer Types - Comprehensive TypeScript interfaces for buyer functionality
 * Zeerostock B2B Marketplace
 */

// =====================================================
// BASE TYPES & COMMON
// =====================================================

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errorCode?: string;
  errors?: ValidationError[];
  details?: string;
  error?: {
    message?: string;
    code?: string;
    quoteCount?: number;
    acceptedQuoteCount?: number;
    details?: string;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationMeta;
}

// =====================================================
// ORDER TYPES
// =====================================================

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded"
  | "failed";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | "partially_refunded";

export type PaymentMethod =
  | "cod"
  | "online"
  | "upi"
  | "card"
  | "escrow"
  | "wire"
  | "net-terms";

export interface OrderItem {
  itemId: string;
  productId: string;
  productTitle: string;
  productImage: string | null;
  productSku: string | null;
  quantity: number;
  unitPrice: number;
  discount: number;
  finalPrice: number;
  subtotal: number;
  gstAmount: number;
  itemStatus: string;
  supplier?: {
    id: string;
    name: string;
    city: string;
  };
}

export interface OrderPricing {
  itemsSubtotal: number;
  discountAmount: number;
  couponDiscount: number;
  couponCode: string | null;
  gstAmount: number;
  cgstAmount?: number;
  sgstAmount?: number;
  igstAmount?: number;
  shippingCharges: number;
  platformFee: number;
  totalAmount: number;
}

export interface OrderAddress {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  addressType: "home" | "office" | "other";
}

export interface OrderTracking {
  status: string;
  title: string;
  description?: string;
  location?: string;
  isMilestone: boolean;
  timestamp: string;
}

export interface Order {
  orderId: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  items: OrderItem[];
  pricing: OrderPricing;
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
  deliveryEta: string | null;
  shippingPartner: string | null;
  trackingNumber: string | null;
  paymentMethod: PaymentMethod;
  paymentTransactionId: string | null;
  paymentDate: string | null;
  invoiceUrl: string | null;
  invoiceNumber: string | null;
  tracking: OrderTracking[];
  orderNotes?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface OrderSummary {
  orderId: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  itemCount: number;
  orderDate: string;
  estimatedDelivery?: string;
}

export interface OrderStats {
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalSpent: number;
  averageOrderValue: number;
}

export interface OrderFilters extends PaginationParams {
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
}

export interface CreateOrderRequest {
  checkoutSessionId: string;
  shippingAddressId: string;
  billingAddressId?: string;
  paymentMethod: PaymentMethod;
  paymentDetails?: {
    transactionId?: string;
    upiId?: string;
    cardLast4?: string;
  };
  orderNotes?: string;
}

export interface CreateOrderResponse {
  orderId: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  itemCount: number;
  deliveryEta: string;
  createdAt: string;
}

export interface CancelOrderRequest {
  reason: string;
}

// =====================================================
// WATCHLIST TYPES
// =====================================================

export interface WatchlistProduct {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  galleryImages: string[];
  priceBefore: number;
  priceAfter: number;
  discountPercent: number;
  city: string;
  state: string;
  condition: string;
  listingType: "buy_now" | "auction" | "negotiable";
  status: "active" | "sold" | "expired" | "inactive";
  quantity: number;
  expiresAt: string | null;
}

export interface WatchlistItem {
  id: string;
  priceAtAdd: number | null;
  createdAt: string;
  product: WatchlistProduct;
  priceChange?: {
    amount: number;
    percent: number;
    direction: "up" | "down" | "unchanged";
  };
}

export interface AddToWatchlistRequest {
  productId: string;
  notes?: string;
}

// =====================================================
// RECENTLY VIEWED TYPES
// =====================================================

export interface RecentlyViewedProduct {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  priceBefore: number;
  priceAfter: number;
  discountPercent: number;
  city: string;
  state: string;
  condition: string;
  listingType: "buy_now" | "auction" | "negotiable";
  status: "active" | "sold" | "expired" | "inactive";
}

export interface RecentlyViewedItem {
  id: string;
  viewCount: number;
  lastViewedAt: string;
  createdAt: string;
  product: RecentlyViewedProduct;
}

export interface AddRecentlyViewedRequest {
  productId: string;
}

// =====================================================
// REVIEW TYPES
// =====================================================

export interface Review {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string | null;
  orderId: string | null;
  rating: number;
  title: string | null;
  comment: string;
  images: string[];
  helpfulCount: number;
  notHelpfulCount: number;
  isVerifiedPurchase: boolean;
  sellerResponse: string | null;
  sellerRespondedAt: string | null;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewRequest {
  productId: string;
  orderId?: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
}

export interface UpdateReviewRequest {
  rating?: number;
  title?: string;
  comment?: string;
  images?: string[];
}

export interface MarkReviewHelpfulnessRequest {
  isHelpful: boolean;
}

export interface ReviewFilters extends PaginationParams {
  rating?: number;
  status?: "pending" | "approved" | "rejected";
}

// =====================================================
// PROFILE TYPES
// =====================================================

export interface BuyerProfile {
  firstName: string;
  lastName: string;
  companyName: string | null;
  email: string;
  mobile: string;
  businessType: string | null;
  gstNumber: string | null;
  activeRole: string;
  isVerified: boolean;
  isActive: boolean;
  defaultShippingAddress: Address | null;
  stats: OrderStats;
  memberSince: string;
  lastLogin: string | null;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  businessType?: string;
  gstNumber?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// =====================================================
// ADDRESS TYPES
// =====================================================

export type AddressType = "shipping" | "billing" | "both";

export interface Address {
  id: string;
  user_id: string;
  contact_name: string;
  contact_phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
  landmark: string | null;
  address_type: AddressType;
  is_default: boolean;
  label?: string | null;
  country?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateAddressRequest {
  contact_name: string;
  contact_phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  address_type: AddressType;
  is_default?: boolean;
  label?: string;
}

export interface UpdateAddressRequest {
  contact_name?: string;
  contact_phone?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  landmark?: string;
  address_type?: AddressType;
  is_default?: boolean;
  label?: string;
}

// =====================================================
// NOTIFICATION TYPES
// =====================================================

export type NotificationType =
  | "order_placed"
  | "order_confirmed"
  | "order_shipped"
  | "order_delivered"
  | "order_cancelled"
  | "payment_received"
  | "price_drop"
  | "product_available"
  | "review_response"
  | "system"
  | "promotion";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  relatedId: string | null;
  relatedType: string | null;
  actionUrl: string | null;
  metadata: Record<string, any> | null;
  createdAt: string;
}

export interface NotificationFilters extends PaginationParams {
  type?: NotificationType;
  isRead?: boolean;
}

export interface MarkNotificationsAsReadRequest {
  notificationIds: string[];
}

// =====================================================
// SUPPORT TICKET TYPES
// =====================================================

export type TicketPriority = "low" | "medium" | "high" | "urgent";

export type TicketStatus =
  | "open"
  | "in_progress"
  | "waiting_customer"
  | "resolved"
  | "closed";

export type TicketCategory =
  | "order"
  | "payment"
  | "product"
  | "account"
  | "technical"
  | "other";

export interface TicketMessage {
  id: string;
  ticketId: string;
  senderId: string;
  senderType: "buyer" | "admin" | "system";
  message: string;
  attachments: string[];
  isInternal: boolean;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  userId: string;
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  orderId: string | null;
  orderNumber: string | null;
  productId: string | null;
  productTitle: string | null;
  description: string;
  attachments: string[];
  assignedTo: string | null;
  assignedToName: string | null;
  rating: number | null;
  feedback: string | null;
  messages: TicketMessage[];
  createdAt: string;
  updatedAt: string;
  closedAt: string | null;
}

export interface CreateSupportTicketRequest {
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  orderId?: string;
  productId?: string;
  description: string;
  attachments?: string[];
}

export interface AddTicketMessageRequest {
  message: string;
  attachments?: string[];
}

export interface RateTicketRequest {
  rating: number;
  feedback?: string;
}

export interface SupportTicketFilters extends PaginationParams {
  status?: TicketStatus;
  category?: TicketCategory;
  priority?: TicketPriority;
}

// =====================================================
// DASHBOARD TYPES
// =====================================================

export interface DashboardStats {
  orderStats: OrderStats;
  watchlistCount: number;
  recentlyViewedCount: number;
  unreadNotifications: number;
  pendingReviews: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentOrders: OrderSummary[];
  notifications: Notification[];
  recommendedProducts?: any[];
}

// =====================================================
// QUOTE/RFQ TYPES (for future implementation)
// =====================================================

// =====================================================
// RFQ AND QUOTE TYPES
// =====================================================

export type RFQStatus = "active" | "closed" | "expired" | "fulfilled";
export type QuoteStatus = "pending" | "accepted" | "rejected" | "expired";
export type RFQUnit =
  | "pieces"
  | "Kg"
  | "lbs"
  | "tons"
  | "liters"
  | "gallons"
  | "meters"
  | "feet"
  | "boxes"
  | "pallets"
  | "other";

export interface RFQAttachment {
  fileName: string;
  fileUrl: string;
  fileSize?: number;
  fileType?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
}

export interface Industry {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
}

export interface Supplier {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phone?: string;
  profileImage?: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  description?: string;
  imageUrl?: string;
  price?: number;
}

export interface RFQ {
  id: string;
  rfqNumber: string;
  buyerId: string;
  title: string;
  categoryId: string;
  industryId: string;
  quantity: number;
  unit: RFQUnit;
  budgetMin?: number;
  budgetMax?: number;
  requiredByDate?: string;
  detailedRequirements?: string;
  preferredLocation?: string;
  durationDays: number;
  status: RFQStatus;
  attachments?: RFQAttachment[];
  viewCount: number;
  quoteCount: number;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  industry?: Industry;
  buyer?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
  };
  quotes?: Quote[];
}

export interface Quote {
  id: string;
  quoteNumber: string;
  rfqId: string;
  supplierId: string;
  buyerId: string;
  productId?: string;
  quotePrice: number;
  quantity: number;
  deliveryDays: number;
  validUntil: string;
  status: QuoteStatus;
  notes?: string;
  termsAndConditions?: string;
  warranty?: string;
  paymentTerms?: string;
  discount?: number;
  discountPercentage?: number;
  acceptedAt?: string;
  rejectionReason?: string;
  buyerNotes?: string;
  createdAt: string;
  updatedAt: string;
  supplier?: Supplier;
  product?: Product;
  rfq?: RFQ;
  messages?: QuoteMessage[];
  unreadMessageCount?: number;
}

export interface QuoteMessage {
  id: string;
  quoteId: string;
  senderId: string;
  receiverId: string;
  message: string;
  isRead: boolean;
  attachments?: RFQAttachment[];
  createdAt: string;
  updatedAt: string;
  sender?: {
    id: string;
    firstName: string;
    lastName: string;
    companyName: string;
  };
  receiver?: {
    id: string;
    firstName: string;
    lastName: string;
    companyName: string;
  };
}

export interface RFQStats {
  totalRFQs: number;
  activeRFQs: number;
  closedRFQs: number;
  expiredRFQs: number;
  fulfilledRFQs: number;
  avgQuotesPerRFQ: number;
  avgResponseTime: number;
}

export interface QuoteStats {
  totalQuotes: number;
  pendingQuotes: number;
  acceptedQuotes: number;
  rejectedQuotes: number;
  unreadMessages: number;
  avgResponseTime: number;
}

export interface CreateRFQRequest {
  title: string;
  categoryId: string;
  industryId: string;
  quantity: number;
  unit: RFQUnit;
  budgetMin?: number;
  budgetMax?: number;
  requiredByDate?: string;
  detailedRequirements?: string;
  preferredLocation?: string;
  durationDays?: number;
  attachments?: RFQAttachment[];
}

export interface UpdateRFQRequest extends Partial<CreateRFQRequest> {}

export interface RFQFilters extends PaginationParams {
  status?: RFQStatus;
  category?: string;
  industry?: string;
  search?: string;
  sortBy?: "createdAt" | "updatedAt" | "expiresAt" | "quoteCount";
  sortOrder?: "ASC" | "DESC";
}

export interface QuoteFilters extends PaginationParams {
  status?: QuoteStatus;
  rfqId?: string;
  search?: string;
  sortBy?:
    | "createdAt"
    | "updatedAt"
    | "quotePrice"
    | "deliveryDays"
    | "validUntil";
  sortOrder?: "ASC" | "DESC";
}

export interface AcceptQuoteRequest {
  createOrder?: boolean;
  shippingAddressId?: string;
  notes?: string;
}

export interface RejectQuoteRequest {
  reason: string;
}

export interface SendMessageRequest {
  message: string;
  attachments?: RFQAttachment[];
}

// =====================================================
// SETTINGS TYPES
// =====================================================

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  marketing: boolean;
  digest: boolean;
  alerts: boolean;
}

export interface PrivacySettings {
  dataSharing: boolean;
  analytics: boolean;
}

export interface LanguagePreferences {
  language: string;
  region: string;
  dateFormat: string;
  timeFormat: string;
  currency: string;
}

export interface AccountInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  gstNumber?: string;
  bio?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export interface UserSettings {
  account: AccountInfo;
  notifications: NotificationPreferences;
  privacy: PrivacySettings;
  language: LanguagePreferences;
}

export type SettingsSection =
  | "account"
  | "notifications"
  | "privacy"
  | "language";

export interface UpdateSettingsRequest {
  section: SettingsSection;
  data:
    | Partial<AccountInfo>
    | Partial<NotificationPreferences>
    | Partial<PrivacySettings>
    | Partial<LanguagePreferences>;
}

// =====================================================
// EXPORT ALL TYPES
// =====================================================

export // Already exported above
 type {};

// Type guards for runtime checking
export const isOrderStatus = (status: string): status is OrderStatus => {
  return [
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
    "refunded",
    "failed",
  ].includes(status);
};

export const isPaymentMethod = (method: string): method is PaymentMethod => {
  return ["cod", "online", "upi"].includes(method);
};

export const isAddressType = (type: string): type is AddressType => {
  return ["home", "office", "other", "shipping", "billing"].includes(type);
};

export const isNotificationType = (type: string): type is NotificationType => {
  return [
    "order_placed",
    "order_confirmed",
    "order_shipped",
    "order_delivered",
    "order_cancelled",
    "payment_received",
    "price_drop",
    "product_available",
    "review_response",
    "system",
    "promotion",
  ].includes(type);
};
