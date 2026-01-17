/**
 * Utility functions for handling routes and redirects
 */

/**
 * Public routes that don't require authentication
 */
const PUBLIC_ROUTES = [
  "/",
  "/home",
  "/about",
  "/contact",
  "/for-buyer",
  "/for-supplier",
  "/helpdesk",
  "/marketplace",
  "/product",
  "/roi",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-otp",
  "/partner-agent",
  "/privacy-policy",
  "/terms-conditions",
  "/help-support",
  "/become-supplier",
];

/**
 * Check if a given path is a public route
 * @param path - The pathname to check
 * @returns true if the route is public, false otherwise
 */
export const isPublicRoute = (path: string): boolean => {
  // Remove trailing slash for consistency
  const normalizedPath =
    path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;

  // Check exact match first
  if (PUBLIC_ROUTES.includes(normalizedPath)) {
    return true;
  }

  // Check if path starts with any public route (for nested routes)
  return PUBLIC_ROUTES.some((route) => {
    if (route === "/") return normalizedPath === "/";
    return normalizedPath.startsWith(route + "/") || normalizedPath === route;
  });
};

/**
 * Get the redirect URL after logout based on the current path
 * @param currentPath - The current pathname
 * @returns The URL to redirect to after logout
 */
export const getLogoutRedirectUrl = (currentPath: string): string => {
  // If current path is public, stay on it
  if (isPublicRoute(currentPath)) {
    return currentPath;
  }

  // Otherwise, redirect to home
  return "/";
};

/**
 * Store the current path before logout
 * This can be used to track where the user was before logging out
 */
export const storePreLogoutPath = (path: string): void => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("preLogoutPath", path);
  }
};

/**
 * Get the stored pre-logout path
 */
export const getPreLogoutPath = (): string | null => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("preLogoutPath");
  }
  return null;
};

/**
 * Clear the stored pre-logout path
 */
export const clearPreLogoutPath = (): void => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("preLogoutPath");
  }
};
