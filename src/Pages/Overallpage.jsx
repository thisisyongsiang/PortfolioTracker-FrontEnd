import React, { useEffect, useRef, useState } from "react";
import { Container } from "@mui/system";
import PortfolioCharts from "../Components/PortfolioCharts";
import AssetTable from "../Components/AssetTable";

export const Overallpage=()=>{


    return(
        <React.Fragment>
            <Container id='container' >
            < PortfolioCharts />  
          <hr />
          < AssetTable />
          </Container>
        </React.Fragment>
    )

}