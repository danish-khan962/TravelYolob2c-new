"use client";

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const EnquiryForm = () => {
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

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

    if (!firstName.trim()) {
      setFirstNameError('First name is required');
      hasError = true;
    } else {
      setFirstNameError('');
    }

    if (!lastName.trim()) {
      setLastNameError('Last name is required');
      hasError = true;
    } else {
      setLastNameError('');
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      hasError = true;
    }

    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    }

    if (!phone.trim()) {
      setPhoneError('Phone number is required');
      hasError = true;
    }

    if (!message.trim()) {
      setMessageError('Message is required');
      hasError = true;
    } else {
      setMessageError('');
    }

    if (hasError) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    const payload = {
      full_name: fullName,
      email,
      country_code: countryCode,
      phone,
      trip_details: message,
    };

    try {
      const res = await fetch("/api/trip-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to submit inquiry: ${errorText}`);
      }

      const data = await res.json();
      console.log("Inquiry submitted successfully:", data);

      toast.success("Your enquiry has been submitted successfully!");

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setFirstNameError("");
      setLastNameError("");
      setEmailError("");
      setPhoneError("");
      setMessageError("");

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    } catch (err) {
      console.error("Error submitting enquiry:", err);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="relative w-full flex justify-center items-center">
      <Toaster position="top-center" reverseOrder={false} />

      {showSuccess && (
        <>
          <div className="absolute inset-0 z-20 flex justify-center items-center bg-[#D9D9D9]/30 backdrop-blur-sm rounded-md transition-all duration-300">
            <p className="fade-in-scale max-w-[650px] w-full leading-snug text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-noto-serif text-center px-4 text-[#6C3B3F] font-semibold italic">
              Hooray! Your travel plans are one step closer to reality.
            </p>
          </div>

          <style>
            {`
              @keyframes fadeInScale {
                0% { opacity: 0; transform: scale(0.95); }
                100% { opacity: 1; transform: scale(1); }
              }
              .fade-in-scale {
                animation: fadeInScale 0.5s ease-out;
              }
            `}
          </style>
        </>
      )}

      <form className='max-w-[800px] w-full flex flex-col gap-y-[19px]' onSubmit={handleFormSubmit}>
        <div className="flex flex-row gap-4">
          <div className="w-full">
            <input
              type='text'
              placeholder='First Name*'
              className={`w-full text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] placeholder:text-[16px] font-host-grotesk ${
                firstNameError ? 'border-red-500' : 'border-[#98B6E2]'
              }`}
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setFirstNameError(e.target.value ? '' : 'First name is required');
              }}
            />
            {firstNameError && <p className='text-red-500 text-sm mt-1 ml-1'>{firstNameError}</p>}
          </div>

          <div className="w-full">
            <input
              type='text'
              placeholder='Last Name*'
              className={`w-full text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] placeholder:text-[16px] font-host-grotesk ${
                lastNameError ? 'border-red-500' : 'border-[#98B6E2]'
              }`}
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setLastNameError(e.target.value ? '' : 'Last name is required');
              }}
            />
            {lastNameError && <p className='text-red-500 text-sm mt-1 ml-1'>{lastNameError}</p>}
          </div>
        </div>

        <div className='w-full'>
          <input
            type='email'
            placeholder='Email*'
            className={`w-full text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] placeholder:text-[16px] font-host-grotesk ${
              emailError ? 'border-red-500' : 'border-[#98B6E2]'
            }`}
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p className='text-red-500 text-sm mt-1 ml-1'>{emailError}</p>}
        </div>

        <div className='w-full flex gap-2'>
          <div className='relative w-[110px]'>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className='w-full text-[18px] font-normal outline-none border border-[#98B6E2] rounded p-3 pl-4 pr-9 font-host-grotesk appearance-none cursor-pointer bg-white'
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
            <div className='absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none'>
              <svg className='w-4 h-4 text-[#727272]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
            </div>
          </div>

          <div className="flex-1">
            <input
              type='tel'
              placeholder='Phone*'
              className={`w-full text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] placeholder:text-[16px] font-host-grotesk ${
                phoneError ? 'border-red-500' : 'border-[#98B6E2]'
              }`}
              value={phone}
              onChange={handlePhoneChange}
              inputMode='numeric'
              pattern='[0-9]*'
            />
            {phoneError && <p className='text-red-500 text-sm mt-1 ml-1'>{phoneError}</p>}
          </div>
        </div>

        <div>
          <textarea
            placeholder='Tell us more about your travel plans*'
            className={`w-full text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] placeholder:text-[16px] font-host-grotesk resize-vertical min-h-[100px] ${
              messageError ? 'border-red-500' : 'border-[#98B6E2]'
            }`}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setMessageError(e.target.value ? '' : 'Message is required');
            }}
            rows={4}
          />
          {messageError && <p className='text-red-500 text-sm mt-1 ml-1'>{messageError}</p>}
        </div>

        <div className="w-full flex justify-center items-center mt-[67px] md:mt-[55px]">
          <button
            type="submit"
            className="bg-[#312E29] w-full md:w-[160px] h-[54px] text-white rounded-full hover:scale-105 transition-all ease-in-out duration-200 cursor-pointer text-[18px] font-host-grotesk"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnquiryForm;
