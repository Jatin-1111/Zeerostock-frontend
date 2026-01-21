import { apiRequest } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.types";

// Types for supplier-specific data
export interface SupplierListing {
  id: string;
  title: string;
  slug: string;
  description: string;
  price_before: number;
  price_after: number;
  discount_percent: number;
  image_url: string;
  condition: string;
  quantity: number;
  unit: string;
  city: string;
  state: string;
  views_count: number;
  watchers_count: number;
  inquiries_count: number;
  status: string;
  listing_type: string;
  listed_at: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
  category_name: string;
  category_slug: string;
  rating: number;
  review_count: number;
  category_id?: number;
  gallery_images?: string | string[];
  available_quantity?: number;
  min_order_quantity?: number;
  // Technical Specification fields
  material_type?: string;
  material_grade?: string;
  diameter_range?: string;
  wall_thickness_range?: string;
  length_min?: string;
  length_unit?: string;
  weight_per_unit?: string;
  weight_unit?: string;
  manufacturing_process?: string;
  // Compliance & Certification fields
  certifications?: string | string[];
  other_certification?: string;
}

export interface SupplierDashboardStats {
  listings: {
    active_listings: number;
    total_listings: number;
    sold_listings: number;
    expired_listings: number;
    total_views: number;
    total_watchers: number;
    total_inquiries: number;
  };
  orders: {
    total_orders: number;
    pending_orders: number;
    processing_orders: number;
    shipped_orders: number;
    delivered_orders: number;
    total_revenue: number;
    revenue_this_month: number;
  };
  recentActivity: Array<{
    id: string;
    title: string;
    image_url: string;
    price_after: number;
    views_count: number;
    watchers_count: number;
    quantity: number;
    category_name: string;
    created_at: string;
  }>;
  rfqMatches?: {
    totalMatches?: number;
    topMatch?: {
      title: string;
      matchPercentage: number;
      estimatedValue: number;
    };
  };
  performance?: {
    rating?: number;
    responseRate?: number;
    onTimeDelivery?: number;
    quoteWinRate?: number;
  };
}

export interface SupplierProfileData {
  company_info: {
    company_name: string;
    website: string;
    business_type: string;
    description: string;
    phone: string;
    primary_categories: string[];
  };
  business_metrics: {
    rating: number;
    response_rate: number;
    total_reviews: number;
    member_since: number;
  };
}

export interface SupplierOrder {
  id: string;
  order_number: string;
  status: string;
  payment_status: string;
  total_amount: number;
  created_at: string;
  updated_at: string;
  buyer_name: string;
  buyer_company: string;
  buyer_mobile: string;
  items_count: number;
  supplier_total: number;
  items: Array<{
    id: string;
    product_title: string;
    product_image: string;
    quantity: number;
    unit_price: number;
    final_price: number;
    subtotal: number;
    item_status: string;
  }>;
}

export interface CreateListingData {
  title: string;
  description: string;
  categoryId: string;
  priceBefore?: number;
  priceAfter: number;
  discountPercent?: number;
  imageUrl: string;
  galleryImages?: string[];
  condition?: "new" | "like-new" | "good" | "fair" | "refurbished";
  quantity: number;
  unit: string;
  city: string;
  state: string;
  listingType?: "auction" | "fixed" | "negotiable";
  expiresAt?: string;
  availableQuantity?: number;
  minOrderQuantity?: number;
  // Technical Specification fields
  materialType?: string;
  materialGrade?: string;
  diameterRange?: string;
  wallThicknessRange?: string;
  lengthMin?: string;
  lengthUnit?: string;
  weightPerUnit?: string;
  weightUnit?: string;
  manufacturingProcess?: string;
  // Compliance & Certification fields
  certifications?: string[];
  otherCertification?: string;
}

export interface UpdateListingData extends Partial<CreateListingData> {
  status?: "active" | "draft" | "sold" | "expired";
}

