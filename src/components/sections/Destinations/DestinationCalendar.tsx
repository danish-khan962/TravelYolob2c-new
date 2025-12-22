'use client'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './customCalendar.css'

export default function DestinationCalendar({
    onDataChange,
    resetTrigger,
    travelersError, // New prop
    datesError      // New prop
}: {
    onDataChange?: (data: any) => void;
    resetTrigger?: boolean;
    travelersError?: boolean;
    datesError?: boolean;
}) {
    const [dateRange, setDateRange] = useState([
        {
            startDate: null as Date | null,
            endDate: null as Date | null,
            key: 'selection',
        },
    ])

    const [budget, setBudget] = useState([3000, 75000])
    const [travelers, setTravelers] = useState('')
    const [destination, setDestination] = useState('')
    const [datesTouched, setDatesTouched] = useState(false)

    const now = new Date()
    const minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const maxMonth = now.getMonth() + 6
    const maxDate = new Date(now.getFullYear(), maxMonth + 1, 0)

    // Handle Reset
    useEffect(() => {
        setTravelers('')
        setBudget([3000, 75000])
        setDatesTouched(false)
        setDateRange([{
            startDate: null as Date | null,
            endDate: null as Date | null,
            key: 'selection'
        }])
    }, [resetTrigger])

    useEffect(() => {
        if (!onDataChange) return;

        const start_date = datesTouched && dateRange[0].startDate
            ? dateRange[0].startDate.toLocaleDateString('en-CA')
            : null;

        const end_date = datesTouched && dateRange[0].endDate
            ? dateRange[0].endDate.toLocaleDateString('en-CA')
            : null;

        const number_of_travellers = travelers ? parseInt(travelers) : null;
        const budget_min = budget[0] != null ? Number(budget[0]) : null;
        const budget_max = budget[1] != null ? Number(budget[1]) : null;

        onDataChange({
            destination,
            traveler_count: number_of_travellers,
            budget_min,
            budget_max,
            start_date,
            end_date,
            number_of_travellers,
            travel_budget: budget_min,
        });
    }, [destination, travelers, budget, dateRange, datesTouched, onDataChange]);

    return (
        <div className='flex flex-col md:flex-row gap-y-8 gap-x-10 bg-[#FAFAFA] px-4 md:px-6 lg:px-8 py-[60px] md:py-8 rounded-xl font-host-grotesk max-w-[866px] w-full'>
            <div className='max-w-[700px] w-full space-y-6'>
                <div>
                    <label className='block mb-2 font-normal text-[20px] ml-2'>Number of travellers</label>
                    <div className='relative'>
                        <input
                            type="number"
                            min={1}
                            className={`w-full bg-white rounded-md p-4 text-[#989898] text-[14px] lg:text-[18px] border focus:outline-none ${travelersError ? 'border-red-500' : 'border-[#98B6E2]'}`}
                            value={travelers}
                            onChange={e => {
                                const val = e.target.value
                                if (val === '' || (/^\d+$/.test(val) && Number(val) >= 1)) {
                                    setTravelers(val)
                                }
                            }}
                            placeholder="Enter number of travelers"
                        />
                    </div>
                </div>

                <div>
                    <label className='block mb-2 font-normal text-[20px] mt-0 md:mt-8 ml-2'>What’s your travel budget?</label>
                    <div className='flex items-center justify-between text-sm font-semibold mt-2 mb-1'>
                        <span>${budget[0]}</span>
                        <span>${budget[1]}</span>
                    </div>
                    <input
                        type='range'
                        min='3000'
                        max='75000'
                        value={budget[0]}
                        onChange={(e) => setBudget([parseInt(e.target.value), budget[1]])}
                        className='w-full custom-slider'
                        style={{
                            '--progress': `${((budget[0] - 3000) / (75000 - 3000)) * 100}%`,
                        } as React.CSSProperties}
                    />
                </div>
            </div>

            <div className='flex-1'>
                <p className='block mb-2 font-normal text-[20px] text-start sm:text-center'>When would you like to travel?</p>
                <div className={`calendar-wrapper rounded-lg border ${datesError ? 'border-red-500' : 'border-transparent'}`}>
                    <DateRange
                        editableDateInputs={true}
                        onChange={(item: any) => {
                            setDateRange([item.selection])
                            setDatesTouched(true)
                        }}
                        moveRangeOnFirstSelection={false}
                        ranges={[
                            {
                                startDate: dateRange[0].startDate || new Date(),
                                endDate: dateRange[0].endDate || new Date(),
                                key: 'selection',
                            },
                        ]}
                        rangeColors={['#824040']}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                </div>
            </div>
        </div>
    )
}