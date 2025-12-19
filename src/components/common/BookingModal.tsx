'use client';

import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

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
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [tripDetails, setTripDetails] = useState('');
  const [tripDetailsError, setTripDetailsError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!value) {
      setEmailError('Email is required');
    } else if (!validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setPhone(value);
      setPhoneError(value ? '' : 'Phone number is required');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (!name.trim()) {
      setNameError('Full name is required');
      hasError = true;
    } else {
      setNameError('');
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    }

    if (!phone.trim()) {
      setPhoneError('Phone number is required');
      hasError = true;
    }

    if (!tripDetails.trim()) {
      setTripDetailsError('This field is required');
      hasError = true;
    } else {
      setTripDetailsError('');
    }

    if (hasError) {
      toast.error('Please fill in all required fields!');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      full_name: name,
      email,
      country_code: countryCode,
      phone,
      trip_details: `Package: ${packageTitle || 'N/A'}\nPackage ID: ${packageId || 'N/A'}\n\n${tripDetails}`,
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
      setNameError('');
      setEmailError('');
      setPhoneError('');
      setTripDetailsError('');

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
      <Toaster position="top-center" reverseOrder={false} />
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
            <div>
              <input
                type="text"
                placeholder="Full name*"
                className={`w-full text-[16px] sm:text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] font-host-grotesk ${
                  nameError ? 'border-red-500' : 'border-[#98B6E2]'
                }`}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError(e.target.value ? '' : 'Full name is required');
                }}
              />
              {nameError && <p className="text-red-500 text-sm mt-1 ml-1">{nameError}</p>}
            </div>

            <div className="w-full">
              <input
                type="email"
                placeholder="Email*"
                className={`w-full text-[16px] sm:text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] font-host-grotesk ${
                  emailError ? 'border-red-500' : 'border-[#98B6E2]'
                }`}
                value={email}
                onChange={handleEmailChange}
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
                  <option value='+1'>🇺🇸 +1</option>
                  <option value='+44'>🇬🇧 +44</option>
                  <option value='+91'>🇮🇳 +91</option>
                  <option value='+61'>🇦🇺 +61</option>
                  <option value='+81'>🇯🇵 +81</option>
                  <option value='+86'>🇨🇳 +86</option>
                  <option value='+33'>🇫🇷 +33</option>
                  <option value='+49'>🇩🇪 +49</option>
                  <option value='+39'>🇮🇹 +39</option>
                  <option value='+34'>🇪🇸 +34</option>
                  <option value='+7'>🇷🇺 +7</option>
                  <option value='+55'>🇧🇷 +55</option>
                  <option value='+27'>🇿🇦 +27</option>
                  <option value='+52'>🇲🇽 +52</option>
                  <option value='+82'>🇰🇷 +82</option>
                  <option value='+65'>🇸🇬 +65</option>
                  <option value='+971'>🇦🇪 +971</option>
                  <option value='+966'>🇸🇦 +966</option>
                  <option value='+60'>🇲🇾 +60</option>
                  <option value='+66'>🇹🇭 +66</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-[#727272]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <input
                  type="tel"
                  placeholder="Phone*"
                  className={`w-full text-[16px] sm:text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] font-host-grotesk ${
                    phoneError ? 'border-red-500' : 'border-[#98B6E2]'
                  }`}
                  value={phone}
                  onChange={handlePhoneChange}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
                {phoneError && <p className="text-red-500 text-sm mt-1 ml-1">{phoneError}</p>}
              </div>
            </div>

            <div>
              <textarea
                placeholder="How can we help?*"
                className={`w-full text-[16px] sm:text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] font-host-grotesk resize-vertical min-h-[100px] ${
                  tripDetailsError ? 'border-red-500' : 'border-[#98B6E2]'
                }`}
                value={tripDetails}
                onChange={(e) => {
                  setTripDetails(e.target.value);
                  setTripDetailsError(e.target.value ? '' : 'This field is required');
                }}
                rows={4}
              />
              {tripDetailsError && <p className="text-red-500 text-sm mt-1 ml-1">{tripDetailsError}</p>}
            </div>

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
                {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
