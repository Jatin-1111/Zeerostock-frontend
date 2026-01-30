/**
 * Admin Service - API integration for admin operations
 * Includes RFQ management for market demand analysis
 */

import apiClient from "@/lib/api-client";

export interface RFQStats {
  byIndustry: Array<{
    industryId: string;
    categoryId: string;
    totalRFQs: number;
    avgQuantity: number;
    totalQuantity: number;
    industry: {
      id: string;
      name: string;
    };
    category: {
      id: string;
      name: string;
    };
  }>;
  overall: {
    total: number;
    active: number;
    closed: number;
    expired: number;
  };
}

export interface RFQ {
  id: string;
  rfqNumber: string;
  buyerId: string;
  title: string;
  description: string;
  categoryId: string;
  industryId: string;
  quantity: number;
  unit: string;
  budgetMin?: number;
  budgetMax?: number;
  deliveryLocation: string;
  deliveryDate: string;
  status: "active" | "closed" | "expired" | "fulfilled";
  createdAt: string;
  updatedAt: string;
  buyer: {
    id: string;
    firstName: string;
    lastName: string;
    businessEmail: string;
    companyName: string;
  };
  industry: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
}

export interface RFQListResponse {
  rfqs: RFQ[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const adminService = {
  /**
   * Get RFQ statistics for market demand analysis
   */
  async getRFQStats(): Promise<{ success: boolean; data: RFQStats }> {
    const response = await apiClient.get("/admin/rfqs/stats");
    return response.data;
  },

  /**
   * Get all RFQs with filters
   */
  async getRFQs(params?: {
    page?: number;
    limit?: number;
    status?: string;
    industryId?: string;
    categoryId?: string;
    sortBy?: string;
    sortOrder?: string;
  }): Promise<{ success: boolean; data: RFQListResponse }> {
    const response = await apiClient.get("/admin/rfqs", { params });
    return response.data;
  },

  /**
   * Get RFQ details by ID
   */
  async getRFQById(id: string): Promise<{ success: boolean; data: RFQ }> {
    const response = await apiClient.get(`/admin/rfqs/${id}`);
    return response.data;
  },
};

export default adminService;
