import React from "react";
import { useGetQuoteData } from "../util/customHooks";
import { LineChart } from "./LineChart";
import { LineChartBaseParams } from "./LineChart";

export function AssetLineChart({
    ticker,    
    quoteInterval,
    width=1000,
    height=400,
    margin={left:25,right:25,top:30,bottom:30},
    trackMouse=true,
    yAxisTicks=4,
    xAxisTicks=12,
    lineWidth='2px',
    displayTitle='',
    displayDiff=true,
    displayXTicks=true,
    displayYTicks=true,
    lineColor='#0F8C79',
    dynamicWidth=false,
    yAxisFormat=d=>d,
    endDate,
    startDate}){
    const data = useGetQuoteData(ticker,startDate,endDate,quoteInterval);
    return <LineChart 
        data={data}
        width={width}
        height={height}
        margin={margin}
        trackMouse={trackMouse}
        yAxisTicks={yAxisTicks}
        xAxisTicks={xAxisTicks}
        lineWidth={lineWidth}
        displayTitle={displayTitle}
        displayDiff={displayDiff}
        displayXTicks={displayXTicks}
        displayYTicks={displayYTicks}
        lineColor={lineColor}
        dynamicWidth={dynamicWidth}
        endDate={endDate}
        startDate={startDate}
        xValue={d=>new Date(d.date)}
        yValue={d=>d.close}
        yAxisFormat={yAxisFormat}
    />
}