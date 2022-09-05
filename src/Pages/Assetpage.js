import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/system";
import { LineChart } from "../charts/LineChart";
import AssetTable from "../Components/AssetTable";
import PortfolioCharts from "../Components/PortfolioCharts";
import {
  getOneUserPortfolioValue,
  getUserPortfolioAssetsTransactions,
  getUserPortfolioHistoricalValue,
  getUserPortfolioOneAssetHistoricalValue,
  getUserPortfolioOneAssetValue,
} from "../users/userApi.js";
import { numberWithCommas } from "../util/util";
import CardWidget from "../Components/CardWidget";
import { AssetLineChart } from "../charts/AssetLineChart";
import { getAssetQuote } from "../FinanceRoutes/financeAPI";
import {
  computeAssetNetReturn,
  computeAssetPnL,
  computeAnnualisedReturns,
  computeVolatility,
  computeAssetAnnualisedReturns,
} from "../util/financeComputations";

export const Assetpage = (user) => {
  const userData = user.user;
  const { assetId, portfolioId } = useParams();
  const [assetValue, setAssetValue] = useState(0);
  const [transactions, setTransactions] = useState(null);
  const [assetValueHistory, setAssetValueHistory] = useState([]);
  const [assetQuote, setAssetQuote] = useState(null);
  const lineChartContainer = useRef(null);
  const [lineChartWidth, setLineChartWidth] = useState(1000);

export const Assetpage=(user)=>{
  const userData=user.user;
  const {assetId,portfolioId}=useParams();
  const [assetValue,setAssetValue]=useState(0);
  const [transactions,setTransactions]=useState(null);
  const [assetValueHistory,setAssetValueHistory]=useState([]);
  const [assetQuote,setAssetQuote]=useState(null);
  const lineChartContainer=useRef(null);
  const [lineChartWidth,setLineChartWidth]=useState(1000);

  const[displayChartType,setDisplayChartType]=useState(true);

  const selectDisplay=useRef(null);
  useEffect(()=>{
    if(lineChartContainer.current){
      setLineChartWidth(lineChartContainer.current.offsetWidth);
    }
    if (userData && assetId && portfolioId) {
      getAssetQuote(assetId).then((q) => {
        setAssetQuote(q);
      });
      getUserPortfolioOneAssetHistoricalValue(
        userData.emailAddress,
        portfolioId,
        assetId,
        new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        new Date()
      ).then((d) => {
        setAssetValueHistory(d);
      });
      getUserPortfolioAssetsTransactions(
        userData.emailAddress,
        portfolioId,
        assetId
      ).then((d) => {
        setTransactions(d);
      });
      getUserPortfolioOneAssetValue(
        userData.emailAddress,
        portfolioId,
        assetId
      ).then((d) => {
        setAssetValue(d.value);
      });
    }
  }, [userData, assetId, portfolioId]);

  let backup_transactions = [] //temporary workaround for when transaction data is missing in between renders - need to find permanent fix
  let netReturn = computeAssetNetReturn(transactions?transactions.transactions:backup_transactions, assetValue)
  let netPnL = computeAssetPnL(transactions?transactions.transactions:backup_transactions, assetValue)
  let annualisedReturn = computeAssetAnnualisedReturns(transactions?transactions.transactions:backup_transactions, assetValue)
  let assetVolatility = computeVolatility(assetValueHistory)

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
  return (
    <React.Fragment>
      <Container id="assetPage">
        <div className="position-relative mt-2">
          <div>
          <h3 id="portfolioName">
            Portfolio {portfolioId}
          </h3>
            <h2>
              {assetQuote ? assetQuote["shortName"] : "Asset"} Value:
              <br />${numberWithCommas(assetValue.toFixed(2))}
            </h2>
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
              margin={{right:50,left:60,bottom:50,top:60}}
              lineWidth='3px'
              width={lineChartWidth}    
              xValue={d=>new Date(d.date)}
              yValue={d=>d.value}
              yAxisTicks={6}
              yAxisFormat={d=>`$${numberWithCommas(d.toFixed(2))}`}
              displayTitle={`${assetId} Value in ${portfolioId}`}
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
             />
             }

            </div>
          </div>
        <hr />
        <h4>
          Current Price: $
          {assetQuote ? assetQuote["regularMarketPrice"].toFixed(2) : "0.00"}
        </h4>
        {/* < AssetTable /> insert portfolio table herer!! */}
        <ul className="list-group">
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
        </ul>
      </Container>
    </React.Fragment>
  );
};
