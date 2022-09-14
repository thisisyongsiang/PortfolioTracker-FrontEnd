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
import { Button, Dialog, DialogContent, Menu, MenuItem } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../util/context";
import { EditPortfolioForm } from "../Components/Transactions/EditPortfolioForm";
import { MultiLineChart } from "../charts/MulitLineChart";


export const PortfolioPage=()=>{
  const{userEmail,portfolios,updatePortfolio,transactionTrigger}=useContext(UserContext);
  const {portfolioId}=useParams();
  const navigate=useNavigate();


  const lineChartContainer=useRef(null);
  const [allAssetTableStats, setAllAssetTableStats] = useState(null)
  const[anchorEl,setAnchorEl]=useState(null);
  const [openEditDialog,setOpenEditDialog]=useState(false);
  const selectDisplay=useRef(null);
  const[displayChartType,setDisplayChartType]=useState("overallValue");

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
  const handleCloseEditDialog=()=>{
    setOpenEditDialog(false);
  }
  const onEditPortfolioClicked=()=>{
    setOpenEditDialog(true);
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
          updatePortfolio([...portfolios]);
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
  useEffect(()=>{
    console.log(portfolios);
    if (userEmail && portfolioId && portfolios){
      
        if(!portfolios.includes(portfolioId)){
          navigate('/');
          return;
        }

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
        let assetsWithRoutes = assets.map((a) => {
          return {...a, route: `/portfolio/${portfolioId}/${a.symbol}`}
        })
        setAllAssetTableStats(assetsWithRoutes)
      })
    }
  },[userEmail,portfolioId,transactionTrigger,portfolios]);
  let portfolioExists=false;

let netReturn = 0;
let netPnL = 0;
let annualisedReturn = 0;
let portfolioVolatility = 0;
if(portfolios?.includes(portfolioId)){
  portfolioExists=true;
  if (portfolio && pfValue){
   netReturn = computePortfolioNetReturn(portfolio, pfValue)
   netPnL = computePortfolioPnL(portfolio, pfValue)
   annualisedReturn = computePortfolioAnnualisedReturns(portfolio, pfValue)
   portfolioVolatility = computeVolatility(portfoliosHistory)
}
}

const handleChangeDisplay=(e)=>{   
  for(let child of selectDisplay.current.childNodes){
    if(child===e.target){
      child.classList.add("bactive");
    }
    else{
      child.classList.remove("bactive");
    }
  }
  if (e.target.id==='overallValue'){
    setDisplayChartType("overallValue");
  }
  else{
    setDisplayChartType("allAssets");
  }
 };
return (
  <React.Fragment>
    {portfolioExists&&
    <Container id="container" maxWidth={false}>
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
      {/* <div className="d-grid col-3" ref={selectDisplay}>
        <button  className="btn btn-light me-1 bdisplay bactive" id="overallValue" onClick={handleChangeDisplay}>
          Portfolio Value
        </button>    
        <button className="btn btn-light me-1 bdisplay" id="allAssets"  onClick={handleChangeDisplay}>
          Display all Asset Value
        </button>    
      </div> */}
      <div className="row">
        <div className="col p-0" ref={lineChartContainer}>
          {displayChartType==="overallValue"&&
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
    }

            </div>
            
          </div>
        <hr />
        <div className="d-flex flex-row" style={{alignItems: "center", margin: "auto"}}>
          <div className="dropdown">
          <BsFillGearFill 
          onClick={handleSettingsClicked} 
          style={{cursor:'pointer', color: "#3c158c"}}
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
          <MenuItem onClick={onEditPortfolioClicked}>Edit Portfolio Name</MenuItem>
          <MenuItem onClick={onDeletePortfolio}>Delete Portfolio</MenuItem>

          </Menu>
          </div>
          <div style={{marginLeft: "5px", color: "gray", fontSize: '1.02vw'}}>Edit/Delete Portfolio</div>
        </div>


        < AssetTable data={allAssetTableStats} mode="Single Portfolio" misc={{portfolioName:portfolioId}}/>
        {openEditDialog&&
        <EditPortfolioForm 
        closeFn={handleCloseEditDialog} 
        open={openEditDialog}
        portfolioId={portfolioId}/>
}       
       <br />
        <br />
        </Container>

}
      </React.Fragment>
  )

}