// Centralized API configuration
export const API_CONFIG = {
  BACKEND_BASE_URL: 'https://core.travelyolo.id8nxt.com/api/',
} as const;

// Helper function to build API URLs
export const buildApiUrl = (endpoint: string): string => {
  const baseUrl = API_CONFIG.BACKEND_BASE_URL;
  // Remove leading slash from endpoint if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${baseUrl}${cleanEndpoint}`;
};
