/**
 * Admin Service - API integration for admin operations
 * Optimized for lightweight data transfer and quick page loads
 */

import apiClient from "@/lib/api-client";

export interface RFQStats {
  byIndustry: Array<{
    industryId: string;
    categoryId: string;
    totalRFQs: number;
    avgQuantity: number;
    totalQuantity: number;
    industryName: string;
    categoryName: string;
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
  categoryId: string;
  industryId: string;
  quantity: number;
  unit: string;
  status: "active" | "closed" | "expired" | "fulfilled";
  createdAt: string;
  // List view only - minimal data
  industryName?: string;
  categoryName?: string;
  // Detail view only - full data
  description?: string;
  budgetMin?: number;
  budgetMax?: number;
  deliveryLocation?: string;
  deliveryDate?: string;
  updatedAt?: string;
  buyer?: {
    id: string;
    firstName: string;
    lastName: string;
    businessEmail: string;
    companyName: string;
    mobile?: string;
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
   * Lightweight: only aggregated counts and names
   */
  async getRFQStats(): Promise<{ success: boolean; data: RFQStats }> {
    const response = await apiClient.get("/admin/rfqs/stats");
    return response.data;
  },

  /**
   * Get all RFQs with filters - OPTIMIZED for list view
   * Returns minimal data: title, quantity, status, industry/category names only
   * No descriptions, budgets, or buyer details to reduce payload
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
