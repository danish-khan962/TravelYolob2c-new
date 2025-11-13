'use client';
import React from 'react';
import RazorpayCheckout from '@/components/sections/Payments/RazorpayCheckout';

export default function PaymentsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-semibold mb-6">Test Razorpay Payment</h1>
      <RazorpayCheckout amount={1} />
    </div>
  );
}
