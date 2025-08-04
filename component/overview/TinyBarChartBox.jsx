'use client'

import React from 'react'
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';



const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];







const TinyBarChartBox = () => {





    return (
        <div className='w-223 h-70 flex items-center justify-between   '>
            <div >
                <div className='w-full h-75 bg-[#F9F9FA] py-4 px-4 rounded-2xl mt-18'>
                    <h1>Traffic by Device</h1>
                    <div className='items-center'>

                        <BarChart
                            width={600}
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


            </div>
            <div></div>
        </div>
    )
}

export default TinyBarChartBox
