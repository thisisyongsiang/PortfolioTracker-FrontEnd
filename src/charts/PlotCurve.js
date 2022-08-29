import * as d3 from 'd3';
import React from 'react';
export const PlotCurve=({
    data,xScale,yScale,xValue,yValue
})=>{
    const line=d3.line()
    .x(d=>xScale(xValue(d)))
    .y(d=>yScale(yValue(d)))
    .curve(d3.curveCardinal)(data);
    return(
        <React.Fragment>
        <path fill='none' className='ChartCurve'
            
        d={line}/>
        </React.Fragment>

    )
};
