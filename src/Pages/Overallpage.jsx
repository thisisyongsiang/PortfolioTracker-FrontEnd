import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import { LineChart } from "../charts/LineChart";
import AssetTable from "../Components/AssetTable";
import PortfolioCharts from "../Components/PortfolioCharts";
import {
  getUserOverallPortfolioValue,
  getUserPortfolios,
} from "../users/userApi.js";
import { numberWithCommas } from "../util/util";

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
        <div className="position-relative">
          <div>
            <h2>
              Portfolio Value:
              <br />${numberWithCommas(pverallPfValue.toFixed(2))}
            </h2>
          </div>
          <div className="position-absolute top-0 end-0">
            <div className="d-flex h-100 p-1">
              <div className="card mx-1">
                <div className="card-body">
                  <h5 className="card-title">5%</h5>
                  <h6 className="card-subtitle text-muted">Ann. Return</h6>
                </div>
              </div>
              <div className="card mx-1">
                <div className="card-body">
                  <h5 className="card-title">5%</h5>
                  <h6 className="card-subtitle text-muted">Net. Return</h6>
                </div>
              </div>
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
