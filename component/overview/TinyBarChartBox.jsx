'use client'

import React from 'react'
import { GoDotFill } from 'react-icons/go';
import { BarChart, CompositeChart, RadialBarChart } from '@mantine/charts';





const data = [
    { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 },
    { month: 'February', Smartphones: 1900, Laptops: 1200, Tablets: 400 },
    { month: 'March', Smartphones: 400, Laptops: 1000, Tablets: 200 },
    { month: 'April', Smartphones: 1000, Laptops: 200, Tablets: 800 },
    { month: 'May', Smartphones: 800, Laptops: 1400, Tablets: 1200 },
    { month: 'June', Smartphones: 750, Laptops: 600, Tablets: 1000 },

];

const data1 = [
    { name: 'United States', value: 400, color: 'black.6' },
    { name: 'Canada', value: 300, color: 'blue.6' },
    { name: 'Mexico', value: 300, color: 'green.6' },
    { name: 'Other', value: 200, color: 'red.6' },
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
            color: 'blue',
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
        <div className=' h-70 w-280 flex md:flex-wrap items-center justify-between   '>
            <div className='grid grid-cols-2 gap-4 w-full h-full '>
                <div className='w-full h-75 bg-[#F9F9FA] py-4 px-4 rounded-2xl mt-8'>
                    <h1>Traffic by Device</h1>
                    <div className='items-center'>
                        <BarChart
                            h={240}
                            data={data}
                            dataKey="month"
                            type="stacked"
                            series={[
                                { name: 'Smartphones', color: 'violet.6' },
                                { name: 'Laptops', color: 'blue.6' },
                                { name: 'Tablets', color: 'teal.6' },
                            ]}
                        />

                    </div>
                </div>
                {/*  */}
                <div className='w-full h-75 bg-[#F9F9FA] py-4 px-4 rounded-2xl mt-8'>
                    <h1>Traffic by Device</h1>
                    <div className='grid grid-cols-2 gap-10 items-center justify-between  '>
                        <div>
                            <RadialBarChart data={data1} dataKey="value" h={280} withLabels />;


                        </div>
                        <div>
                            <ul >
                                <li >
                                    {statList.map((item, idx) => (

                                        <StatCard key={idx} label1={item.label1} label2={item.label2} color={item.color} />

                                    ))}

                                </li>
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
