import * as d3 from 'd3';
import React from 'react';
export const PlotLine=({
    data,xScale,yScale,xValue,yValue,color='black',lineWidth='2px'
})=>{
    const line=d3.line()
    .x(d=>xScale(xValue(d)))
    .y(d=>yScale(yValue(d)))
    // .curve(d3.curveCardinal)(data);
    (data);
    return(
        <React.Fragment>
        <path fill='none' className='ChartLine'
            style={{stroke:color,strokeWidth:lineWidth}}
        d={line}/>
        </React.Fragment>

    )
};
