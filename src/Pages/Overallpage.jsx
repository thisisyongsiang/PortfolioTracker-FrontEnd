import React, { useEffect, useState,useRef } from "react";
import { Container } from "@mui/system";
import PortfolioCharts from "../Components/PortfolioCharts";
import { getPortfolioAllStats, getUserOverallPortfolioValue ,getUserPortfolioHistoricalValue,getUserPortfolios} from "../users/userApi.js";
import { numberWithCommas } from "../util/util";
import CardWidget from "../Components/CardWidget";
import { LineChart } from "../charts/LineChart";
import CryptoTable from "../Components/Tables/CryptoTable";
import UseTable from "../Components/Tables/UseTable"


export const Overallpage=(user)=>{
    const userData=user.user;
    const [overallPfValue,setOverallPfValue]=useState(0);
    const [portfolios,setPortfolios]=useState([]);
    const [portfoliosHistory,setportfoliosHistory]=useState([]);
    const lineChartContainer=useRef(null);
    const [lineChartWidth,setLineChartWidth]=useState(1000);
    const [tableData, setTableData] = useState([]);
    const tableHeaders = ["Portfolio", "Total Holding", "PNL", "Ann. Return"];

    
    // const fetchData = async (userData) => {
    //   const {data} = await getPortfolioAllStats(userData.emailAddress);
    //   setTableData(data); 
    // }

    // console.log(tableData);

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
        getPortfolioAllStats(userData.emailAddress).then(d => 
          {setTableData(d)});

      }
    },[userData]);

    // outcome from figma spec: 
    // name, 
    // total value of EACH portfolio (), -- reduce
    // pnl, --> | reduce / sum all transactions - qty*current price (?) |
    // % of overall portfolio, -- indiv. / overall + "%"
    
    // possible steps:
    // 1. within useeffect, fetch all api, and pass result into object, and into setstate
    // 2. map into row cells  

  return (
    <React.Fragment>
      <Container id="container">
        <div className="position-relative mt-2">
          <div>
            <h2>
              Portfolio Value:
              <br />${numberWithCommas(overallPfValue.toFixed(2))}
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
          <div className="col p-0" ref={lineChartContainer}>
            <LineChart
                data={portfoliosHistory}
                dynamicWidth={true}
                displayDiff={false}
                margin={{right:50,left:50,bottom:50,top:60}}
                lineWidth='3px'
                width={lineChartWidth}    
                xValue={d=>new Date(d.date)}
                yValue={d=>d.value}
                yAxisTicks={6}
                displayTitle="OverallPortfolio"
               />

              </div>
            </div>
          <hr />

          <UseTable data = {tableData} header = {tableHeaders} />
          {/* < PortfolioCharts /> */}
          {/* < CryptoTable /> */}
        
          </Container>
        </React.Fragment>
    )

}