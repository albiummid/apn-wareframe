import React, { ReactNode } from 'react'
import { PiBroadcastLight } from "react-icons/pi";
import { GoPerson } from 'react-icons/go'
import { IoBugOutline } from 'react-icons/io5'




const StatCard = ({ Icon, title, subTitle, }: { Icon: ReactNode, title: ReactNode, subTitle: ReactNode }) => {
    return (
        <div className='flex flex-wrap gap-5 py-2 '>
            {Icon}
            <div>
                <h4 className='text-base font-semibold tracking-wide'>{title}</h4>
                <h4 className='text-gray-400'>{subTitle}</h4>
            </div>
        </div>

    )
}

const StatCard1 = ({ Icon, title, subTitle, }: { Icon: ReactNode, title: ReactNode, subTitle: ReactNode }) => {
    return (
        <div className='flex flex-wrap gap-5 py-2 '>
            {Icon}
            <div>
                <h4 className='text-base font-semibold tracking-wide'>{title}</h4>
                <h4 className='text-gray-400'>{subTitle}</h4>
            </div>
        </div>

    )
}
const StatCard2 = ({ Icon, title }: { Icon: ReactNode, title: ReactNode }) => {
    return (
        <div className='flex flex-wrap gap-5 py-2 '>
            {Icon}
            <div>
                <h4 className='text-base font-semibold tracking-wide'>{title}</h4>
              
            </div>
        </div>

    )
}



export default function NotificationBar() {

    const statList = [
        {
            title: "You fixed a bug",
            subTitle: 'Just now',
            Icon: <IoBugOutline className='bg-[#EDEEFC] px-[4px] py-[4px] rounded-lg text-2xl' />,

        },
        {
            title: "New user registered.",
            subTitle: '59 minutes ago',
            Icon: <GoPerson className='bg-[#EDEEFC] px-[4px] py-[4px] rounded-lg text-2xl' />,

        },
        {
            title: "You fixed a bug.",
            subTitle: '12 hours ago',
            Icon: <IoBugOutline className='bg-[#EDEEFC] px-[4px] py-[4px] rounded-lg text-2xl' />,

        },
        {
            title: "Andi Lane subscribed to you.",
            subTitle: 'Today, 11:59 AM',
            Icon: <PiBroadcastLight className='bg-[#EDEEFC] px-[4px] py-[4px] rounded-lg text-2xl' />,

        },


    ]

    const statList1 = [
        {
            title: "Changed the style.",
            subTitle: 'Just now',
            Icon: <GoPerson className='bg-[#EDEEFC] px-[4px] py-[4px] rounded-lg text-2xl' />,

        },
        {
            title: "Released a new version.",
            subTitle: '59 minutes ago',
            Icon: <GoPerson className='bg-[#EDEEFC] px-[4px] py-[4px] rounded-lg text-2xl' />,

        },
        {
            title: "Submitted a bug.",
            subTitle: '12 hours ago',
            Icon: <GoPerson className='bg-[#EDEEFC] px-[4px] py-[4px] rounded-lg text-2xl' />,

        },
        {
            title: "Modified A data in Page X.",
            subTitle: 'Today, 11:59 AM',
            Icon: <GoPerson className='bg-[#EDEEFC] px-[4px] py-[4px] rounded-lg text-2xl' />,

        },
        {
            title: "Deleted a page in Project X.",
            subTitle: 'Today, 11:59 AM',
            Icon: <GoPerson className='bg-[#EDEEFC] px-[4px] py-[4px] rounded-lg text-2xl' />,

        },


    ]
    const statList2 = [
        {
            title: "Natali Craig",

            Icon: <GoPerson className='bg-[#EDEEFC] px-[4px] py-[4px] rounded-lg text-2xl' />,

        },
        {
            title: "Drew Cano",

            Icon: <GoPerson className='bg-[#EDEEFC] px-[4px] py-[4px] rounded-lg text-2xl' />,

        },
        {
            title: "Andi Lane",

            Icon: <GoPerson className='bg-[#EDEEFC] px-[4px] py-[4px] rounded-lg text-2xl' />,

        },
        {
            title: "Koray Okumus",
            Icon: <GoPerson className='bg-[#EDEEFC] px-[4px] py-[4px] rounded-lg text-2xl' />,

        },
        {
            title: "Kate Morrison",
            Icon: <GoPerson className='bg-[#EDEEFC] px-[4px] py-[4px] rounded-lg text-2xl' />,

        },
        {
            title: "Melody Macy",
            Icon: <GoPerson className='bg-[#EDEEFC] px-[4px] py-[4px] rounded-lg text-2xl' />,

        },


    ]



    return (
        <div className='w-85 h-255  border border-gray-200 mx-4 rounded-2xl shadow-lg bg-white'>

            <div className='py-3 px-5 '>
                <h1 className='text-[18px] font-medium py-1 '>Notifications</h1>
                {statList.map((x, i) => <StatCard key={i} Icon={x.Icon} title={x.title} subTitle={x.subTitle} />)}
            </div>
            <div className='py-3 px-5 '>
                <h1 className='text-[18px] font-medium  '>Activities</h1>
                {statList1.map((x, i) => <StatCard1 key={i} Icon={x.Icon} title={x.title} subTitle={x.subTitle} />)}
            </div>
            <div className='py-3 px-5 '>
                <h1 className='text-[18px] font-medium py-1 '>Contacts</h1>
                {statList2.map((x, i) => <StatCard2 key={i} Icon={x.Icon} title={x.title}  />)}
            </div>
        </div>
    )
}


