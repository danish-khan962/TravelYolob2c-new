'use client';

import React, { useState } from 'react';
import CalendarSection from './CalendarSection';
import toast from 'react-hot-toast';

interface TripPlannerFormProps {
  onSubmitSuccess?: () => void;
  onSubmitError?: () => void;
}

const TripPlannerForm: React.FC<TripPlannerFormProps> = ({ onSubmitSuccess, onSubmitError }) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [tripDetails, setTripDetails] = useState('');
  const [tripDetailsError, setTripDetailsError] = useState('');
  const [plannerData, setPlannerData] = useState<any>({});
  const [destinationError, setDestinationError] = useState('');
  const [travelersError, setTravelersError] = useState('');
  const [datesError, setDatesError] = useState('');

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

    if (!name) {
      setNameError('Full name is required');
      hasError = true;
    } else {
      setNameError('');
    }

    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    }

    if (!phone) {
      setPhoneError('Phone number is required');
      hasError = true;
    }

    if (!tripDetails) {
      setTripDetailsError('Trip details are required');
      hasError = true;
    } else {
      setTripDetailsError('');
    }
    if (!plannerData.destination) {
      setDestinationError('Please select a destination');
      hasError = true;
    } else { setDestinationError(''); }

    if (!plannerData.traveler_count) {
      setTravelersError('Number of travelers is required');
      hasError = true;
    } else { setTravelersError(''); }

    if (!plannerData.start_date) {
      setDatesError('Please select your travel dates');
      hasError = true;
    } else { setDatesError(''); }

    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    }
    if (hasError) {
      toast.error('Please fill in all required fields!');
      return;
    }

    const payload = {
      full_name: name,
      email,
      country_code: countryCode,
      phone,
      trip_details: tripDetails,
      ...plannerData,
    };

    try {
      const res = await fetch('/api/trip-inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed: ${res.status} ${text}`);
      }

      const data = await res.json();
      console.log('Trip inquiry submitted:', data);

      setName('');
      setEmail('');
      setPhone('');
      setTripDetails('');
      setNameError('');
      setEmailError('');
      setPhoneError('');
      setTripDetailsError('');

      if (onSubmitSuccess) {
        onSubmitSuccess();
      } else if (onSubmitError) {
        onSubmitError();
      }
    } catch (err) {
      console.error('Submission error:', err);
      toast.error('Error submitting trip inquiry!');
    }
  };

  return (
    <>
      <div className='flex justify-center items-center'>
        <CalendarSection
          onDataChange={setPlannerData}
          destinationError={destinationError}
          travelersError={travelersError}
          datesError={datesError}
        />
      </div>

      <div className='w-full flex justify-center items-center mt-[45px] px-4'>
        <form className='max-w-[800px] w-full flex flex-col gap-y-[19px]'>
          <div>
            <input
              type='text'
              placeholder='Full name*'
              className={`w-full text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] placeholder:text-[16px] font-host-grotesk ${nameError ? 'border-red-500' : 'border-[#98B6E2]'
                }`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError(e.target.value ? '' : 'Full name is required');
              }}
            />
            {nameError && <p className='text-red-500 text-sm mt-1 ml-1'>{nameError}</p>}
          </div>

          <div className='w-full'>
            <input
              type='email'
              placeholder='Email*'
              className={`w-full text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] placeholder:text-[16px] font-host-grotesk ${emailError ? 'border-red-500' : 'border-[#98B6E2]'
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

            <div className='flex-1'>
              <input
                type='tel'
                placeholder='Phone*'
                className={`w-full text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] placeholder:text-[16px] font-host-grotesk ${phoneError ? 'border-red-500' : 'border-[#98B6E2]'
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
              placeholder='Tell us more about your trip*'
              className={`w-full text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] placeholder:text-[16px] font-host-grotesk resize-vertical min-h-[100px] ${tripDetailsError ? 'border-red-500' : 'border-[#98B6E2]'
                }`}
              value={tripDetails}
              onChange={(e) => {
                setTripDetails(e.target.value);
                setTripDetailsError(e.target.value ? '' : 'Trip details are required');
              }}
              rows={4}
            />
            {tripDetailsError && <p className='text-red-500 text-sm mt-1 ml-1'>{tripDetailsError}</p>}
          </div>

          <div className='w-full flex justify-center items-center'>
            <button
              type='button'
              className='w-full sm:w-[241px] h-[55px] bg-[#312E29] text-white hover:scale-105 cursor-pointer transition-all ease-in-out duration-200 mt-[46px] sm:mt-[57px] rounded-full'
              onClick={handleFormSubmit}
            >
              Talk to an Expert
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TripPlannerForm;
