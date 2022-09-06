import React, { useEffect, useState,useRef } from "react";
import {useParams} from "react-router-dom"
import { Container } from "@mui/system";
import { LineChart } from "../charts/LineChart";
import AssetTable from "../Components/AssetTable";
import PortfolioCharts from "../Components/PortfolioCharts";
import { getOneUserPortfolioValue ,getUserPortfolioAssets,getUserPortfolioHistoricalValue} from "../users/userApi.js";
import { numberWithCommas } from "../util/util";
import CardWidget from "../Components/CardWidget";
import { getUserOnePortfolio } from "../users/userApi.js";

import { computePortfolioPnL, computePortfolioNetReturn, computePortfolioAnnualisedReturns, computeVolatility } from "../util/financeComputations";
import { Link } from "react-router-dom";
export const PortfolioPage=(user)=>{
  const userData=user.user;
  const {portfolioId}=useParams();
  
  const [pfValue,setPfValue]=useState(0);
  const [pfAssets,setPfAssets]=useState([]);
  const [portfoliosHistory,setportfoliosHistory]=useState([]);
  const lineChartContainer=useRef(null);
  const [lineChartWidth,setLineChartWidth]=useState(1000);
  const [portfolio, setUserPortfolio] = useState([])

  useEffect(()=>{
    if(lineChartContainer.current){
      setLineChartWidth(lineChartContainer.current.offsetWidth);
    }
    if (userData && portfolioId){
      // let startDate=new Date(new Date().setDate(new Date().getDate()-15));
      getUserPortfolioHistoricalValue(userData.emailAddress,portfolioId,
        new Date(new Date().setFullYear(new Date().getFullYear()-1)),
          // startDate,
        new Date()
      ).then(pfHist=>{
        setportfoliosHistory(pfHist);
      });
      getOneUserPortfolioValue(userData.emailAddress,portfolioId).then(v=>
        setPfValue(v));
      getUserOnePortfolio(userData.emailAddress,portfolioId).then((v) => {
        setUserPortfolio(v)
      })
      getUserPortfolioAssets(userData.emailAddress,portfolioId).then(assets=>{
        let pfAssets=assets.map(asset=>{
         return {...asset, route:`/portfolio/${portfolioId}/${asset.symbol}`};
        })
        setPfAssets(pfAssets);
      })
    }
  },[userData,portfolioId]);

  let netReturn = computePortfolioNetReturn(portfolio, pfValue)
  let netPnL = computePortfolioPnL(portfolio, pfValue)
  let annualisedReturn = computePortfolioAnnualisedReturns(portfolio, pfValue)
  let portfolioVolatility = computeVolatility(portfoliosHistory)

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
            <CardWidget type="annReturn" value={annualisedReturn.toFixed(1)}/>
            <CardWidget type="netReturn" value={netReturn.toFixed(1)}/>
            <CardWidget type="netPnL" value={netPnL.toFixed(0)}/>
            <CardWidget type="volatility" value={portfolioVolatility.toFixed(1)}/>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col p-0" ref={lineChartContainer}>
          <LineChart
              data={portfoliosHistory}
              dynamicWidth={true}
              displayDiff={true}
              margin={{right:50,left:70,bottom:50,top:60}}
              lineWidth='3px'
              width={lineChartWidth}    
              xValue={d=>new Date(d.date)}
              yValue={d=>d.value}
              yAxisTicks={6}
              displayTitle={portfolioId}
              yAxisFormat={d=>`$${numberWithCommas(d.toFixed(2))}`}
             />

            </div>
          </div>
        <hr />
        <ul className="list-group">
          {pfAssets.map(asset=>{
            return(
              <li   key={asset.symbol} className="list-group-item">
                <Link to={asset.route} className='w-100'>
              {asset.shortName}
                </Link>
            </li>
            )
          })}

        </ul>
        < AssetTable currURL={window.location.pathname.substring(1)} content={{pfAssets, userData}} mode="Single Portfolio"/>
        </Container>
      </React.Fragment>
  )

}