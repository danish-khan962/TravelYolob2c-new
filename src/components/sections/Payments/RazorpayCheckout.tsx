'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createPaymentOrder, verifyPayment } from '@/lib/apiClient';
import toast from 'react-hot-toast';

type Props = {
  packageId: string;
  startDate: string;
  endDate: string;
  travelerCount: number;
  contactEmail: string;
  contactPhone: string;
  packageTitle?: string;
  onSuccess?: (bookingData: any) => void;
};

const loadRazorpayScript = (): Promise<boolean> =>
  new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if ((window as any).Razorpay) return resolve(true);

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export default function RazorpayCheckout({
  packageId,
  startDate,
  endDate,
  travelerCount,
  contactEmail,
  contactPhone,
  packageTitle = 'Travel Package',
  onSuccess,
}: Props) {
  const router = useRouter();
  const { user, getToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const onPay = async () => {
    if (!user) {
      toast.error('Please sign in to make a booking');
      router.push('/login'); // You'll need to create this page
      return;
    }

    setLoading(true);

    try {
      // Get Firebase ID token
      const token = await getToken();
      if (!token) {
        throw new Error('Authentication failed. Please sign in again.');
      }

      // Create order on backend
      const orderData = await createPaymentOrder(token, {
        package_id: packageId,
        start_date: startDate,
        end_date: endDate,
        traveler_count: travelerCount,
        contact_email: contactEmail,
        contact_phone: contactPhone,
      });

      console.log('Order created:', orderData);

      // Load Razorpay script
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        throw new Error('Failed to load Razorpay SDK');
      }

      const baseUrl = window.location.origin;

      const options = {
        key: orderData.razorpay_key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Travel Yolo',
        description: packageTitle,
        order_id: orderData.order_id,
        redirect: false,

        handler: async (response: any) => {
          try {
            // Verify payment on backend
            const verifyData = await verifyPayment(token, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            console.log('Payment verified:', verifyData);

            if (verifyData.success) {
              toast.success('Payment successful!');

              // Call success callback if provided
              if (onSuccess) {
                onSuccess(verifyData.booking);
              }

              // Redirect to success page
              setTimeout(() => {
                window.location.href = `${baseUrl}/payments/result?status=success&booking_number=${verifyData.booking.booking_number}&payment_id=${response.razorpay_payment_id}`;
              }, 500);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (err: any) {
            console.error('Error verifying payment:', err);
            toast.error(err.message || 'Payment verification failed');
            window.location.href = `${baseUrl}/payments/result?status=failure&reason=verification_failed`;
          }
        },

        prefill: {
          email: contactEmail,
          contact: contactPhone,
        },
        theme: { color: '#F37254' },

        modal: {
          ondismiss: function () {
            console.log('User closed payment');
            toast.error('Payment cancelled');
            setLoading(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);

      rzp.on('payment.failed', (response: any) => {
        console.error('Payment failed:', response.error);
        toast.error('Payment failed: ' + (response.error.description || 'Unknown error'));
        window.location.href = `${baseUrl}/payments/result?status=failure&reason=${response.error.reason || 'payment_failed'}`;
      });

      rzp.open();
      setLoading(false);
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Failed to initiate payment');
      setLoading(false);
    }
  };

  return (
    <button
      onClick={onPay}
      disabled={loading || !user}
      className="px-6 py-3 rounded-full bg-slate-800 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
      {loading ? 'Processing...' : user ? 'Proceed to Payment' : 'Sign in to Book'}
    </button>
  );
}
