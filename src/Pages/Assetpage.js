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

  useEffect(() => {
    if (lineChartContainer.current) {
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

  let netReturn = computeAssetNetReturn(transactions?transactions.transactions:[], assetValue)
  let netPnL = computeAssetPnL(transactions?transactions.transactions:[], assetValue)
  let annualisedReturn = computeAssetAnnualisedReturns(transactions?transactions.transactions:[], assetValue)
  let assetVolatility = computeVolatility(assetValueHistory)

  return (
    <React.Fragment>
      <Container id="container">
        <div className="position-relative mt-2">
          <div>
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
        <div className="row">
          <div className="col p-0" ref={lineChartContainer}>
            <LineChart
              data={assetValueHistory}
              dynamicWidth={true}
              displayDiff={true}
              margin={{ right: 50, left: 50, bottom: 50, top: 60 }}
              lineWidth="3px"
              width={lineChartWidth}
              xValue={(d) => new Date(d.date)}
              yValue={(d) => d.value}
              yAxisTicks={6}
              displayTitle={`${assetId} Value in ${portfolioId}`}
            />
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
