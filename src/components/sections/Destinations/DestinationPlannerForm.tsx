// DestinationPlannerForm.tsx
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
    const [emailError, setEmailError] = useState('');
    const [tripDetails, setTripDetails] = useState('');
    const [plannerData, setPlannerData] = useState<any>({});
    const [resetCalendar, setResetCalendar] = useState(false);


    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);

        if (value && !validateEmail(value)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || /^\d+$/.test(value)) {
            setPhone(value);
        }
    };

    useEffect(() => {
        setPlannerData((prev: any) => ({
            ...prev,
            region_id: regionId || prev.region_id || null,
            season_id: seasonId || prev.season_id || null,
        }));
    }, [regionId, seasonId]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !phone || !tripDetails) {
            toast.error("Please fill in all required fields!");
            return;
        }

        if (emailError) {
            toast.error("Please enter a valid email address!");
            return;
        }

        const payload = {
            region_id: regionId || plannerData.region_id || null,
            season_id: seasonId || plannerData.season_id || null,
            number_of_travellers: plannerData.number_of_travellers || null,
            travel_budget: plannerData.travel_budget || null,
            start_date: plannerData.start_date || null,
            end_date: plannerData.end_date || null,
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

            const data = await res.json();
            toast.success("Your package request has been submitted!");

            setName('');
            setEmail('');
            setPhone('');
            setTripDetails('');
            setPlannerData({});
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
                <DestinationCalendar onDataChange={setPlannerData} resetTrigger={resetCalendar} />
            </div>

            <div className='w-full flex justify-center items-center mt-[45px] px-4'>
                <form className='max-w-[800px] w-full flex flex-col gap-y-[19px]' onSubmit={handleFormSubmit}>
                    <input
                        type='text'
                        placeholder='Full name*'
                        className='w-full text-[18px] font-normal outline-none border border-[#98B6E2] rounded p-3 placeholder:text-[#727272] placeholder:text-[16px] font-host-grotesk'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className='w-full'>
                        <input
                            type='email'
                            placeholder='Email*'
                            className={`w-full text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] placeholder:text-[16px] font-host-grotesk ${emailError ? 'border-red-500' : 'border-[#98B6E2]'
                                }`}
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {emailError && (
                            <p className='text-red-500 text-sm mt-1 ml-1'>{emailError}</p>
                        )}
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
                        <input
                            type='tel'
                            placeholder='Phone*'
                            className='flex-1 text-[18px] font-normal outline-none border border-[#98B6E2] rounded p-3 placeholder:text-[#727272] placeholder:text-[16px] font-host-grotesk'
                            value={phone}
                            onChange={handlePhoneChange}
                            inputMode='numeric'
                            pattern='[0-9]*'
                        />
                    </div>
                    <textarea
                        placeholder='Tell us more about your trip*'
                        className='w-full text-[18px] font-normal outline-none border border-[#98B6E2] rounded p-3 placeholder:text-[#727272] placeholder:text-[16px] font-host-grotesk resize-vertical min-h-[100px]'
                        value={tripDetails}
                        onChange={(e) => setTripDetails(e.target.value)}
                        rows={4}
                    />

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
