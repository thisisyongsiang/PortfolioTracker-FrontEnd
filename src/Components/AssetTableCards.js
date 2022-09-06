import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Transaction } from "../Components/Transactions/Transaction";
import CancelIcon from "@mui/icons-material/Cancel";
import { numberWithCommas } from "../util/util";


const AssetTableCard = ({ content }) => {
//   const [open, setOpen] = React.useState(false);
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

  let cardStyle = {
    width: "20%",
    verticalAlign: "middle",
    justifyContent: "center",
    textAlign: "right",
    padding: "0",
    margin: "auto",
  };
  return (
    
      <div
        className="card mx-1"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          margin: "10px",
          background: "#F1F1F1",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 15px",
        //   backgroundImage: "linear-gradient(to bottom, #F1F1F1, #C1C1C1)",
          borderRadius: "10px",
        }}
      >
        <div
          className="card-body mainName"
          style={{ width: "20%", verticalAlign: "middle", margin: "auto" }}
        >
          {content.portfolioName ? content.portfolioName : ""}
        </div>
        <div
          className="remainingHeaders"
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "end",
            alignContent: "center",
          }}
        >
          <div className="subHeader" style={cardStyle}>
            Chart Placeholder
          </div>
          <div className="subHeader" style={{...cardStyle, color: content.value>0? "#2C7E12" : "red"}}>
            ${numberWithCommas(content.value.toFixed(0))}
          </div>
          <div className="subHeader" style={{...cardStyle, color: content.netPnL>0? "#2C7E12" : "red"}}>
            ${numberWithCommas(content.netPnL.toFixed(0))}
          </div>
          <div className="subHeader" style={{...cardStyle, color: content.netReturn>0? "#2C7E12" : "red"}}>
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
            <AddCircleOutlineIcon />
            <ArrowCircleRightIcon />
          </div>
        </div>
      </div>
      

  );
};

export default AssetTableCard;
