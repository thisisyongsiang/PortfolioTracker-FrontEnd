import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getHistoricalDailyQuotes } from "../FinanceRoutes/financeAPI";
import * as d3 from "d3";
import { PlotLine } from "./PlotLine";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";


export const LineChart=({
    data=[],
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
    xValue=d=>d,
    yValue=d=>d,
    yAxisFormat=d=>d
})=>{
    const [dotPosition,setDotPosition]=useState(null);
    const containerRef=useRef(width);
    const [containerWidth,setContainerWidth]=useState(null);
    // const quoteData=useGetQuoteData(ticker,startDate,endDate,quoteInterval);
    width=containerWidth?containerWidth:width;
    const innerHeight=height-margin.top-margin.bottom;
    const innerWidth=width-margin.left-margin.right;
    const radius=5;
    useEffect(()=>{
        const handleResize=()=>{
            setContainerWidth(containerRef.current?.offsetWidth);
        };
        if (dynamicWidth){
            let cWidth=containerRef.current?.offsetWidth;
            if (cWidth){
                setContainerWidth(cWidth);
            }
            window.addEventListener('resize',handleResize);
            return ()=>window.removeEventListener('resize',handleResize);
        }

    },[containerRef.current?.offsetWidth,dynamicWidth]);
    if (!data){
        return (
            <div className="spinner-border text-warning" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
        )
    }

    const xScale=d3.scaleTime()
    .domain(d3.extent(data,xValue))
    .range([0,innerWidth]);

    const yScale=d3.scaleLinear()
    .domain(d3.extent(data,yValue))
    .range([innerHeight,0]);
    const xAxisFormat=d3.timeFormat("%e/%m/%Y")
    
    let handleMouseMove=null;
    if (trackMouse){
        handleMouseMove=e=>{
            let x=e.nativeEvent.offsetX-margin.left;
            let y= e.nativeEvent.offsetY-(margin.top);
            let least=d3.least(data,d=>Math.hypot(((xScale(xValue(d))-x))));
            setDotPosition(least);        
        }
    }

    return(
        <React.Fragment>
        {data.length>0 &&
        <div className="p-0 m-0" ref={containerRef} >
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
                    yAxisFormat={yAxisFormat}
                    tickCount={yAxisTicks}
                    yScale={yScale}
                    innerWidth={innerWidth} />
                }

                <text className="axisLabel"x={innerWidth/2} y={innerHeight+35}>{displayTitle}</text>
                <PlotLine 
                    data={data}
                    xScale={xScale}
                    yScale={yScale}
                    xValue={xValue}
                    yValue={yValue}
                    color={displayDiff?(yValue(data[0])>yValue(data[data.length-1])?'#FF0000':'#008000'):lineColor}
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
                        <tspan x='0' dy='-1.2em'>  {yAxisFormat(Number(yValue(dotPosition).toFixed(2)))} </tspan>
                    </text>
                    </g>
                }
                </g>
            </svg>
        </div>
            
            }

        </React.Fragment>
    )
};