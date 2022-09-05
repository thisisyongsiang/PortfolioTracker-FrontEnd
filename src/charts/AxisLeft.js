
export const AxisLeft = ({ tickCount,yScale, innerWidth, yAxisFormat = (x) => x }) => {
    let ticks = yScale.ticks(tickCount);
    ticks=ticks.splice(1);
    ticks.pop();
    ticks.push(yScale.domain()[0].toFixed());
    ticks.push(yScale.domain()[1].toFixed());
  return ticks.map((tick, i) => (
    <g className='tick' key={i} transform={`translate(0,${yScale(tick)})`}>
      <line x1={0} y1={0} x2={innerWidth} y2={0} />
      <text style={{textAnchor:'end'}}dy=".32em" x={-3}>
        {yAxisFormat(Number(tick))}
      </text>
    </g>
  ));
};
