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

    // Error states
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
        if (value) setNameError('');
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        if (value && validateEmail(value)) setEmailError('');
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || /^\d+$/.test(value)) {
            setPhone(value);
            if (value) setPhoneError('');
        }
    };

    const handleHelpChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setTripDetails(value);
        if (value) setHelpError('');
    };

    // Watch plannerData to clear errors when user interacts with calendar
    useEffect(() => {
        if (plannerData.number_of_travellers) setTravelersError(false);
        if (plannerData.start_date) setDatesError(false);
    }, [plannerData]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let hasError = false;

        if (!name) { setNameError('Full name is required'); hasError = true; }
        if (!email) { setEmailError('Email is required'); hasError = true; }
        else if (!validateEmail(email)) { setEmailError('Valid email required'); hasError = true; }
        if (!phone) { setPhoneError('Phone required'); hasError = true; }
        if (!tripDetails) { setHelpError('Required'); hasError = true; }
        
        // Calendar Validation
        if (!plannerData.number_of_travellers) { setTravelersError(true); hasError = true; }
        if (!plannerData.start_date) { setDatesError(true); hasError = true; }

        if (hasError) {
            toast.error("Please fill out all required fields!");
            return;
        }

        const payload = {
            ...plannerData,
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

            if (!res.ok) throw new Error("Submission failed");

            toast.success("Your package request has been submitted!");
            setName(''); setEmail(''); setPhone(''); setTripDetails('');
            setPlannerData({});
            setResetCalendar(prev => !prev);
            if (onSubmitSuccess) onSubmitSuccess();
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
                    <div className='w-full'>
                        <input
                            type='text'
                            placeholder='Full name*'
                            className={`w-full text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] placeholder:text-[16px] font-host-grotesk ${nameError ? 'border-red-500' : 'border-[#98B6E2]'}`}
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>

                    <div className='w-full'>
                        <input
                            type='email'
                            placeholder='Email*'
                            className={`w-full text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] placeholder:text-[16px] font-host-grotesk ${emailError ? 'border-red-500' : 'border-[#98B6E2]'}`}
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>

                    <div className='w-full'>
                        <div className='flex gap-2'>
                            <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className='w-[110px] text-[18px] font-normal outline-none border border-[#98B6E2] rounded p-3 font-host-grotesk bg-white'
                            >
                                <option value='+1'>🇺🇸 +1</option>
                                <option value='+91'>🇮🇳 +91</option>
                                {/* ... other options */}
                            </select>
                            <input
                                type='tel'
                                placeholder='Phone*'
                                className={`flex-1 text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] placeholder:text-[16px] font-host-grotesk ${phoneError ? 'border-red-500' : 'border-[#98B6E2]'}`}
                                value={phone}
                                onChange={handlePhoneChange}
                            />
                        </div>
                    </div>

                    <div className='w-full'>
                        <textarea
                            placeholder='Tell us more about your trip*'
                            className={`w-full text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] placeholder:text-[16px] font-host-grotesk resize-vertical min-h-[100px] ${helpError ? 'border-red-500' : 'border-[#98B6E2]'}`}
                            value={tripDetails}
                            onChange={handleHelpChange}
                            rows={4}
                        />
                    </div>

                    <div className='w-full flex justify-center items-center'>
                        <button type='submit' className='w-full sm:w-[241px] h-[55px] bg-[#312E29] text-white hover:scale-105 cursor-pointer transition-all ease-in-out duration-200 mt-[46px] sm:mt-[57px] rounded-full'>
                            Talk to an Expert
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default DestinationPlannerForm;