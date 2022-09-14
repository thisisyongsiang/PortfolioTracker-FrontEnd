import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "@mui/system";
import { LineChart } from "../charts/LineChart";
import AssetTable from "../Components/AssetTable";
import PortfolioCharts from "../Components/PortfolioCharts";
import {
  getOneUserPortfolioValue,
  getUserPortfolioAssets,
  getUserPortfolioAssetsTransactions,
  getUserPortfolioHistoricalValue,
  getUserPortfolioOneAssetHistoricalValue,
  getUserPortfolioOneAssetValue,
} from "../users/userApi.js";
import { numberWithCommas } from "../util/util";
import CardWidget from "../Components/CardWidget";
import { AssetLineChart } from "../charts/AssetLineChart";
import { getAssetQuote, getDividend, getStockSplit } from "../FinanceRoutes/financeAPI";
import {
  computeAssetNetReturn,
  computeAssetPnL,
  computeAnnualisedReturns,
  computeVolatility,
  computeAssetAnnualisedReturns,
} from "../util/financeComputations";
import { UserContext } from "../util/context";


export const Assetpage=()=>{
  const{userEmail,portfolios,transactionTrigger}=useContext(UserContext);
  const {assetId,portfolioId}=useParams();
  const lineChartContainer=useRef(null);
  const navigate= useNavigate();
  const[{assetQuote,assetValueHistory,transactions,lineChartWidth,assetValue,dividends},setAssetObj]=useState({
    assetQuote:null,
    assetValueHistory:null,
    transactions:null,
    lineChartWidth:1000,
    assetValue:0
  });
  const[displayChartType,setDisplayChartType]=useState(true);
  const selectDisplay=useRef(null);
  useEffect(()=>{
    if (userEmail && assetId && portfolioId&&lineChartContainer.current&&portfolios) {
      (async()=>{ 
        if(!portfolios.includes(portfolioId)){
          navigate('/');
          return;
        }
        let assets =await getUserPortfolioAssets(userEmail,portfolioId);
        console.log(assets);
        if (!assets.find(x=>x.symbol===assetId)){
          navigate(`/portfolio/${portfolioId}`);
          return;
        }
        let quote = await getAssetQuote(assetId);
        let histVal=await getUserPortfolioOneAssetHistoricalValue(
          userEmail,
          portfolioId,
          assetId,
          new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          new Date()
        );
        let t=await getUserPortfolioAssetsTransactions(
          userEmail,
          portfolioId,
          assetId
        );
        
        let aVal=await getUserPortfolioOneAssetValue(
          userEmail,
          portfolioId,
          assetId
        );
        let splits=await getStockSplit(assetId,
          new Date(new Date().setFullYear(new Date().getFullYear() - 1)));
        if (splits){
          splits = splits.map(s=>{
            let [numer,denom]=s.stockSplits.split(':');
            return {date:s.date,ratio:(+numer)/(+denom)}
          })
        }
        let dividendList=await getDividend(assetId,
          new Date(new Date().setFullYear(new Date().getFullYear() - 1)));
        setAssetObj({
          assetQuote:quote,
          assetValueHistory:histVal,
          transactions:t,
          lineChartWidth:lineChartContainer.current.offsetWidth,
          assetValue:aVal.value,
          stocksplits:splits,
          dividends:dividendList,
        })

      })();
    }
  }, [userEmail, assetId, portfolioId,transactionTrigger,portfolios]);


  let netReturn = transactions?computeAssetNetReturn(transactions.transactions, assetValue):0;
  let netPnL = transactions?computeAssetPnL(transactions.transactions, assetValue):0;
  let annualisedReturn = transactions?computeAssetAnnualisedReturns(transactions.transactions, assetValue):0;
  let assetVolatility = assetValueHistory?computeVolatility(assetValueHistory):0;
 const handleChangeDisplay=(e)=>{   
  for(let child of selectDisplay.current.childNodes){
    if(child===e.target){
      child.classList.add("bactive");
    }
    else{
      child.classList.remove("bactive");
    }
  }
  if (e.target.id==='value'){
    setDisplayChartType(true);
  }
  else{
    setDisplayChartType(false);
  }
 };
 if(transactions?.transactions.length===0){
  navigate(`/portfolio/${portfolioId}`);
 }
  return (
    <React.Fragment>
      <Container id="assetPage"  maxWidth={false}>
        <div className="position-relative mt-2">
          <div>
          <h2>
            {portfolioId}
            <br />
          </h2>
            <h3>
              {assetQuote ? assetQuote["shortName"] : "Asset"} Value:
              <br />${numberWithCommas(assetValue.toFixed(2))}
            </h3>
          </div>
          <div className="position-absolute top-0 end-0">
            <div className="d-flex h-100 p-1">
              <CardWidget
                type="annReturn"
                value={annualisedReturn.toFixed(0)}
              />
              <CardWidget type="netReturn" value={netReturn.toFixed(1)} />
              <CardWidget type="netPnL" value={netPnL.toFixed(0)} />
              <CardWidget
                type="volatility"
                value={assetVolatility.toFixed(1)}
              />
            </div>
          </div>
        </div>
      <div className="d-flex" ref={selectDisplay}>
        <button  className="btn btn-light me-1 bdisplay bactive" id="value" onClick={handleChangeDisplay}>
          Value in Portfolio
        </button>    
        <button className="btn btn-light me-1 bdisplay" id="price"  onClick={handleChangeDisplay}>
          Price
        </button>    
      </div>
        <div className="row">
          <div className="col p-0" ref={lineChartContainer}>
          {displayChartType?        
              <LineChart
              data={assetValueHistory}
              dynamicWidth={true}
              displayDiff={true}
              margin={{right:50,left:70,bottom:50,top:60}}
              lineWidth='3px'
              width={lineChartWidth}    
              xValue={d=>new Date(d.date)}
              yValue={d=>d.value}
              yAxisTicks={6}
              yAxisFormat={d=>`$${numberWithCommas(d.toFixed(2))}`}
              displayTitle={`${assetId} Value in ${portfolioId}`}
              verticalMarkers={dividends}
              vertMarkerFormat={x=>`Dividends per share: ${x.dividends}`}

             />:
             <AssetLineChart
             ticker={assetId}  
             dynamicWidth={true}
             displayDiff={true}
             displayTitle={`${assetId} Price`}
             trackMouse={true}
             margin={{right:50,left:60,bottom:50,top:60}}
             lineWidth='3px'
             width={lineChartWidth}   
             quoteInterval='1d'
             yAxisTicks={6}
             yAxisFormat={d=>`$${numberWithCommas(d.toFixed(2))}`}
             endDate={new Date()}
             startDate={new Date(new Date().setFullYear(new Date().getFullYear()-1))}
             verticalMarkers={dividends}
             vertMarkerFormat={x=>`Dividends per share: ${x.dividends}`}
             />
             }

            </div>
          </div>
        <hr />
        <h4>
          Current Price: $
          {assetQuote ? assetQuote["regularMarketPrice"].toFixed(2) : "0.00"}
        </h4>
        < AssetTable data={transactions?transactions.transactions:[]} 
        mode={"Single Asset"}
         misc={{portfolioName:portfolioId,
          assetDisplay:`${assetId},${assetQuote?.shortName}`
        }} />
        {/* <ul className="list-group">
          {transactions &&
            transactions.transactions.map((t) => {
              let date = new Date(t.date);
              return (
                <li key={t["_id"]} className="list-group-item">
                  {t.ticker}|{t.type} |{t.quantity}|${t.price}|
                  {`${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`}
                </li>
              );
            })}
        </ul> */}
        <br />
        <br />
      </Container>
    </React.Fragment>
  );
};
