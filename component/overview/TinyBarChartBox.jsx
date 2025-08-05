'use client'

import React from 'react'
import { GoDotFill } from 'react-icons/go';
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Cell, Pie, PieChart } from 'recharts';


const data = [
    {
        name: 'Linux',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Mac',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'iOS',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Windows',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Android',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Other',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },

];

const data01 = [
    {
        "name": "United States",
        "value": 52,
    },
    {
        "name": "Canada",
        "value": 22.8
    },
    {
        "name": "Mexico",
        "value": 13.9
    },
    {
        "name": "Other",
        "value": 11.2
    },

];

const data02 = [
    {
        "name": "United States",
        "value": 52,
    },
    {
        "name": "Canada",
        "value": 22.8
    },
    {
        "name": "Mexico",
        "value": 13.9
    },
    {
        "name": "Other",
        "value": 17.2
    },

];


const StatCard = ({ label1, label2, color }) => {

    return (

        <div className='grid grid-cols-2 items-center gap-8 '>
            <div className='flex items-center gap-2 w-40 '>
                <GoDotFill color={color} />
                <h4 >{label1}</h4>
            </div>
            <div>
                <h4>{label2}</h4>
            </div>
        </div>
    )
}



const TinyBarChartBox = () => {

    const statList = [
        {

            label1: "United States",
            label2: "52.1%",
            color: '#000000',
        },
        {

            label1: "Canada",
            label2: "22.8%",
            color: 'yellow',
        },
        {

            label1: "Mexico",
            label2: "13.9%",
            color: 'green',
        },
        {

            label1: "Other",
            label2: "11.2%",
            color: 'red',
        },
   

    ]


    return (
        <div className=' h-70 w-280 flex items-center justify-between   '>
            <div className='grid grid-cols-2 gap-4 w-full h-full '>
                <div className='w-full h-75 bg-[#F9F9FA] py-4 px-4 rounded-2xl mt-8'>
                    <h1>Traffic by Device</h1>
                    <div className='items-center'>

                        <BarChart
                            width={550}
                            height={300}
                            data={data}
                            margin={{
                                top: 30,
                                right: 110,
                                left: -10,
                                bottom: 50,
                            }}
                            barSize={20}
                        >
                            <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
                        </BarChart>

                    </div>
                </div>
                {/*  */}
                <div className='w-full h-75 bg-[#F9F9FA] py-4 px-4 rounded-2xl mt-8'>
                    <h1>Traffic by Device</h1>
                    <div className='grid grid-cols-2 gap-10 items-center justify-between  '>
                        <div>
                            <PieChart width={250} height={250}>
                                <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#AEC7ED" />
                                <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#94E9B8" label />

                            </PieChart>

                        </div>

                        <div>
                            <ul >
                                <li >
                                    {statList.map((item, idx) => (

                                        <StatCard key={idx} label1={item.label1} label2={item.label2} color={item.color}  />

                                    ))}

                                </li>
                                {/* 
                                <li >
                                    <div className='grid grid-cols-2 items-center gap-8 '>
                                        <div className='flex items-center gap-2 '>
                                            <GoDotFill className='text-[#94E9B8]' />
                                            <h4 ></h4>
                                        </div>
                                        <div>
                                            <h4></h4>
                                        </div>
                                    </div>

                                </li>
                                <li >
                                    <div className='grid grid-cols-2 items-center gap-8 '>
                                        <div className='flex items-center gap-2 '>
                                            <GoDotFill className='text-[#AEC7ED]' />
                                            <h4 ></h4>
                                        </div>
                                        <div>
                                            <h4></h4>
                                        </div>
                                    </div>

                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default TinyBarChartBox
