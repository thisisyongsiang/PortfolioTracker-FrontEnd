import React, { useEffect, useState,useRef } from "react";
import {useParams} from "react-router-dom"
import { Container } from "@mui/system";
import { LineChart } from "../charts/LineChart";
import { getOneUserPortfolioValue ,getUserPortfolioHistoricalValue} from "../users/userApi.js";
import { numberWithCommas } from "../util/util";
import CardWidget from "../Components/CardWidget";


export const PortfolioPage=(user)=>{
  const userData=user.user;
  const {portfolioId}=useParams();
  
  const [pfValue,setPfValue]=useState(0);
  const [portfoliosHistory,setportfoliosHistory]=useState([]);
  const lineChartContainer=useRef(null);
  const [lineChartWidth,setLineChartWidth]=useState(1000);

  useEffect(()=>{
    if(lineChartContainer.current){
      setLineChartWidth(lineChartContainer.current.offsetWidth);
    }
    if (userData && portfolioId){
      console.log(portfolioId);
      getUserPortfolioHistoricalValue(userData.emailAddress,portfolioId,
      new Date(new Date().setFullYear(new Date().getFullYear()-1)),
      new Date()
      ).then(pfHist=>{
        setportfoliosHistory(pfHist);
      });
      getOneUserPortfolioValue(userData.emailAddress,portfolioId).then(v=>
        setPfValue(v));
    }
  },[userData,portfolioId]);

return (
  <React.Fragment>
    <Container id="container">
      <div className="position-relative mt-2">
        <div>
          <h2>
            Portfolio Value:
            <br />${numberWithCommas(pfValue.toFixed(2))}
          </h2>
        </div>
        <div className="position-absolute top-0 end-0">
          <div className="d-flex h-100 p-1">
            <CardWidget type="annReturn" />
            <CardWidget type="netReturn" />
            <CardWidget type="unrealisedPnL" />
            <CardWidget type="volatility" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col p-0" ref={lineChartContainer}>
          <LineChart
              data={portfoliosHistory}
              dynamicWidth={true}
              displayDiff={false}
              margin={{right:50,left:50,bottom:50,top:60}}
              lineWidth='3px'
              width={lineChartWidth}    
              xValue={d=>new Date(d.date)}
              yValue={d=>d.value}
              yAxisTicks={6}
              displayTitle={portfolioId}
             />

            </div>
          </div>
        <hr />
        {/* < AssetTable /> insert portfolio table herer!! */}
        </Container>
      </React.Fragment>
  )

}