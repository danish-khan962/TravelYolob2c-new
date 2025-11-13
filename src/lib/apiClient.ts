import { API_CONFIG } from '@/config/api';

const API_BASE_URL = API_CONFIG.BACKEND_BASE_URL;

interface ApiRequestOptions extends RequestInit {
  token?: string | null;
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers || {}),
  };

  // Add Authorization header if token is provided
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(errorData.error || `API Error: ${response.status}`);
  }

  return response.json();
}

// Payment API functions
export async function createPaymentOrder(
  token: string,
  data: {
    package_id: string;
    start_date: string;
    end_date: string;
    traveler_count: number;
    contact_email: string;
    contact_phone: string;
  }
) {
  return apiRequest<{
    success: boolean;
    order_id: string;
    amount: number;
    currency: string;
    booking_id: string;
    booking_number: string;
    razorpay_key_id: string;
  }>('payments/create-order/', {
    method: 'POST',
    body: JSON.stringify(data),
    token,
  });
}

export async function verifyPayment(
  token: string,
  data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }
) {
  return apiRequest<{
    success: boolean;
    message: string;
    booking: {
      id: string;
      booking_number: string;
      status: string;
      package_title: string;
      total_amount: string;
      currency: string;
      start_date: string;
      end_date: string;
      traveler_count: number;
    };
  }>('payments/verify-payment/', {
    method: 'POST',
    body: JSON.stringify(data),
    token,
  });
}
