"use client";
import LineChartView from "@/component/overview/LineChart";
import TinyBarChartBox from "@/component/overview/TinyBarChartBox";
import Views from "@/component/overview/views";
import NotificationBar from "../natification-bar";

export default function Overview() {
    return (
        <div className="flex">
            <div>
                <div>Overview</div>
                <Views />
                <LineChartView />
                <TinyBarChartBox />
            </div>
            <NotificationBar />
        </div>
    );
}
