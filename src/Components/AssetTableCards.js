import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CancelIcon from '@mui/icons-material/Cancel';
import { numberWithCommas } from "../util/util";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../util/context";
import { deleteUserPortfolio } from "../users/userApi";

const AssetTableCard = ({ content }) => {

  const [deleted,setDeleted]=useState(false);
  const {userEmail,portfolios,updatePortfolio}=useContext(UserContext);
  const handleDelete=()=>{
    let confirmDelete=window.confirm(`Delete portfolio : ${content.portfolioName}?
This action is not reversible!
    `)
    if(confirmDelete){  
      let index=portfolios.indexOf(content.portfolioName);
      portfolios.splice(index,1);
      if(index>=portfolios.length){
        index-=1;
      }
      deleteUserPortfolio(userEmail,content.portfolioName).then(
        ()=>{
          updatePortfolio([...portfolios]);
          setDeleted(true);
        }
      );
    }
  }

  let navigate = useNavigate()
  const routeChange = (path) => {
    navigate(path);
  }
  
  let cardStyle = {
    width: "20%",
    verticalAlign: "middle",
    justifyContent: "center",
    textAlign: "center",
    padding: "0",
    margin: "auto",
    fontSize: "20px"
  };
  return (
      deleted?<></>:
      <div
        className="card mx-1"
        onClick={() => routeChange(content.route)}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          margin: "10px",
          background: "#F1F1F1",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 15px",
          borderRadius: "10px",
          cursor: "pointer"
        }}
      >
        
        <div
          className="card-body mainName"
          style={{ width: "40%", verticalAlign: "middle", margin: "auto" , paddingLeft: "16px"}}
        >
          {content.portfolioName ? content.portfolioName : ""}

        </div>
        <div
          className="remainingHeaders"
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <div className="subHeader" style={cardStyle}>
            Chart Placeholder
          </div>
          <div className="subHeader" style={{...cardStyle, color: content.value>0? "#2C7E12" : "red", fontWeight: "bold"}}>
            ${numberWithCommas(content.value.toFixed(0))}
          </div>
          <div className="subHeader" style={{...cardStyle, color: content.netPnL>0? "#2C7E12" : "red", fontWeight: "bold"}}>
            ${numberWithCommas(content.netPnL.toFixed(0))}
          </div>
          <div className="subHeader" style={{...cardStyle, color: content.netReturn>0? "#2C7E12" : "red", fontWeight: "bold"}}>
            {content.netReturn.toFixed(1)}%
          </div>

          <div
            className="actionIcons"
            style={{
              width: "20%",
              verticalAlign: "middle",
              justifyContent: "center",
              textAlign: "right",
              padding: "20px",
              margin: "auto",
            }}
          >
            <ArrowCircleRightIcon />
            <Tooltip title="Delete Portfolio">
            <CancelIcon id="deleteCardIcon" onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}/>
            </Tooltip>

          </div>
        </div>
      </div>

  );
};

export default AssetTableCard;
