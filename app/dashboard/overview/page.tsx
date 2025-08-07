"use client";
import LineChartView from "@/component/overview/LineChart";
import TinyBarChartBox from "@/component/overview/TinyBarChartBox";
import Views from "@/component/overview/views";
import NotificationBar from "../natification-bar";

export default function Overview() {
    return (
        <div className="flex flex-wrap gap-8 justify-between items-start w-full h-full">
            <div>
          
                <Views />
                <LineChartView />
                <TinyBarChartBox    />
            </div>
            <div className=" hidden  xl:flex xl:flex-col  ">
                <NotificationBar  />
            </div>
        </div>
    );
}
