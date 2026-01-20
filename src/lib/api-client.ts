import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { ApiResponse, ApiError } from "@/types/api.types";

// Environment configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";
const API_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000;
const TOKEN_KEY =
  process.env.NEXT_PUBLIC_JWT_TOKEN_KEY || "zeerostock_access_token";
const REFRESH_TOKEN_KEY =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || "zeerostock_refresh_token";

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for cookies if needed
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

// Process queued requests after token refresh
const processQueue = (error: unknown = null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token!);
    }
  });
  failedQueue = [];
};

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Only add token if we're in the browser
    if (typeof window !== "undefined") {
      let token = localStorage.getItem(TOKEN_KEY);
      
      // Check if we are in admin panel or making admin API request
      const isAdminRequest = config.url?.includes("/admin/") && !config.url?.includes("/auth/");
      const isAdminPage = window.location.pathname.startsWith("/admin-panel");
      
      if (isAdminRequest || isAdminPage) {
        const adminToken = localStorage.getItem("admin_token");
        if (adminToken) {
          token = adminToken;
        }
      }

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // If data is FormData, remove Content-Type header to let axios set it with boundary
    if (config.data instanceof FormData && config.headers) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors and token refresh
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // If error response doesn't exist, it might be a network error
    if (!error.response) {
      console.error("❌ Network error:", error.message);
      console.error("Details:", {
        code: error.code,
        url: originalRequest?.url,
        baseURL: API_BASE_URL,
      });

      // Check if it's a connection refused error
      if (error.code === "ECONNREFUSED" || error.code === "ERR_NETWORK") {
        return Promise.reject({
          success: false,
          message: `Cannot connect to server at ${API_BASE_URL}. Please ensure the backend server is running.`,
          errorCode: "NETWORK_ERROR",
        });
      }

      return Promise.reject({
        success: false,
        message: "Network error. Please check your internet connection.",
        errorCode: "NETWORK_ERROR",
      });
    }

    // Handle 401 Unauthorized - Try to refresh token
    // Skip token refresh for auth endpoints (login, signup, etc.)
    const authEndpoints = [
      "/auth/login",
      "/auth/signup",
      "/auth/verify-otp",
      "/auth/otp-login",
      "/auth/verify-login-otp",
      "/auth/refresh-token",
      "/auth/forgot-password",
      "/auth/reset-password",
    ];
    const isAuthEndpoint = authEndpoints.some((endpoint) =>
      originalRequest.url?.includes(endpoint)
    );

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      console.log("🔄 Token expired, attempting refresh...");

      if (isRefreshing) {
        // Queue this request until refresh completes
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Call refresh token endpoint
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          {
            refreshToken,
          }
        );

        const { accessToken } = response.data.data;
        localStorage.setItem(TOKEN_KEY, accessToken);

        // Fetch fresh user data to prevent stale activeRole issues
        try {
          const userResponse = await axios.get(`${API_BASE_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (userResponse.data.success && userResponse.data.data) {
            const USER_DATA_KEY =
              process.env.NEXT_PUBLIC_USER_DATA_KEY || "zeerostock_user";
            localStorage.setItem(
              USER_DATA_KEY,
              JSON.stringify(userResponse.data.data)
            );

            // Dispatch custom event to notify AuthContext about backend data update
            window.dispatchEvent(
              new CustomEvent("userDataRefreshed", {
                detail: userResponse.data.data,
              })
            );
          }
        } catch (userError) {
          console.warn(
            "Failed to refresh user data after token refresh:",
            userError
          );
          // Continue anyway - token refresh succeeded
        }

        // Process queued requests
        processQueue(null, accessToken);
        isRefreshing = false;

        // Retry original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed - Clear tokens and redirect to login
        processQueue(refreshError, null);
        isRefreshing = false;

        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(
          process.env.NEXT_PUBLIC_USER_DATA_KEY || "zeerostock_user"
        );

        // Redirect to login (only in browser)
        if (typeof window !== "undefined") {
          if (window.location.pathname.startsWith("/admin-panel")) {
            window.location.href = "/admin-panel/login?session=expired";
          } else {
            window.location.href = "/login?session=expired";
          }
        }

        return Promise.reject({
          success: false,
          message: "Session expired. Please login again.",
          errorCode: "SESSION_EXPIRED",
        });
      }
    }

    // Handle other errors
    console.error("❌ API Error:", {
      status: error.response?.status,
      url: originalRequest?.url,
      message: error.response?.data?.message,
      errorCode: error.response?.data?.errorCode,
    });

    const errorResponse: ApiError = {
      success: false,
      message:
        error.response.data?.message || error.message || "An error occurred",
      errorCode: error.response.data?.errorCode,
      errors: error.response.data?.errors,
    };

    return Promise.reject(errorResponse);
  }
);

// Helper function to handle API responses
export const handleApiResponse = <T>(response: unknown): ApiResponse<T> => {
  // Type guard to check if response has a data property
  if (response && typeof response === "object" && "data" in response) {
    return (response as { data: ApiResponse<T> }).data;
  }
  throw new Error("Invalid API response format");
};

// Helper function to handle API errors
export const handleApiError = (error: unknown): ApiError => {
  // Type guard to check if error is an API error
  if (
    error &&
    typeof error === "object" &&
    "success" in error &&
    (error as { success: boolean }).success === false
  ) {
    return error as ApiError;
  }
  // Type guard to check if error has a message property
  const errorMessage =
    error && typeof error === "object" && "message" in error
      ? (error as { message: string }).message
      : "An unexpected error occurred";
  const errorCode =
    error && typeof error === "object" && "errorCode" in error
      ? (error as { errorCode: string }).errorCode
      : "UNKNOWN_ERROR";

  return {
    success: false,
    message: errorMessage,
    errorCode: errorCode,
  };
};

// Request wrapper with error handling
export const apiRequest = async <T>(
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    let response;
    switch (method) {
      case "get":
        response = await apiClient.get(url, config);
        break;
      case "post":
        response = await apiClient.post(url, data, config);
        break;
      case "put":
        response = await apiClient.put(url, data, config);
        break;
      case "delete":
        response = await apiClient.delete(url, config);
        break;
      case "patch":
        response = await apiClient.patch(url, data, config);
        break;
    }
    return handleApiResponse<T>(response);
  } catch (error) {
    throw handleApiError(error);
  }
};

export default apiClient;
