

export const VerticalMarkerChart = ({xScale, innerHeight, vertMarkerFormat,data,xValue }) => {

  return data.map((d, i) => (
    <g className='tick' key={i} transform={`translate(${xScale(xValue(d))})`}>
      <line x1={0} y1={-15} x2={0} y2={innerHeight} />
      <text style={{textAnchor:'middle'}}dy=".71em" y={-25}>
        {vertMarkerFormat(d)}
      </text>
    </g>
  ));
};
