export const PlotDots=({
    data,xScale,yScale,xValue,yValue,radius
})=>{
    return(
        data.map(d=>
            <circle 
            className="ChartCircle"
            key={xValue(d)}
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            r={radius}
            >
            </circle>
        )
    )
};