export const supplierService = {
  /**
   * Get supplier profile with company info and business metrics
   */
  async getProfile(): Promise<ApiResponse<SupplierProfileData>> {
    return apiRequest("get", "/supplier/profile");
  },

  /**
   * Get all listings for the authenticated supplier
   */
  async getMyListings(params?: {
    status?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
  }): Promise<
    ApiResponse<{
      listings: SupplierListing[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>
  > {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append("status", params.status);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const url = `/supplier/listings${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    return apiRequest("get", url);
  },

  /**
   * Get a specific listing by ID
   */
  async getListingById(id: string): Promise<ApiResponse<SupplierListing>> {
    return apiRequest("get", `/supplier/listings/${id}`);
  },

  /**
   * Create a new listing
   */
  async createListing(
    data: CreateListingData,
  ): Promise<ApiResponse<SupplierListing>> {
    return apiRequest("post", "/supplier/listings", data);
  },

  /**
   * Update an existing listing
   */
  async updateListing(
    id: string,
    data: UpdateListingData,
  ): Promise<ApiResponse<SupplierListing>> {
    return apiRequest("put", `/supplier/listings/${id}`, data);
  },

  /**
   * Delete a listing
   */
  async deleteListing(id: string): Promise<ApiResponse<void>> {
    return apiRequest("delete", `/supplier/listings/${id}`);
  },

  /**
   * Get supplier dashboard statistics
   */
  async getDashboardStats(): Promise<ApiResponse<SupplierDashboardStats>> {
    return apiRequest("get", "/supplier/dashboard/stats");
  },

  /**
   * Get supplier orders
   */
  async getOrders(params?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<
    ApiResponse<{
      orders: SupplierOrder[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>
  > {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append("status", params.status);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const url = `/supplier/orders${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    return apiRequest("get", url);
  },

  /**
   * Update order item status
   */
  async updateOrderItemStatus(
    orderId: string,
    itemId: string,
    status: string,
  ): Promise<ApiResponse<any>> {
    return apiRequest(
      "put",
      `/supplier/orders/${orderId}/items/${itemId}/status`,
      { status },
    );
  },

  /**
   * Get supplier analytics
   */
  async getAnalytics(params?: { period?: number }): Promise<
    ApiResponse<{
      overview: {
        active_listings: number;
        total_views: number;
        total_watchers: number;
        total_inquiries: number;
        avg_rating: number;
        new_listings: number;
        total_orders: number;
        total_revenue: number;
        revenue_this_month: number;
        revenue_growth: number;
        avg_response_hours: number;
        response_rate: number;
      };
      salesByCategory: Array<{
        category: string;
        listing_count: number;
        total_views: number;
        revenue: number;
      }>;
      performanceMetrics: Array<{
        date: string;
        listings_added: number;
        total_views: number;
        total_watchers: number;
      }>;
      topProducts: Array<{
        id: string;
        title: string;
        image_url: string;
        price_after: number;
        views_count: number;
        watchers_count: number;
        inquiries_count: number;
        rating: number;
        review_count: number;
      }>;
      period: number;
    }>
  > {
    const queryParams = new URLSearchParams();
    if (params?.period) queryParams.append("period", params.period.toString());

    const url = `/supplier/analytics${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    return apiRequest("get", url);
  },

  /**
   * Get payment transactions
   */
  async getPayments(params?: {
    page?: number;
    limit?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<
    ApiResponse<{
      transactions: Array<{
        id: string;
        transaction_id: string;
        order_id: string;
        order_number: string;
        amount: number;
        payment_method: string;
        payment_gateway: string;
        status: string;
        created_at: string;
        updated_at: string;
        buyer_name: string;
        buyer_company: string;
      }>;
      summary: {
        total_transactions: number;
        total_received: number;
        pending_amount: number;
        received_this_month: number;
      };
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>
  > {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.status) queryParams.append("status", params.status);
    if (params?.startDate) queryParams.append("startDate", params.startDate);
    if (params?.endDate) queryParams.append("endDate", params.endDate);

    const url = `/supplier/payments${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    return apiRequest("get", url);
  },

  /**
   * Get invoices
   */
  async getInvoices(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<
    ApiResponse<{
      invoices: Array<{
        id: string;
        invoice_number: string;
        order_id: string;
        order_number: string;
        amount: number;
        tax_amount: number;
        total_amount: number;
        status: string;
        issue_date: string;
        due_date: string;
        paid_date: string | null;
        created_at: string;
        buyer_name: string;
        buyer_company: string;
        buyer_email: string;
      }>;
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>
  > {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.status) queryParams.append("status", params.status);

    const url = `/supplier/invoices${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    return apiRequest("get", url);
  },

  /**
   * Get RFQ opportunities
   */
  async getRFQs(params?: {
    page?: number;
    limit?: number;
    status?: string;
    categoryId?: string;
    industryId?: string;
    search?: string;
  }): Promise<
    ApiResponse<{
      rfqs: Array<{
        id: string;
        rfq_number: string;
        title: string;
        quantity: number;
        unit: string;
        budget_min: number | null;
        budget_max: number | null;
        required_by_date: string | null;
        detailed_requirements: string;
        preferred_location: string | null;
        duration_days: number;
        status: string;
        view_count: number;
        quote_count: number;
        expires_at: string | null;
        created_at: string;
        category_name: string | null;
        industry_name: string | null;
        buyer_name: string;
        buyer_company: string | null;
        buyer_city: string | null;
        buyer_state: string | null;
        has_quoted: boolean;
      }>;
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>
  > {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.status) queryParams.append("status", params.status);
    if (params?.categoryId) queryParams.append("categoryId", params.categoryId);
    if (params?.industryId) queryParams.append("industryId", params.industryId);
    if (params?.search) queryParams.append("search", params.search);

    const url = `/supplier/rfqs${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    return apiRequest("get", url);
  },

  /**
   * Get RFQ details by ID
   */
  async getRFQById(id: string): Promise<
    ApiResponse<{
      rfq: {
        id: string;
        rfq_number: string;
        title: string;
        quantity: number;
        unit: string;
        budget_min: number | null;
        budget_max: number | null;
        required_by_date: string | null;
        detailed_requirements: string;
        preferred_location: string | null;
        duration_days: number;
        status: string;
        attachments: any[];
        view_count: number;
        quote_count: number;
        expires_at: string | null;
        created_at: string;
        category_name: string | null;
        industry_name: string | null;
        buyer_name: string;
        buyer_company: string | null;
        buyer_email: string | null;
        buyer_phone: string | null;
        buyer_city: string | null;
        buyer_state: string | null;
        has_quoted: boolean;
        my_quote: {
          id: string;
          quote_number: string;
          quote_price: number;
          status: string;
          created_at: string;
        } | null;
      };
    }>
  > {
    return apiRequest("get", `/supplier/rfqs/${id}`);
  },

  /**
   * Submit a quote for an RFQ
   */
  async submitQuote(
    rfqId: string,
    quoteData: {
      quotePrice: number;
      deliveryDays: number;
      validUntil: string;
      notes?: string;
    },
  ): Promise<
    ApiResponse<{
      quote: {
        id: string;
        quote_number: string;
        quote_price: number;
        delivery_days: number;
        valid_until: string;
        notes: string | null;
        status: string;
        created_at: string;
      };
    }>
  > {
    return apiRequest("post", `/supplier/rfqs/${rfqId}/quotes`, quoteData);
  },

  /**
   * Get all quotes submitted by the supplier
   */
  async getQuotes(): Promise<
    ApiResponse<{
      quotes: Array<{
        id: string;
        quote_number: string;
        rfq_number: string;
        buyer_company_name: string;
        product_title: string;
        quote_price: number;
        status: string;
        created_at: string;
        valid_until: string;
      }>;
      count: number;
    }>
  > {
    return apiRequest("get", "/supplier/quotes");
  },
};
