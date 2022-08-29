import React, { useEffect, useState } from "react";
import { getHistoricalDailyQuotes } from "./financeAPI";
import * as d3 from "d3";
import { PlotLine } from "./PlotLine";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";

export const useGetQuoteData=(ticker,startDate,endDate,interval)=>{
    const [quoteData,setQuoteData]=useState([]);
    useEffect(()=>{
        getHistoricalDailyQuotes(ticker,startDate,endDate,interval)
            .then((data)=>{
                setQuoteData(data);
            })
    },[ticker,startDate,endDate,interval])
    return quoteData;
}

export const LineChart=({
    ticker='SPY',
    width=1000,
    height=400,
    margin={horizontal:50,vertical:60},
    trackMouse=true,
    yAxisTicks=4,
    xAxisTicks=12,
    lineWidth='2px',
    quoteInterval='1d',
    endDate,
    startDate
})=>{
    
    const [dotPosition,setDotPosition]=useState(null);
    const quoteData=useGetQuoteData(ticker,startDate,endDate,quoteInterval);
    const innerHeight=height-margin.vertical*2;
    const innerWidth=width-margin.horizontal*2;



    if (quoteData.length===0){
        return <pre>Loading ...</pre>
    }

    const radius=5;
    const xValue=d=>new Date(d.date);
    const yValue=d=>d.close;
    const xScale=d3.scaleTime()
    .domain(d3.extent(quoteData,xValue))
    .range([0,innerWidth]);

    const yScale=d3.scaleLinear()
    .domain(d3.extent(quoteData,yValue))
    .range([innerHeight,0]);
    const xAxisFormat=d3.timeFormat("%e/%m/%Y")
    
    const handleMouseMove=e=>{
        let x=e.nativeEvent.offsetX-margin.horizontal;
        let y= e.nativeEvent.offsetY-(margin.vertical);
        // x = xScale.invert(x);
        // y=yScale.invert(y);
        let least=d3.least(quoteData,d=>Math.hypot(((xScale(xValue(d))-x))));
        setDotPosition(least);        
            
    }

    return(
        <React.Fragment>
            <svg width={width} height={height}  onMouseMove={handleMouseMove}>
                <g transform={`translate(${margin.horizontal},${margin.vertical})`}>
                <AxisBottom 
                    tickCount={xAxisTicks}
                    xScale={xScale}
                    innerHeight={innerHeight}
                    xAxisFormat={xAxisFormat} />
                <AxisLeft
                    tickCount={yAxisTicks}
                    yScale={yScale}
                    innerWidth={innerWidth} />
                <text className="axisLabel"x={innerWidth/2} y={innerHeight+35}>{ticker}</text>
                <PlotLine 
                    data={quoteData}
                    xScale={xScale}
                    yScale={yScale}
                    xValue={xValue}
                    yValue={yValue}
                    radius={radius}
                    color='#0F8C79'
                    lineWidth={lineWidth}
                />
                {
                    (dotPosition &&trackMouse)&&
                    <g className="mark" transform={`translate(${xScale(xValue(dotPosition))},${yScale(yValue(dotPosition))})`}>
                        <circle
                        cx={0}
                        cy={0}
                        r={radius}
                            ></circle>
                    <text textAnchor="middle"
                    x={0} 
                    y={-6}>
                        <tspan x='0' dy='-1.2em'>  {xAxisFormat(xValue(dotPosition))} </tspan>
                        <tspan x='0' dy='-1.2em'>  ${yValue(dotPosition)} </tspan>
                    </text>
                    </g>
                }



                </g>

            </svg>

        </React.Fragment>
    )
};