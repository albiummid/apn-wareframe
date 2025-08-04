"use client"

import React, { use } from 'react'
import { GoDash, GoDotFill } from 'react-icons/go'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


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
      <div className='flex flex-wrap items-center gap-3 px-[15px] py-[6px] '>
        <h5>{label}</h5>
        <div className='flex flex-wrap '><GoDash className='text-3xl ' /><GoDash className='text-3xl opacity-50' /><GoDash className='text-3xl opacity-20' /></div>
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
    <div className='w-223 h-83 flex  items-center justify-between mb-8'>

      <div className='w-165 h-83 bg-[#F9F9FA] rounded-2xl'>
        <div className='flex flex-wrap  py-4 px-5 gap-4  items-center'>
          <h1>Total Users</h1>
          <h1 className='text-black opacity-30'>Total Projects</h1>
          <h1 className='text-black opacity-30'>Operating Status</h1>
          <div className=' px-8 '>
            <ul className='flex  gap-8 justify-between  items-center'>
              <li className='flex items-center gap-2'>
                <GoDotFill />
                <span>This year</span>
              </li>
              <li className='flex items-center gap-2'>
                <GoDotFill className='text-[#AEC7ED]' />
                <span>Lest year</span>
              </li>
            </ul>
          </div>
        </div>
        <div className='w-full h-80'>

          <LineChart width={630} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>

        </div>
      </div>

      {/*  */}
      <div className='w-51 h-83 bg-[#F9F9FA] rounded-2xl  py-4 '>
        <h1 className='text-center py-3 text-base font-semibold tracking-wide leading-2'>Traffic by Website</h1>


        {statList.map((item, idx) => (

          <StatCard key={idx} label={item.label} />

        ))}

      </div>
    </div>
  )
}

export default LineChartView
