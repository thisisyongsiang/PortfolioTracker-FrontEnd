import React, { useEffect, useState,useRef } from "react";
import { Container } from "@mui/system";
import { LineChart } from "../charts/LineChart";
import AssetTable from "../Components/AssetTable";
import { getUserOverallPortfolioValue ,getUserPortfolioHistoricalValue,getUserPortfolios} from "../users/userApi.js";
import { numberWithCommas } from "../util/util";
import CardWidget from "../Components/CardWidget";
import { computeAnnualisedReturns, computePortfolioNetReturn, computePortfolioPnL } from "../util/financeComputations";

export const Overallpage=(user)=>{
    const userData=user.user;
    const [overallPfValue,setOverallPfValue]=useState(0);
    const [portfolios,setPortfolios]=useState([]);
    const [portfoliosHistory,setportfoliosHistory]=useState([]);
    const lineChartContainer=useRef(null);
    const [lineChartWidth,setLineChartWidth]=useState(1000);
    useEffect(()=>{
      if(lineChartContainer.current){
        setLineChartWidth(lineChartContainer.current.offsetWidth);
      }
      if (userData){
        getUserPortfolios(userData.emailAddress).then(d=>{
          setPortfolios(d);
          getUserPortfolioHistoricalValue(userData.emailAddress,d[0]['portfolio'],
          new Date(new Date().setFullYear(new Date().getFullYear()-1)),
          new Date()
          ).then(pfHist=>{
            setportfoliosHistory(pfHist);
          });
        });
        getUserOverallPortfolioValue(userData.emailAddress).then(d=>{
          setOverallPfValue(d);
        });

      }
    },[userData]);

    let netReturn = computePortfolioNetReturn(portfolios, overallPfValue)
    let netPnL = computePortfolioPnL(portfolios, overallPfValue)
    let annualisedReturn = computeAnnualisedReturns(portfolios, overallPfValue)

  return (
    <React.Fragment>
      <Container id="container">
        <div className="position-relative mt-2">
          <div>
            <h2>
              Portfolio Value:
              <br />${numberWithCommas(overallPfValue.toFixed(2))}
            </h2>
          </div>
          <div className="position-absolute top-0 end-0">
            <div className="d-flex h-100 p-1">
              <CardWidget type="annReturn" value={annualisedReturn.toFixed(1)}/>
              <CardWidget type="netReturn" value={netReturn.toFixed(1)}/>
              <CardWidget type="netPnL" value={netPnL.toFixed(0)}/>
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
                displayTitle="OverallPortfolio"
               />

              </div>
            </div>
          <hr />
          {/* < PortfolioCharts /> */}
          < AssetTable />
          </Container>
        </React.Fragment>
    )

}