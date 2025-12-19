"use client"
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const Contact = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('+1')
  const [helpDetails, setHelpDetails] = useState('')
  const [loading, setLoading] = useState(false)

  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [helpError, setHelpError] = useState('')

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setName(value)
    setNameError(value ? '' : 'Full name is required')
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)

    if (!value) {
      setEmailError('Email is required')
    } else if (!validateEmail(value)) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || /^\d+$/.test(value)) {
      setPhone(value)
      setPhoneError(value ? '' : 'Phone number is required')
    }
  }

  const handleHelpChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setHelpDetails(value)
    setHelpError(value ? '' : 'This field is required')
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let hasError = false

    if (!name) {
      setNameError('Full name is required')
      hasError = true
    }

    if (!email) {
      setEmailError('Email is required')
      hasError = true
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address')
      hasError = true
    }

    if (!phone) {
      setPhoneError('Phone number is required')
      hasError = true
    }

    if (!helpDetails) {
      setHelpError('This field is required')
      hasError = true
    }

    if (hasError) {
      toast.error("Please fill out all required fields!")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/trip-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: name,
          email,
          country_code: countryCode,
          phone,
          trip_details: helpDetails,
        }),
      })

      if (!res.ok) throw new Error("Failed to submit inquiry")

      toast.success("Thank you! We’ve received your message.")

      setName('')
      setEmail('')
      setPhone('')
      setHelpDetails('')
      setNameError('')
      setEmailError('')
      setPhoneError('')
      setHelpError('')
    } catch {
      toast.error("Something went wrong. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='relative w-full flex justify-center items-center'>
      <Toaster position="top-center" reverseOrder={false} />
      <form className='max-w-[800px] w-full flex flex-col gap-y-[19px]' onSubmit={handleFormSubmit}>

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

        <div className='w-full'>
          <textarea
            placeholder='How can we help?*'
            className={`w-full text-[18px] font-normal outline-none border rounded p-3 placeholder:text-[#727272] placeholder:text-[16px] font-host-grotesk resize-vertical min-h-[100px] ${helpError ? 'border-red-500' : 'border-[#98B6E2]'}`}
            value={helpDetails}
            onChange={handleHelpChange}
            rows={4}
          />
          {helpError && <p className='text-red-500 text-sm mt-1 ml-1'>{helpError}</p>}
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
  )
}

export default Contact
