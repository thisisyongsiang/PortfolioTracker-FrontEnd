import React, { useEffect, useState,useRef } from "react";
import {useNavigate, useParams} from "react-router-dom"
import { Container } from "@mui/system";
import { LineChart } from "../charts/LineChart";
import AssetTable from "../Components/AssetTable";
import PortfolioCharts from "../Components/PortfolioCharts";
import { getOneUserPortfolioValue ,getUserPortfolioAssets,getUserPortfolioHistoricalValue, getUserPortfolioAllAssetTableStats, deleteUserPortfolio} from "../users/userApi.js";
import { numberWithCommas } from "../util/util";
import CardWidget from "../Components/CardWidget";
import { getUserOnePortfolio } from "../users/userApi.js";
import { BsFillTrashFill,BsFillGearFill } from "react-icons/bs";
import {Navigate} from "react-router-dom";
import { computePortfolioPnL, computePortfolioNetReturn, computePortfolioAnnualisedReturns, computeVolatility } from "../util/financeComputations";
import { Link } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../util/context";
export const PortfolioPage=()=>{
  const{userEmail,portfolios,updatePortfolio,transactionTrigger}=useContext(UserContext);
  const {portfolioId}=useParams();
  const lineChartContainer=useRef(null);
  const [allAssetTableStats, setAllAssetTableStats] = useState(null)
  const[anchorEl,setAnchorEl]=useState(null);
  const navigate=useNavigate();
  const[{portfolio,portfoliosHistory,lineChartWidth,pfValue},setPfObject]=useState({portfolio:[],
    portfoliosHistory:null,
    lineChartWidth:1000,
    pfValue:0});

  const open=!!anchorEl;
  const handleSettingsClicked=(e)=>{
    setAnchorEl(e.target);
  };
  const handleSettingsClose=()=>{
    setAnchorEl(null);
  }

  const onDeletePortfolio=()=>{
    let confirmDelete=window.confirm(`Delete portfolio : ${portfolioId}?
    This action is not reversible!
    `)
    if (confirmDelete){
      let index=portfolios.indexOf(portfolioId);
      portfolios.splice(index,1);
      if(index>=portfolios.length){
        index-=1;
      }
      deleteUserPortfolio(userEmail,portfolioId).then(
        ()=>{
          updatePortfolio(portfolios);
          if (index>=0){
            navigate(`/portfolio/${portfolios[index]}`,{replace:true});
          }
          else{
            navigate(`/overall`,{replace:true});
          }
        }
      );
    }
  }
  const onEditPortfolio=()=>{
  }
  useEffect(()=>{
    if (userEmail && portfolioId){
    (async()=>{
      console.log('run');
      let lineWidth=1000;
      if(lineChartContainer.current){
        lineWidth=lineChartContainer.current.offsetWidth;
      }
      // let startDate=new Date(new Date().setDate(new Date().getDate()-15));
      let pfHist = await getUserPortfolioHistoricalValue(userEmail,portfolioId,
        new Date(new Date().setFullYear(new Date().getFullYear()-1)),
          // startDate,
        new Date()
      );

      let pfVal=await getOneUserPortfolioValue(userEmail,portfolioId)
      let portfolio = await getUserOnePortfolio(userEmail,portfolioId)

      setPfObject({portfolio:portfolio,
        portfoliosHistory:pfHist,
        lineChartWidth:lineWidth,
        pfValue:pfVal
      })
    })()
      
      getUserPortfolioAllAssetTableStats(
        userEmail,
        portfolioId
      )
      .then(assets => {
        setAllAssetTableStats(assets)
      })
    }
  },[userEmail,portfolioId,transactionTrigger]);
  let portfolioExists=false;

let netReturn = 0;
let netPnL = 0;
let annualisedReturn = 0;
let portfolioVolatility = 0;
if(portfolios.includes(portfolioId)){
  portfolioExists=true;
  if (portfolio && pfValue){
   netReturn = computePortfolioNetReturn(portfolio, pfValue)
   netPnL = computePortfolioPnL(portfolio, pfValue)
   annualisedReturn = computePortfolioAnnualisedReturns(portfolio, pfValue)
   portfolioVolatility = computeVolatility(portfoliosHistory)
}
}

return (
  <React.Fragment>
    {portfolioExists&&
    <Container id="container">
      <div className="position-relative mt-2">
        <div>
          <h2>
            {portfolioId}
            <br />
          </h2>
        <h3>
            Portfolio Value:
            <br />${numberWithCommas(pfValue.toFixed(2))}
        </h3>

        </div>
        
        <div className="position-absolute top-0 end-0">
          <div className="d-flex h-100 p-1">
            <CardWidget type="annReturn" value={annualisedReturn.toFixed(1)}/>
            <CardWidget type="netReturn" value={netReturn.toFixed(1)}/>
            <CardWidget type="netPnL" value={netPnL.toFixed(0)}/>
            <CardWidget type="volatility" value={portfolioVolatility.toFixed(1)}/>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col p-0" ref={lineChartContainer}>
          <LineChart
              data={portfoliosHistory}
              dynamicWidth={true}
              displayDiff={true}
              margin={{right:50,left:70,bottom:50,top:60}}
              lineWidth='3px'
              width={lineChartWidth}    
              xValue={d=>new Date(d.date)}
              yValue={d=>d.value}
              yAxisTicks={6}
              displayTitle={portfolioId}
              yAxisFormat={d=>`$${numberWithCommas(d.toFixed(2))}`}
             />

            </div>
          </div>
        <hr />
        <div className="d-flex flex-row-reverse p-2">
          <div className="dropdown">
          <BsFillGearFill 
          onClick={handleSettingsClicked} 
          style={{cursor:'pointer'}} 
          id="setting-button"
          aria-controls={open ? 'setting-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          />
          <Menu id="setting-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleSettingsClose}
          onClick={handleSettingsClose}
          MenuListProps={{
            'aria-labelledby': 'setting-button',
          }}
          >
          <MenuItem onClick={onEditPortfolio}>Edit Portfolio</MenuItem>
          <MenuItem onClick={onDeletePortfolio}>Delete Portfolio</MenuItem>

          </Menu>
          </div>
        </div>

        {/* <ul className="list-group">
          {pfAssets.map(asset=>{
            return(
              <li   key={asset.symbol} className="list-group-item">
                <Link to={asset.route} className='w-100'>
              {asset.shortName}
                </Link>
            </li>
            )
          })}

        </ul> */}
        < AssetTable data={allAssetTableStats} mode="Single Portfolio"/>
        </Container>
}
      </React.Fragment>
  )

}