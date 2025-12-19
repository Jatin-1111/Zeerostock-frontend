/**
 * Quote Service - API integration for Quote operations
 * Zeerostock B2B Marketplace
 */

import { apiRequest } from "@/lib/api-client";
import type {
  ApiResponse,
  PaginatedResponse,
  Quote,
  QuoteFilters,
  QuoteStats,
  AcceptQuoteRequest,
  RejectQuoteRequest,
  SendMessageRequest,
  QuoteMessage,
} from "@/types/buyer.types";

// =====================================================
// QUOTE OPERATIONS
// =====================================================

/**
 * Get all quotes for the logged-in buyer
 */
export const getMyQuotes = async (
  filters?: QuoteFilters
): Promise<ApiResponse<PaginatedResponse<Quote>>> => {
  return apiRequest<PaginatedResponse<Quote>>("get", "/quotes", undefined, {
    params: filters,
  });
};

/**
 * Get a specific quote by ID
 */
export const getQuoteById = async (id: string): Promise<ApiResponse<Quote>> => {
  return apiRequest<Quote>("get", `/quotes/${id}`);
};

/**
 * Accept a quote
 */
export const acceptQuote = async (
  id: string,
  data: AcceptQuoteRequest
): Promise<ApiResponse<{ quote: Quote; order?: unknown }>> => {
  return apiRequest<{ quote: Quote; order?: unknown }>(
    "put",
    `/quotes/${id}/accept`,
    data
  );
};

/**
 * Reject a quote
 */
export const rejectQuote = async (
  id: string,
  data: RejectQuoteRequest
): Promise<ApiResponse<Quote>> => {
  return apiRequest<Quote>("put", `/quotes/${id}/reject`, data);
};

/**
 * Get all messages for a quote
 */
export const getQuoteMessages = async (
  id: string
): Promise<ApiResponse<QuoteMessage[]>> => {
  return apiRequest<QuoteMessage[]>("get", `/quotes/${id}/messages`);
};

/**
 * Send a message about a quote
 */
export const sendMessage = async (
  id: string,
  data: SendMessageRequest
): Promise<ApiResponse<QuoteMessage>> => {
  return apiRequest<QuoteMessage>("post", `/quotes/${id}/messages`, data);
};

/**
 * Mark all messages as read for a quote
 */
export const markMessagesAsRead = async (
  id: string
): Promise<ApiResponse<{ message: string }>> => {
  return apiRequest<{ message: string }>("put", `/quotes/${id}/messages/read`);
};

/**
 * Get quote statistics for dashboard
 */
export const getQuoteStats = async (): Promise<ApiResponse<QuoteStats>> => {
  return apiRequest<QuoteStats>("get", "/quotes/stats");
};

// =====================================================
// EXPORT ALL FUNCTIONS
// =====================================================

const quoteService = {
  getMyQuotes,
  getQuoteById,
  acceptQuote,
  rejectQuote,
  getQuoteMessages,
  sendMessage,
  markMessagesAsRead,
  getQuoteStats,
};

export default quoteService;
