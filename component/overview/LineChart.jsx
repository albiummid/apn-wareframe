"use client"

import React, { use } from 'react'
import { GoDash, GoDotFill } from 'react-icons/go'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { AreaChart } from '@mantine/charts';

const data = [
  {
    name: 'Jan',
    uv: 10000,
    pv: 0,
    amt: 2210,
  },
  {
    name: 'Feb',
    uv: 2000,
    pv: 5098,
    amt: 2210,
  },
  {
    name: 'Mar',
    uv: 300,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Apr',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Jun',
    uv: 2390,
    pv: 3880,
    amt: 2500,
  },
  {
    name: 'Jul',
    uv: 3050,
    pv: 4300,
    amt: 2100,
  },
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
    { name: 'Page A', uv: 4000, pv: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398 },
    { name: 'Page C', uv: 2000, pv: 9800 },
    { name: 'Page D', uv: 2780, pv: 3908 },
    { name: 'Page E', uv: 1890, pv: 4800 },
    { name: 'Page F', uv: 2390, pv: 3800 },
    { name: 'Page G', uv: 3490, pv: 4300 },

  ]


  return (
    <div className=' xl:w-full h-83 grid grid-cols-1 
    xl:grid-cols-2 items-center justify-between mb-2 mt-2'>

      <div className=' xl:w-200 h-89 bg-[#F9F9FA] rounded-2xl'>
        <div className='flex flex-wrap  py-4 px-5 gap-4  items-center'>
          <h1 className='text-[14px] xl:text-[16px] '>Total Users</h1>
          <h1 className='text-[14px] xl:text-[16px] text-gray-300'>Total Projects</h1>
          <h1 className='text-[14px] xl:text-[16px] text-gray-300'>Operating Status</h1>
          <div className=' xl:px-8 '>
            <ul className=' flex  gap-4 xl:gap-8 justify-between  items-center'>
              <li className='flex items-center gap-2'>
                <GoDotFill />
                <span className='text-[12px] xl:text-[16px]'>This year</span>
              </li>
              <li className='flex items-center gap-2'>
                <GoDotFill className='text-[#AEC7ED]' />
                <span className='text-[12px] xl:text-[16px]'>Lest year</span>
              </li>
            </ul>
          </div>
        </div>
        <div className='w-100 xl:w-150 h-80'>
          <AreaChart
            h={250}
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
