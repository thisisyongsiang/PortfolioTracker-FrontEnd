import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import DeleteIcon from "@mui/icons-material/Delete";
import { numberWithCommas } from "../util/util";
import {
  computeAssetNetReturn,
  computeAssetPnL,
} from "../util/financeComputations";
import { useNavigate } from "react-router-dom";
import { Tooltip, Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { deleteUserPortfolioOneAsset } from "../users/userApi";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../util/context";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Transaction } from "./Transactions/Transaction";
import DialogActions from "@mui/material/DialogActions";
import { AssetLineChart } from "../charts/AssetLineChart";

const AssetTableCardForPortfolio = ({ content, portfolioName }) => {
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const { userEmail, transactionTrigger, setTransactionTrigger } =
    useContext(UserContext);
  const chartTableWidth=useRef();
  //   const [open, setOpen] = React.useState(false);
  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let { quantity, regularMarketPrice, shortName, symbol, transactions, value } =
    content;

  let cardStyle = {
    width: "20%",
    verticalAlign: "middle",
    justifyContent: "center",
    textAlign: "center",
    padding: "0",
    margin: "auto",
    fontSize: "20px",
    fontSize: "1.2vw",
  };

  let { width, margin, ...cardStyleWithoutWidthOrMargin } = cardStyle;

  let netReturn = computeAssetNetReturn(
    transactions ? transactions.transactions : [],
    value
  );
  let netPnL = computeAssetPnL(
    transactions ? transactions.transactions : [],
    value
  );

  const routeChange = (path) => {
    navigate(path);
  };
  const handleDelete = () => {
    let confirmDelete =
      window.confirm(`Delete Asset : ${shortName} in ${portfolioName}}?
This action is not reversible!
    `);
    if (confirmDelete) {
      deleteUserPortfolioOneAsset(userEmail, portfolioName, symbol).then(() => {
        let trigger = !transactionTrigger;
        setTransactionTrigger(trigger);
      });
    }
  };
  return (
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
          // className="card-body mainName"
          style={{ width: "35%", verticalAlign: "middle", margin: "auto" , paddingLeft: "16px"}}
        >
          {shortName ? `${shortName} (${symbol})`: ""}
        </div>
        <div
          className="remainingHeaders"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <div className="subHeader" style={  {  
            width: "30%",
            verticalAlign: "middle",
            justifyContent: "left",
            padding: "0",}} 
            ref={chartTableWidth}>
          <AssetLineChart
             ticker={symbol}  
             displayDiff={true}
             dynamicWidth={true}
             trackMouse={false}
             margin={{right:10,left:10,bottom:10,top:10}}
             lineWidth='2px'
             width={chartTableWidth.current?chartTableWidth.current.offsetWidth:200}   
             height={80}   
             quoteInterval='1wk'
             yAxisTicks={0}
             yAxisFormat={d=>`$${numberWithCommas(d.toFixed(2))}`}
             endDate={new Date()}
             startDate={new Date(new Date().setFullYear(new Date().getFullYear()-1))}
             displayXTicks={false}
             displayYTicks={false}
             />
          </div>
          <div className="subHeader" style={{...cardStyle, fontWeight: "bold"}}>
            ${numberWithCommas(regularMarketPrice.toFixed(2))}
          </div>
          <div className="subHeader" style={{...cardStyle, fontWeight: "bold", paddingLeft: "2px"}}>
            {numberWithCommas(quantity.toFixed(1))}
          </div>
          <div className="subHeader" style={{...cardStyle, fontWeight: "bold", paddingLeft: "2px"}}>
            ${numberWithCommas(value.toFixed(2))}
          </div>
          <div className="subHeader" style={{...cardStyle, color: netPnL>0? "#2C7E12" : "red", fontWeight: "bold", paddingLeft: "2px"}}>
            {netPnL>0?`$${numberWithCommas(netPnL.toFixed(0))}`:`-$${numberWithCommas(netPnL.toFixed(0)*-1)}`}
          </div>
          <div className="subHeader" style={{...cardStyleWithoutWidthOrMargin, margin: "auto 0px auto 15px", width: "15%", color: netReturn>0? "#2C7E12" : "red", fontWeight: "bold"}}>
            {numberWithCommas(netReturn.toFixed(1))}%
          </div>

        <div
          className="actionIcons"
          style={{
            width: "20%",
            verticalAlign: "middle",
            justifyContent: "center",
            textAlign: "center",
            padding: "20px",
            margin: "auto",
          }}
        >
          <Tooltip title="Add Transaction">
            <AddCircleOutlineIcon
              id="addCardIcon"
              onClick={(e) => {
                e.stopPropagation();
                handleClickOpen();
              }}
            />
          </Tooltip>
          <Dialog
            open={open}
            onClick={(e) => e.stopPropagation()}
            onClose={handleClose}
          >
            <DialogContent>
              {" "}
              <Transaction closeFn={handleClose} />{" "}
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
          <Tooltip title="Delete Asset">
            <CancelIcon
              id="deleteCardIcon"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default AssetTableCardForPortfolio;
