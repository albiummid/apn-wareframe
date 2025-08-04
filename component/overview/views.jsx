'use client'
import React from 'react'

import { FaArrowTrendUp } from 'react-icons/fa6'

const StatCard = ({ label, amount, percentage }) => {
    return <div className='w-[202px] h-28 bg-[#EDEEFC] rounded-2xl px-6 py-6 ' >
        <h1 className='text-[14px] '>{label}</h1>
        <div className='flex items-center gap-3 '>
            <h4 className='py-2 text-2xl '>{amount}</h4>
            <div className='flex items-center gap-4  '>
                <span className='text-[12px]'>{percentage}%</span>
                <FaArrowTrendUp />
            </div>
        </div>
    </div>
}



const Views = () => {
    const statList = [
        {
            label: "View",
            amount: 5980,
            percentage: '-88.75'
        },
        {
            label: "View",
            amount: 3671,
            percentage: '-0.03     '
        },
        {
            label: "View",
            amount: 156,
            percentage: '-15.03 '
        },
        {
            label: "View",
            amount: 2318,
            percentage: '-6.08'
        },

    ]
    return (
        <>
            <div className=' flex  gap-5 flex-wrap py-5'>

                {statList.map((x, i) => <StatCard key={i} label={x.label} amount={x.amount} percentage={x.percentage} />)}

            </div>



        </>
    )
}

export default Views
