import React, { useEffect, useState, useRef, useDeferredValue } from "react";
import { Container } from "@mui/system";
import { LineChart } from "../charts/LineChart";
import AssetTable from "../Components/AssetTable";
import {
  getUserOverallPortfolioHistoricalValue,
  getUserOverallPortfolioValue,
  getUserPortfolioHistoricalValue,
  getUserPortfolios,
  getOneUserPortfolioValue,
} from "../users/userApi.js";
import { numberWithCommas } from "../util/util";
import CardWidget from "../Components/CardWidget";
import {
  computePortfolioAnnualisedReturns,
  computePortfolioNetReturn,
  computePortfolioPnL,
  computeVolatility,
} from "../util/financeComputations";
import { useContext } from "react";
import { UserContext } from "../util/context";
import { MultiLineChart } from "../charts/MulitLineChart";

export const Overallpage = () => {

  const lineChartContainer = useRef(null);
  const [individualPortfolioStats, setIndividualPortfolioStats] =
    useState(null);
  const[{overallPfValue,portfoliosHistory,portfolioList,lineChartWidth},setPfInfo]=
  useState({overallPfValue:0,portfoliosHistory:null,portfolioList:[],lineChartWidth:1000});
  const selectDisplay=useRef(null);
  const[displayChartType,setDisplayChartType]=useState("overallValue");

  const {userEmail,portfolios}=useContext(UserContext);
  useEffect(() => {
    const getIndividualPfStats = (portfolioList) => {
      const pfArray = portfolioList.map(async (portfolio) => {
        let pfValue = await getOneUserPortfolioValue(
          userEmail,
          portfolio.portfolio
        );
        let chartData = await getUserPortfolioHistoricalValue(
          userEmail,
          portfolio.portfolio,
          new Date(new Date().setMonth(new Date().getMonth() - 1)),
          // startDate,
          new Date(),
          "1d"
        );
        const route = `/portfolio/${portfolio.portfolio}`
        let output = {
          value: pfValue,
          netPnL: computePortfolioPnL([portfolio], pfValue),
          netReturn: computePortfolioNetReturn([portfolio], pfValue),
          portfolioName: portfolio.portfolio,
          portfolioHistory: chartData,
          route: route
        }
        return output
      })
      return pfArray
    } 
    // console.log('linechart',lineChartContainer.current.offsetWidth);
    // console.log('email',userEmail);
    // console.log('portfolios',portfolios);
    if (userEmail &&lineChartContainer.current && portfolios.length>0) {
      (async()=>{
        console.log('run api calls in overallpage');

        let userVal=await getUserOverallPortfolioValue(userEmail);      
        let histVal=await getUserOverallPortfolioHistoricalValue(
          userEmail,
            new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
            new Date()
          );
        let pfList=await getUserPortfolios(userEmail);

          setPfInfo({overallPfValue:userVal,
            portfoliosHistory:histVal,
            portfolioList:pfList, 
            lineChartWidth:lineChartContainer.current.offsetWidth});
          const promises = getIndividualPfStats(pfList);
          Promise.all(promises).then(values => {
            setIndividualPortfolioStats(values)
          })
      })()

    }
  }, [userEmail,portfolios]);
  
      
  let netReturn = 0;
  let netPnL = 0;
  let annualisedReturn = 0;
  let portfolioVolatility = 0;
  if(portfolioList){
     netReturn = computePortfolioNetReturn(portfolioList, overallPfValue);
     netPnL = computePortfolioPnL(portfolioList, overallPfValue);
     annualisedReturn = computePortfolioAnnualisedReturns(
      portfolioList,
      overallPfValue
    );
  }
  if(portfoliosHistory){
    portfolioVolatility = computeVolatility(portfoliosHistory);
  }
  const handleChangeDisplay=(e)=>{   
    for(let child of selectDisplay.current.childNodes){
      if(child===e.target){
        child.classList.add("bactive");
      }
      else{
        child.classList.remove("bactive");
      }
    }
    if (e.target.id==='overallValue'){
      setDisplayChartType("overallValue");
    }
    else{
      setDisplayChartType("allAssets");
    }
   };
  return (
    <React.Fragment>
      <Container id="container"  maxWidth={false}>
        <div className="position-relative mt-2">
          <div>
            <h2>
              Overall Value:
              <br />${numberWithCommas(overallPfValue.toFixed(2))}
            </h2>
          </div>
          <div className="position-absolute top-0 end-0">
            <div className="d-flex h-100 p-1">
              <CardWidget
                type="annReturn"
                value={annualisedReturn.toFixed(1)}
              />
              <CardWidget type="netReturn" value={netReturn.toFixed(1)} />
              <CardWidget type="netPnL" value={netPnL.toFixed(0)} />
              <CardWidget
                type="volatility"
                value={portfolioVolatility.toFixed(1)}
              />
            </div>
          </div>
        </div>
        {/* <div className="d-grid col-3" ref={selectDisplay}>
        <button  className="btn btn-light me-1 bdisplay bactive" id="overallValue" onClick={handleChangeDisplay}>
          Portfolio Value
        </button>    
        <button className="btn btn-light me-1 bdisplay" id="allAssets"  onClick={handleChangeDisplay}>
          Display all Asset Value
        </button>    
      </div> */}
        <div className="row">
          <div className="col p-0" ref={lineChartContainer}>
            
          {displayChartType==="overallValue"&&
            <LineChart
              data={portfoliosHistory}
              dynamicWidth={true}
              displayDiff={false}
              margin={{ right: 50, left: 70, bottom: 50, top: 60 }}
              lineWidth="3px"
              width={lineChartWidth}
              xValue={(d) => new Date(d.date)}
              yValue={(d) => d.value}
              yAxisTicks={6}
              displayTitle="OverallPortfolio"
              yAxisFormat={(d) => `$${numberWithCommas(d.toFixed(2))}`}
            />
  }

          </div>
          
        </div>
        <hr />
        <AssetTable
          data={individualPortfolioStats}
          mode="Overall Portfolio"
        />
        <br />
        <br />
      </Container>
    </React.Fragment>
  );
};
