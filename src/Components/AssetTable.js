import { Button, TextField } from "@mui/material";
import React, { useState, useRef, useContext } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Transaction } from "../Components/Transactions/Transaction";
import { LineChart } from "../charts/LineChart";
import AssetTableCard from "./AssetTableCards";
import AssetTableCardForPortfolio from "./AssetTableCard_Portfolio";
import AssetTableCardForAsset from "./AssetTableCard_Asset"
import { TransactionButton } from './Transactions/TransactionButton';
import { UserContext } from "../util/context";

const AssetTable = ({ mode, data,misc }) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = React.useState(false);
  const {portfolios}=useContext(UserContext);
  let asset=null;
  //   const [individualPortfolioStats, setIndividualPortfolioStats] = useState(null);
  let assetTableTitle = "Portfolio Holdings";
  let buttonText = "ADD TRANSACTIONS";
  let searchLabel = "Search for your asset";
  let tableHeaders = [];
  if (mode === "Overall Portfolio") {
    //check table mode instead
    assetTableTitle = "Summary of Portfolios";
    buttonText = "ADD PORTFOLIO";
    searchLabel = "Search for portfolio";
    tableHeaders = [
      "Portfolio Name",
      "Chart",
      "Value",
      "Net PnL",
      "Net Return",
      "Volatility"
    ];
  } else if (mode === "Single Asset") {
    assetTableTitle = "Asset Transactions";
    buttonText = "ADD TRANSACTION";
    searchLabel = "Search for your asset";
    tableHeaders = ["Transaction", "Quantity", "Price", "Value", "Date"];
  } else {
    assetTableTitle = "Portfolio Holdings";
    buttonText = "ADD TRANSACTION";
    searchLabel = "Search for your asset";
    tableHeaders = [
      "Asset Name",
      "Chart",
      "Price",
      "Quantity",
      "Value",
      "Net PnL",
      "Net Return",
    ];
    
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = () => {
    if (mode === "Overall Portfolio") {
      return data.filter((p) =>
        p.portfolioName.toLowerCase().includes(search.toLowerCase())
      );
    } else if (mode === "Single Portfolio") {
      return data.filter(
        (p) =>
          p.shortName.toLowerCase().includes(search.toLowerCase()) ||
          p.symbol.toLowerCase().includes(search.toLowerCase())
      );
    } else if (mode === "Single Asset") {
      return data.filter(
          (p) => (p.price&&p.price.toString().includes(search)) || p.type.toLowerCase().includes(search.toLowerCase()) || (p.quantity&&p.quantity.toString().includes(search)) || (p.value&&p.value.toString().includes(search))
      );
    }
  };

  const rowHeight = 100;

  return (
    <div>
      <div
        className="assetTableHeader"
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "auto",
        }}
      >
        <div
          className="table-title-and-button"
        >
          <h2 className="assetTableTitle">
            {assetTableTitle}
          </h2>
          <TransactionButton 
          id="add-transaction-btn"
          asset={misc?.assetDisplay}
          buttonText={buttonText}/>
        </div>




        <div className="search-field">
          <TextField
            id="search-text-field"
            label={searchLabel}
            variant="outlined"
            sx={{
              paddingRight: "10px",
              margin: "10px",
              height: "auto",
              width: "100%",
              textAlign: "start",
              borderRadius: "25px",
            }}
            onChange={(input) => setSearch(input.target.value)}
          />
        </div>
      </div>

      <div className="table" style={{ margin: "0", padding: "0" }}>
        <div
          className="table-title"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            margin: "0px",
            height: "15px",
          }}
        >
          <div
            className="table-header-asset-name"
            style={{
              width: "35%",
              verticalAlign: "middle",
              margin: "auto",
              paddingLeft: "16px",
              color: "rgba(54, 56, 60, 0.8)",
            }}
          >
            {tableHeaders.shift()}
          </div>
          <div
            className="remaining-table-headers"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              fontSize: "14px",
              color: "rgba(54, 56, 60, 0.8)",
            }}
          >
            {tableHeaders.map((e,i) => {
              let hWidth="20%"
              let cName = "subTableHeader"
              if(e==="Chart"){
                hWidth="30%"}
                else if (e === "Price" || e==="Quantity" || e==="Volatility") {
                  cName = "subTableHeader low-priority"
                }
              return(<div
              key={i}
                className={cName}
                style={{
                  width: hWidth,
                  verticalAlign: "middle",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "0",
                  margin: "auto",
                  color: "rgba(54, 56, 60, 0.8)",
                }}
              >
                {e}
              </div>)
              }
            )}
            <div
              className="actionIcons"
              style={{
                width: "20%",
                verticalAlign: "middle",
                justifyContent: "center",
                textAlign: "right",
                padding: "0px 0px 0px 0px",
                margin: "auto",
                fontSize: "14px",
                color: "rgba(54, 56, 60, 0.8)",
              }}
            >
              {" "}
            </div>
          </div>
        </div>
        {data &&
          handleSearch().map((e , i) => {
            if (mode === "Overall Portfolio") {
              return <AssetTableCard content={e} key ={i} />;
            } else if (mode === "Single Portfolio") {
                return <AssetTableCardForPortfolio content={e} key ={i} portfolioName={misc.portfolioName}/>;
            } else if (mode === "Single Asset") {
                return <AssetTableCardForAsset content={e} key ={i} portfolioName={misc.portfolioName} />;
            }
          })}
      </div>
    </div>
  );
};

export default AssetTable;
