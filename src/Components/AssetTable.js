import {
  Button,
  TextField,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  LinearProgress,
  Paper,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, componentDidMount } from "react";
import { CoinList } from "../Config/api";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CancelIcon from "@mui/icons-material/Cancel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Transaction } from "../Components/Transactions/Transaction";
import { numberWithCommas } from "../util/util";
import { AssetLineChart } from "../charts/AssetLineChart";
import { useParams } from "react-router-dom";
import {
  computePortfolioNetReturn,
  computePortfolioPnL,
} from "../util/financeComputations";
import {
  getOneUserPortfolioValue,
  getUserPortfolioHistoricalValue,
} from "../users/userApi";
import { LineChart } from "../charts/LineChart";
import AssetTableCard from "./AssetTableCards";

const AssetTable = ({ currURL, portfolioId, assetId, content, mode }) => {
  const [asset, setAsset] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [open, setOpen] = React.useState(false);
  //   const [assetTableTitle, setAssetTableTitle] = useState("")
  //   const [buttonText, setButtonText] = useState("")
  //   const [searchLabel, setSearchLabel] = useState("")
  //   const [tableHeaders, setTableHeaders] = useState([])
  //   const [tableMode, setTableMode] = useState("Overall Portfolio")
  const [individualPortfolioStats, setIndividualPortfolioStats] = useState([]);
  const [pfVal, setPfVal] = useState(null);
  const [chartData, setChartData] = useState([]);

  let assetTableTitle = "Portfolio Holdings";
  let buttonText = "ADD TRANSACTIONS";
  let searchLabel = "Search for your asset";
  let tableHeaders = [];
  let tableMode = "";

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
  } else if (mode === "Single Portfolios") {
    assetTableTitle = `Asset Transactions`;
    buttonText = "ADD TRANSACTION";
    searchLabel = "Search for your asset";
    tableHeaders = ["Asset Name", "Chart", "Value", "Net Pnl", "Net Return"];
  } else {
    assetTableTitle = "Portfolio Holdings";
    buttonText = "ADD TRANSACTION";
    searchLabel = "Search for your asset";
    tableHeaders = ["Transaction", "Quantity", "Price", "Date"];
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchAsset = async () => {
    setLoading(true);

    const { data } = await axios.get(CoinList("USD"));

    setAsset(data.splice(0, 10));
    setLoading(false);
  };

  useEffect(() => {
    (async function () {
      if (mode === "Overall Portfolio") {
        let individualPfStats = [];

        for (let portfolio of content.portfolios) {
          let pfValue;
          let chartData;

          pfValue = await getOneUserPortfolioValue(
            content.userData.emailAddress,
            portfolio.portfolio
          );
          chartData = await getUserPortfolioHistoricalValue(
            content.userData.emailAddress,
            portfolio.portfolio,
            new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
            // startDate,
            new Date()
          );
          individualPfStats.push({
            value: pfValue,
            netPnL: computePortfolioPnL([portfolio], pfValue),
            netReturn: computePortfolioNetReturn([portfolio], pfValue),
            portfolioName: portfolio.portfolio,
            portfolioHistory: chartData,
          });
        }
        setIndividualPortfolioStats(individualPfStats);
      } else {
      }
    })();
  }, [currURL, portfolioId, assetId]);

  const handleSearch = () => {
    if (mode === "Overall Portfolio") {
      return individualPortfolioStats.filter((p) => p.portfolioName.toLowerCase().includes(search.toLowerCase()));
    } else {
      return individualPortfolioStats;
    }
  };

  console.log(mode)
  console.log(mode === "Overall Portfolio")

  const rowHeight = 100;

  return (
    <div>
      {console.log(individualPortfolioStats)}
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

          <Button
            variant="contained"
            style={{
              paddingRight: "10px",
              marginRight: "10px",
              height: "50%",
              justifyContent: "right",
              backgroundImage:
                "linear-gradient(to bottom right, #2858FE, #7B1DFF)",
              borderRadius: "10px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleClickOpen}
          >
            {" "}
            {buttonText}{" "}
          </Button>
        </div>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Transactions</DialogTitle>
          <DialogContent>
            {" "}
            <Transaction />{" "}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} startIcon={<CancelIcon />}>
              {" "}
            </Button>
          </DialogActions>
        </Dialog>

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
            margin: "10px",
            height: "15px",
          }}
        >
          <div
            className="card-body mainName"
            style={{
              width: "20%",
              verticalAlign: "middle",
              margin: "auto",
              fontSize: "14px",
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
        {handleSearch().map((e) => (
          <AssetTableCard content={e} />
        ))}
      </div>
    </div>
  );
};

export default AssetTable;
