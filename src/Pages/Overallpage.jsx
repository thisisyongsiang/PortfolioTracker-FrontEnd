import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import PortfolioCharts from "../Components/PortfolioCharts";
import {
  getUserOverallPortfolioValue,
  getUserPortfolios,
} from "../users/userApi.js";
import { numberWithCommas } from "../util/util";
import CardWidget from "../Components/CardWidget";

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
              <CardWidget type="netReturn" />
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
