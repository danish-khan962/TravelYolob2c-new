'use client';

import React, { useState, useEffect } from 'react';
import DestinationCalendar from './DestinationCalendar';
import toast, { Toaster } from 'react-hot-toast';

interface DestinationPlannerFormProps {
    onSubmitSuccess?: () => void;
    onSubmitError?: () => void;
    regionId?: string | null;
    seasonId?: string | null;
}

const DestinationPlannerForm: React.FC<DestinationPlannerFormProps> = ({ onSubmitSuccess, onSubmitError, regionId = null, seasonId = null }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('+1');
    const [tripDetails, setTripDetails] = useState('');
    const [plannerData, setPlannerData] = useState<any>({});
    const [resetCalendar, setResetCalendar] = useState(false);

    // Error states for individual fields
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [helpError, setHelpError] = useState('');
    const [travelersError, setTravelersError] = useState(false);
    const [datesError, setDatesError] = useState(false);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        setNameError(value ? '' : 'Full name is required');
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

    const handleHelpChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setTripDetails(value);
        setHelpError(value ? '' : 'This field is required');
    };

    // Watch plannerData to clear errors when user interacts with calendar
    useEffect(() => {
        if (plannerData.number_of_travellers) setTravelersError(false);
        if (plannerData.start_date) setDatesError(false);
    }, [plannerData]);

    // Sync plannerData with incoming regionId and seasonId props
    useEffect(() => {
        setPlannerData((prev: any) => ({
            ...prev,
            region_id: regionId || prev.region_id || null,
            season_id: seasonId || prev.season_id || null,
        }));
    }, [regionId, seasonId]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let hasError = false;

        if (!name) {
            setNameError('Full name is required');
            hasError = true;
        }

        if (!email) {
            setEmailError('Email is required');
            hasError = true;
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            hasError = true;
        }

        if (!phone) {
            setPhoneError('Phone number is required');
            hasError = true;
        }

        if (!tripDetails) {
            setHelpError('This field is required');
            hasError = true;
        }

        // Calendar Validation
        if (!plannerData.number_of_travellers) {
            setTravelersError(true);
            hasError = true;
        }
        if (!plannerData.start_date) {
            setDatesError(true);
            hasError = true;
        }

        if (hasError) {
            toast.error("Please fill out all required fields!");
            return;
        }

        // TWEAK: Ensure selected region and season are explicitly merged into payload
        const payload = {
            ...plannerData,
            region_id: regionId || plannerData.region_id || null,
            season_id: seasonId || plannerData.season_id || null,
            full_name: name,
            email,
            country_code: countryCode,
            phone,
            trip_plan: tripDetails,
        };

        try {
            const res = await fetch('/api/package-requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Failed: ${res.status} ${text}`);
            }

            toast.success("Your package request has been submitted!");

            // Clear states
            setName('');
            setEmail('');
            setPhone('');
            setTripDetails('');
            setPlannerData({});
            setNameError('');
            setEmailError('');
            setPhoneError('');
            setHelpError('');
            setTravelersError(false);
            setDatesError(false);
            setResetCalendar(prev => !prev);

            if (onSubmitSuccess) {
                onSubmitSuccess();
            }
        } catch (err) {
            toast.error('Error submitting trip inquiry!');
            if (onSubmitError) onSubmitError();
        }
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className='flex justify-center items-center'>
                <DestinationCalendar 
                    onDataChange={setPlannerData} 
                    resetTrigger={resetCalendar}
                    travelersError={travelersError}
                    datesError={datesError}
                />
            </div>

            <div className='w-full flex justify-center items-center mt-[45px] px-4'>
                <form className='max-w-[800px] w-full flex flex-col gap-y-[19px]' onSubmit={handleFormSubmit}>
                    
                    {/* Full Name */}
                    <div className='w-full'>
                        <input
                            type='text'
                            placeholder='Full name*'
                            className={`w-full text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] placeholder:text-[16px] font-host-grotesk ${nameError ? 'border-red-500' : 'border-[#98B6E2]'}`}
                            value={name}
                            onChange={handleNameChange}
                        />
                        {nameError && <p className='text-red-500 text-sm mt-1 ml-1'>{nameError}</p>}
                    </div>

                    {/* Email */}
                    <div className='w-full'>
                        <input
                            type='email'
                            placeholder='Email*'
                            className={`w-full text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] placeholder:text-[16px] font-host-grotesk ${emailError ? 'border-red-500' : 'border-[#98B6E2]'}`}
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {emailError && <p className='text-red-500 text-sm mt-1 ml-1'>{emailError}</p>}
                    </div>

                    {/* Country Code & Phone */}
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
                        </div>

                        <div className='flex-1'>
                            <input
                                type='tel'
                                placeholder='Phone*'
                                className={`w-full text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] placeholder:text-[16px] font-host-grotesk ${phoneError ? 'border-red-500' : 'border-[#98B6E2]'}`}
                                value={phone}
                                onChange={handlePhoneChange}
                                inputMode='numeric'
                                pattern='[0-9]*'
                            />
                            {phoneError && <p className='text-red-500 text-sm mt-1 ml-1'>{phoneError}</p>}
                        </div>
                    </div>

                    {/* Trip Details */}
                    <div className='w-full'>
                        <textarea
                            placeholder='Tell us more about your trip*'
                            className={`w-full text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] placeholder:text-[16px] font-host-grotesk resize-vertical min-h-[100px] ${helpError ? 'border-red-500' : 'border-[#98B6E2]'}`}
                            value={tripDetails}
                            onChange={handleHelpChange}
                            rows={4}
                        />
                        {helpError && <p className='text-red-500 text-sm mt-1 ml-1'>{helpError}</p>}
                    </div>

                    <div className='w-full flex justify-center items-center'>
                        <button
                            type='submit'
                            className='w-full sm:w-[241px] h-[55px] bg-[#312E29] text-white hover:scale-105 cursor-pointer transition-all ease-in-out duration-200 mt-[46px] sm:mt-[57px] rounded-full'
                        >
                            Talk to an Expert
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default DestinationPlannerForm;