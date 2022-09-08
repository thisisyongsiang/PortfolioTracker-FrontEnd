import { Button, TextField } from "@mui/material";
import React, { useState, useRef } from "react";
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

const AssetTable = ({ mode, data }) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = React.useState(false);
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
    ];
  } else if (mode === "Single Asset") {
    assetTableTitle = "Asset Transactions";
    buttonText = "ADD TRANSACTION";
    searchLabel = "Search for your asset";
    tableHeaders = ["Transaction", "Quantity", "Price", "Date"];
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
          (p) => p.price.toString().includes(search) || p.type.toLowerCase().includes(search.toLowerCase()) || p.quantity.toString().includes(search)
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
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 className="assetTableTitle" style={{ paddingTop: "5px" }}>
            {assetTableTitle}
          </h2>
          <TransactionButton 
          
          buttonText={buttonText}/>
        </div>




        <div>
          <TextField
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
            className="card-body mainName"
            style={{
              width: "40%",
              verticalAlign: "middle",
              margin: "auto",
              fontSize: "14px",
              paddingLeft: "16px",
              color: "rgba(54, 56, 60, 0.8)",
            }}
          >
            {tableHeaders.shift()}
          </div>
          <div
            className="remainingHeaders"
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              paddingLeft: "5px",
              fontSize: "14px",
              color: "rgba(54, 56, 60, 0.8)",
            }}
          >
            {tableHeaders.map((e) => (
              <div
                className="subHeader"
                style={{
                  width: "20%",
                  verticalAlign: "middle",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "0",
                  margin: "auto",
                  fontSize: "14px",
                  color: "rgba(54, 56, 60, 0.8)",
                }}
              >
                {e}
              </div>
            ))}
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
          handleSearch().map((e) => {
            if (mode === "Overall Portfolio") {
              return <AssetTableCard content={e} />;
            } else if (mode === "Single Portfolio") {
                return <AssetTableCardForPortfolio content={e} />;
            } else if (mode === "Single Asset") {
                return <AssetTableCardForAsset content={e} />;
            }
          })}
      </div>
    </div>
  );
};

export default AssetTable;
