import React, { useEffect, useRef, useState } from "react";
import { Container } from "@mui/system";
import { LineChart } from "../charts/LineChart";
import AssetTable from "../Components/AssetTable";
import PortfolioCharts from "../Components/PortfolioCharts";

export const Overallpage=()=>{


    return(
        <React.Fragment>
            <Container id='container' >
            <div className="row">
              <div className="col">
                
              <h2>Portfolio Value:
                <br />
                $40,000
              </h2>
              <br />

              <LineChart 
              dynamicWidth={true}
              ticker="spy"
              displayDiff={false}
                margin={{right:50,left:50,bottom:50,top:50}}
                lineWidth='3px'
                width={1200}
               endDate={new Date()} startDate={new Date(new Date().setFullYear(new Date().getFullYear()-1))}/>

              </div>
            </div>
          <hr />
          < PortfolioCharts />
          < AssetTable />
          </Container>
        </React.Fragment>
    )

}