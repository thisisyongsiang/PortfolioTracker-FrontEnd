import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { LineChart } from "../charts/LineChart";
import AssetTable from "../Components/AssetTable";
import PortfolioCharts from "../Components/PortfolioCharts";
import {
  getUserOverallPortfolioValue,
  getUserPortfolios,
} from "../users/userApi.js";
import { numberWithCommas } from "../util/util";
import CardWidget from "../Components/CardWidget";
=======
=======
>>>>>>> Stashed changes
import { getUserOverallPortfolioValue ,getUserPortfolioHistoricalValue,getUserPortfolios} from "../users/userApi.js";
import { numberWithCommas } from "../util/util";
import CardWidget from "../Components/CardWidget";
import AssetTable from "../Components/AssetTable";
import { LineChart } from "../charts/LineChart";
import { computeOverallPortfolioNetReturn } from "../util/financeComputations";

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
>>>>>>> Stashed changes

export const Overallpage = (user) => {
  const userData = user.user;
  const [pverallPfValue, setOverallPfValue] = useState(0);
  const [portfolios, setPortfolios] = useState([]);
  useEffect(() => {
    if (userData) {
      getUserPortfolios(userData.emailAddress).then((d) => {
        setPortfolios(d);
      });
      getUserOverallPortfolioValue(userData.emailAddress).then((d) => {
        setOverallPfValue(d);
      });
    }
  }, [userData]);

    let netReturn = computeOverallPortfolioNetReturn(portfolios, overallPfValue)

    let netReturn = computeOverallPortfolioNetReturn(portfolios, overallPfValue)

  return (
    <React.Fragment>
      <Container id="container">
        <div className="position-relative mt-2">
          <div>
            <h2>
              Portfolio Value:
              <br />${numberWithCommas(pverallPfValue.toFixed(2))}
            </h2>
          </div>
          <div className="position-absolute top-0 end-0">
            <div className="d-flex h-100 p-1">
              <CardWidget type="annReturn" />
              <CardWidget type="netReturn" value={netReturn.toFixed(1)}/>
              <CardWidget type="unrealisedPnL" />
              <CardWidget type="volatility" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <LineChart
              dynamicWidth={true}
              ticker="spy"
              displayDiff={false}
              margin={{ right: 50, left: 50, bottom: 50, top: 60 }}
              lineWidth="3px"
              width={1200}
              endDate={new Date()}
              startDate={
                new Date(new Date().setFullYear(new Date().getFullYear() - 1))
              }
            />
          </div>
        </div>
        <hr />
        <PortfolioCharts />
        <AssetTable />
      </Container>
    </React.Fragment>
  );
};
