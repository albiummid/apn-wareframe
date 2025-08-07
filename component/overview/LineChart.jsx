"use client"

import React, { use } from 'react'
import { GoDash, GoDotFill } from 'react-icons/go'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { AreaChart } from '@mantine/charts';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398 },
  { name: 'Page C', uv: 2000, pv: 9800 },
  { name: 'Page D', uv: 2780, pv: 3908 },
  { name: 'Page E', uv: 1890, pv: 4800 },
  { name: 'Page F', uv: 2390, pv: 3800 },
  { name: 'Page G', uv: 3490, pv: 4300 }
];

const StatCard = ({ label }) => {

  return (

    <div>
      <div className='grid grid-cols-2 items-center gap-3 px-[15px] py-[6px] '>
        <h5>{label}</h5>
        <div className='flex flex-wrap items-center '><GoDash className='text-3xl ' /><GoDash className='text-3xl opacity-50' /><GoDash className='text-3xl opacity-20' /></div>
      </div>
    </div>

  )
}

const LineChartView = () => {

  const statList = [
    {

      label: "goolge",
    },
    {

      label: "YouTube",
    },
    {

      label: "Instagram",
    },
    {

      label: "Pinterest",
    },
    {

      label: "Facebook",
    },
    {

      label: "Twitter",
    },

  ]


  return (
    <div className='w-full h-83 md:flex md:flex-wrap items-center justify-between mb-2 mt-2'>

      <div className='w-100 md:w-200 h-89 bg-[#F9F9FA] rounded-2xl'>
        <div className='   flex flex-wrap  py-4 px-5 gap-4  items-center'>
          <h1 className='text-[14px] xl:text-[16px] '>Total Users</h1>
          <h1 className='text-[14px] xl:text-[16px] text-gray-300'>Total Projects</h1>
          <h1 className='text-[14px] xl:text-[16px] text-gray-300'>Operating Status</h1>
          <div className=' px-8 '>
            <ul className=' flex   gap-8 justify-between  items-center'>
              <li className='flex items-center gap-2'>
                <GoDotFill />
                <span className='text-[10px] xl:text-[16px]'>This year</span>
              </li>
              <li className='flex items-center gap-2'>
                <GoDotFill className='text-[#AEC7ED]' />
                <span className='text-[10px] xl:text-[16px]'>Lest year</span>
              </li>
            </ul>
          </div>
        </div>
        <div className='w-100 xl:w-full h-80'>
          <AreaChart
            h={275}
            data={data}
            dataKey="name"
            withRightYAxis
            yAxisLabel="uv"
            rightYAxisLabel="pv"
            series={[
              { name: 'uv', color: 'pink.6' },
              { name: 'pv', color: 'cyan.6', yAxisId: 'right' },
            ]}
          />

        </div>
      </div>

      {/*  */}
      <div className='w-70 h-85 bg-[#F9F9FA] rounded-2xl  py-4 px-5 '>
        <h1 className='text-center py-3 text-base font-semibold tracking-wide leading-2'>Traffic by Website</h1>


        {statList.map((item, idx) => (

          <StatCard key={idx} label={item.label} />

        ))}

      </div>
    </div>
  )
}

export default LineChartView
