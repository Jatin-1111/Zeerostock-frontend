/**
 * RFQ Service - API integration for Request for Quote operations
 * Zeerostock B2B Marketplace
 */

import { apiRequest } from "@/lib/api-client";
import type {
  ApiResponse,
  PaginatedResponse,
  RFQ,
  CreateRFQRequest,
  UpdateRFQRequest,
  RFQFilters,
  RFQStats,
  Category,
  Industry,
} from "@/types/buyer.types";

// =====================================================
// RFQ OPERATIONS
// =====================================================

/**
 * Create a new RFQ
 */
export const createRFQ = async (
  data: CreateRFQRequest
): Promise<ApiResponse<RFQ>> => {
  return apiRequest<RFQ>("post", "/rfq", data);
};

/**
 * Get all RFQs for the logged-in buyer
 */
export const getMyRFQs = async (
  filters?: RFQFilters
): Promise<ApiResponse<PaginatedResponse<RFQ>>> => {
  return apiRequest<PaginatedResponse<RFQ>>("get", "/rfq", undefined, {
    params: filters,
  });
};

/**
 * Get a specific RFQ by ID
 */
export const getRFQById = async (id: string): Promise<ApiResponse<RFQ>> => {
  return apiRequest<RFQ>("get", `/rfq/${id}`);
};

/**
 * Update an existing RFQ
 */
export const updateRFQ = async (
  id: string,
  data: UpdateRFQRequest
): Promise<ApiResponse<RFQ>> => {
  return apiRequest<RFQ>("put", `/rfq/${id}`, data);
};

/**
 * Close an RFQ
 */
export const closeRFQ = async (id: string): Promise<ApiResponse<RFQ>> => {
  return apiRequest<RFQ>("put", `/rfq/${id}/close`);
};

/**
 * Delete an RFQ (soft delete by closing)
 */
export const deleteRFQ = async (id: string): Promise<ApiResponse<void>> => {
  return apiRequest<void>("delete", `/rfq/${id}`);
};

/**
 * Get RFQ statistics for dashboard
 */
export const getRFQStats = async (): Promise<ApiResponse<RFQStats>> => {
  return apiRequest<RFQStats>("get", "/rfq/stats");
};

/**
 * Get all active categories for RFQ form
 */
export const getCategories = async (): Promise<
  ApiResponse<{ categories: Category[]; count: number }>
> => {
  return apiRequest<{ categories: Category[]; count: number }>(
    "get",
    "/rfq/categories"
  );
};

/**
 * Get all active industries for RFQ form
 */
export const getIndustries = async (): Promise<
  ApiResponse<{ industries: Industry[]; count: number }>
> => {
  return apiRequest<{ industries: Industry[]; count: number }>(
    "get",
    "/rfq/industries"
  );
};

// =====================================================
// EXPORT ALL FUNCTIONS
// =====================================================

const rfqService = {
  createRFQ,
  getMyRFQs,
  getRFQById,
  updateRFQ,
  closeRFQ,
  deleteRFQ,
  getRFQStats,
  getCategories,
  getIndustries,
};

export default rfqService;
