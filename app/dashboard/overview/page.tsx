
'use client'
import Views from '@/component/overview/views'
import LineChartView from '@/component/overview/LineChart'
import TinyBarChartBox from '@/component/overview/TinyBarChartBox'



export default function Overview() {

    return (
        <>
            <div>Overview</div>
            <Views/>
            <LineChartView/>
            <TinyBarChartBox/>
            
        </>

    )
}
