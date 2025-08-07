import { Burger, Flex, Text } from '@mantine/core'
import React from 'react'
import { BsSlash } from "react-icons/bs";
import { IoSunnyOutline } from "react-icons/io5";
import { RxCountdownTimer } from "react-icons/rx";
import { FaBell, FaRegBell } from "react-icons/fa";
import { RiSideBarLine } from "react-icons/ri";


import { RiSideBarFill } from "react-icons/ri";
import { PiClockCounterClockwise } from 'react-icons/pi';

export default function DashboardHeader({ opened, toggle }: { opened: boolean, toggle: () => void }) {
    return (
        <Flex className=" border-b border-gray-200 py-2 ">

            <div className=' w-full flex flex-wrap justify-between items-center '>

                <div className='flex items-center gap-3 relative'>
                    <div onClick={toggle} className='cursor-pointer'>
                        {opened ? <RiSideBarFill /> : <RiSideBarLine />}
                    </div>
                    <Text>Dashboard</Text>
                    <BsSlash className='text-2xl text-gray-300' />
                    <h1 className=''>Default</h1>
                </div>
                <div>
                    <div className='flex items-center gap-5'>
                        <div className='flex items-center '>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="border border-gray-300 px-4 py-2  w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-blue-300 text-white px-4 py-2  hover:bg-blue-400 transition">Search</button>
                        </div>
                        <IoSunnyOutline className='text-2xl' />
                        <PiClockCounterClockwise  className='text-2xl'  />
                        <FaRegBell  className='text-2xl'  />
                    </div>
                </div>
            </div>



        </Flex>
    )
}
