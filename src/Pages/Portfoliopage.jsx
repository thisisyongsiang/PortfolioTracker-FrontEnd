import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import { LineChart } from "../charts/LineChart";
import AssetTable from "../Components/AssetTable";
import PortfolioCharts from "../Components/PortfolioCharts";
import { getUserOverallPortfolioValue ,getUserPortfolioHistoricalValue,getUserPortfolios, getUserPortfolioValue} from "../users/userApi.js";
import { numberWithCommas } from "../util/util";
import CardWidget from "../Components/CardWidget";


export const PortfolioPage=(portfolio,user)=>{
    const portfolioData=portfolio;
    const userData=user;
    const [pfValue,setPfValue]=useState(0);
    const [portfoliosHistory,setportfoliosHistory]=useState([]);
    useEffect(()=>{
      if (portfolioData){
        getUserPortfolioValue(userData.emailAddress,portfolioData['portfolio']).then(data=>{
            setPfValue(data);
        });
        getUserPortfolioHistoricalValue(userData.emailAddress,portfolioData['portfolio'],
        new Date(new Date().setFullYear(new Date().getFullYear()-1)),
        new Date()
        ).then(pfHist=>{
        console.log(pfHist);
        setportfoliosHistory(pfHist);
        });
      }
    },[userData]);

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
          <div className="col">
            <LineChart
                data={portfoliosHistory}
                dynamicWidth={true}
                displayDiff={false}
                margin={{right:50,left:50,bottom:50,top:60}}
                lineWidth='3px'
                width={1200}    
                xValue={d=>new Date(d.date)}
                yValue={d=>d.value}
                displayTitle="Overall Portfolio"
               />
              </div>
            </div>
          <hr />
          < PortfolioCharts />
          < AssetTable data={portfolio}/>
          </Container>
        </React.Fragment>
    )

}