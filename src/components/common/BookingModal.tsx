'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageTitle?: string;
  packageId?: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  packageTitle,
  packageId,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [emailError, setEmailError] = useState('');
  const [tripDetails, setTripDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false); // ✅ New flag

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(value && !validateEmail(value) ? 'Please enter a valid email address' : '');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) setPhone(value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone || !tripDetails) {
      toast.error('Please fill in all required fields!');
      return;
    }

    if (emailError) {
      toast.error('Please enter a valid email address!');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      full_name: name,
      email,
      country_code: countryCode,
      phone,
      trip_details: `Package: ${packageTitle || 'N/A'}\nPackage ID: ${
        packageId || 'N/A'
      }\n\n${tripDetails}`,
    };

    try {
      const res = await fetch('/api/client-interests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        console.error('Backend Error:', data);
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      console.log('Client interest submitted:', data);
      toast.success('Your booking inquiry has been submitted successfully!');
      setSubmissionSuccess(true); // Trigger success
    } catch (err) {
      console.error('Submission error:', err);
      toast.error('Error submitting booking inquiry!');
    } finally {
      setIsSubmitting(false);
    }
  };

  // useEffect handles post-submit actions (reset + close)
  useEffect(() => {
    if (submissionSuccess) {
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setTripDetails('');

      // Close modal after a short delay
      const timer = setTimeout(() => {
        onClose();
        setSubmissionSuccess(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [submissionSuccess, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
      <div className="relative bg-white rounded-2xl max-w-[900px] w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal content */}
        <div className="p-6 sm:p-8">
          <h2 className="text-[28px] sm:text-[36px] font-noto-serif font-light italic text-center mb-2">
            Help us plan your trip
          </h2>
          {packageTitle && (
            <p className="text-center text-gray-600 mb-6 text-[16px] sm:text-[18px]">{packageTitle}</p>
          )}

          {/* Form */}
          <form className="flex flex-col gap-y-4" onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Full name*"
              className="w-full text-[16px] sm:text-[18px] font-normal outline-none border border-[#98B6E2] rounded p-3 placeholder:text-[#727272] font-host-grotesk"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div className="w-full">
              <input
                type="email"
                placeholder="Email*"
                className={`w-full text-[16px] sm:text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] font-host-grotesk ${
                  emailError ? 'border-red-500' : 'border-[#98B6E2]'
                }`}
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && <p className="text-red-500 text-sm mt-1 ml-1">{emailError}</p>}
            </div>

            <div className="w-full flex gap-2">
              <div className="relative w-[110px]">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-full text-[16px] sm:text-[18px] font-normal outline-none border border-[#98B6E2] rounded p-3 pl-4 pr-9 font-host-grotesk appearance-none cursor-pointer bg-white"
                  style={{ textAlign: 'center' }}
                >
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+61">🇦🇺 +61</option>
                  <option value="+971">🇦🇪 +971</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-[#727272]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <input
                type="tel"
                placeholder="Phone*"
                className="flex-1 text-[16px] sm:text-[18px] font-normal outline-none border border-[#98B6E2] rounded p-3 placeholder:text-[#727272] font-host-grotesk"
                value={phone}
                onChange={handlePhoneChange}
                inputMode="numeric"
                pattern="[0-9]*"
                required
              />
            </div>

            <textarea
              placeholder="How can we help?*"
              className="w-full text-[16px] sm:text-[18px] font-normal outline-none border border-[#98B6E2] rounded p-3 placeholder:text-[#727272] font-host-grotesk resize-vertical min-h-[100px]"
              value={tripDetails}
              onChange={(e) => setTripDetails(e.target.value)}
              rows={4}
              required
            />

            <div className="w-full flex justify-center items-center gap-4 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-[180px] h-[50px] border border-[#312E29] text-[#312E29] hover:bg-gray-50 cursor-pointer transition-all ease-in-out duration-200 rounded-full font-host-grotesk"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-[220px] h-[50px] bg-[#312E29] text-white hover:scale-105 cursor-pointer transition-all ease-in-out duration-200 rounded-full font-host-grotesk disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
