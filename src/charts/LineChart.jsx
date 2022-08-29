import React, { useEffect, useState } from "react";
import { getHistoricalDailyQuotes } from "../FinanceRoutes/financeAPI";
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
    margin={left:25,right:25,top:30,bottom:30},
    trackMouse=true,
    yAxisTicks=4,
    xAxisTicks=12,
    lineWidth='2px',
    quoteInterval='1d',
    displayTitle=ticker,
    displayDiff=true,
    displayXTicks=true,
    displayYTicks=true,
    lineColor='#0F8C79',
    endDate,
    startDate
})=>{
    
    const [dotPosition,setDotPosition]=useState(null);
    const quoteData=useGetQuoteData(ticker,startDate,endDate,quoteInterval);
    const innerHeight=height-margin.top-margin.bottom;
    const innerWidth=width-margin.left-margin.right;



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
        let x=e.nativeEvent.offsetX-margin.left;
        let y= e.nativeEvent.offsetY-(margin.top);
        // x = xScale.invert(x);
        // y=yScale.invert(y);
        let least=d3.least(quoteData,d=>Math.hypot(((xScale(xValue(d))-x))));
        setDotPosition(least);        
            
    }

    return(
        <React.Fragment>
        {quoteData.length>0 &&
            <svg width={width} height={height}  onMouseMove={handleMouseMove}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                {displayXTicks&&
                <AxisBottom 
                    tickCount={xAxisTicks}
                    xScale={xScale}
                    innerHeight={innerHeight}
                    xAxisFormat={xAxisFormat} />
                }
                {displayYTicks &&
                <AxisLeft
                    tickCount={yAxisTicks}
                    yScale={yScale}
                    innerWidth={innerWidth} />
                }

                <text className="axisLabel"x={innerWidth/2} y={innerHeight+35}>{displayTitle}</text>
                <PlotLine 
                    data={quoteData}
                    xScale={xScale}
                    yScale={yScale}
                    xValue={xValue}
                    yValue={yValue}
                    radius={radius}
                    color={displayDiff?(yValue(quoteData[0])>yValue(quoteData[quoteData.length-1])?'#FF0000':'#008000'):lineColor}
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
            }

        </React.Fragment>
    )
};