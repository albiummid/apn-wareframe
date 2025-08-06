import { Burger, Flex, Text } from '@mantine/core'
import React from 'react'
import { BsSlash } from "react-icons/bs";
import Search from './Search';
import { IoSunnyOutline } from "react-icons/io5";
import { RxCountdownTimer } from "react-icons/rx";
import { FaBell } from "react-icons/fa";
import { RiSideBarLine } from "react-icons/ri";

import { RiSideBarFill } from "react-icons/ri";

export default function DashboardHeader({ opened, toggle }: { opened: boolean, toggle: () => void }) {
    return (
        <Flex className=" border-b border-gray-200  ">
            
            <div className='flex justify-between items-center w-full '>

                <div className='flex items-center gap-3 relative'>
                    <div onClick={toggle} className='cursor-pointer'>
                        {opened?<RiSideBarFill />:<RiSideBarLine />}
                    </div>
                    <Text>Dashboard</Text>
                    <BsSlash className='text-2xl text-gray-300' />
                    <h1 className=''>Default</h1>
                </div>
                <div>
                  <div className='flex items-center gap-5'>
                    <IoSunnyOutline />
                    <RxCountdownTimer />
                    <FaBell />
                  </div>
                </div>
            </div>



        </Flex>
    )
}
