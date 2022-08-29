

export const AxisBottom = ({xScale, innerHeight, xAxisFormat,tickCount }) => {
  let ticks = xScale.ticks(tickCount);
  ticks=ticks.splice(1);
  ticks.pop();
  ticks.push(xScale.domain()[0]);
  ticks.push(xScale.domain()[1]);
  return ticks.map((tick, i) => (
    <g className='tick' key={i} transform={`translate(${xScale(tick)})`}>
      <line x1={0} y1={innerHeight+5} x2={0} y2={innerHeight} />
      <text style={{textAnchor:'middle'}}dy=".71em" y={innerHeight + 8}>
        {xAxisFormat(tick)}
      </text>
    </g>
  ));
};
