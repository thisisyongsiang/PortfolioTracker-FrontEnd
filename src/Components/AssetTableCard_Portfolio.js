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
import { useContext, useState } from "react";
import { UserContext } from "../util/context";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Transaction } from "./Transactions/Transaction";
import DialogActions from "@mui/material/DialogActions";

const AssetTableCardForPortfolio = ({ content, portfolioName }) => {
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const { userEmail, transactionTrigger, setTransactionTrigger } =
    useContext(UserContext);
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
        cursor: "pointer",
      }}
    >
      <div
        className="card-body mainName"
        style={{
          width: "40%",
          verticalAlign: "middle",
          margin: "auto",
          paddingLeft: "16px",
        }}
      >
        {shortName ? `${shortName} (${symbol})` : ""}
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
        <div className="subHeader" style={{ ...cardStyle, fontWeight: "bold" }}>
          ${numberWithCommas(regularMarketPrice.toFixed(2))}
        </div>
        <div
          className="subHeader"
          style={{ ...cardStyle, fontWeight: "bold", paddingLeft: "2px" }}
        >
          {numberWithCommas(quantity.toFixed(1))}
        </div>
        <div
          className="subHeader"
          style={{ ...cardStyle, fontWeight: "bold", paddingLeft: "2px" }}
        >
          ${numberWithCommas(value.toFixed(2))}
        </div>
        <div
          className="subHeader"
          style={{
            ...cardStyle,
            color: netPnL > 0 ? "#2C7E12" : "red",
            fontWeight: "bold",
            paddingLeft: "2px",
          }}
        >
          {netPnL > 0
            ? `$${numberWithCommas(netPnL.toFixed(0))}`
            : `-$${numberWithCommas(netPnL.toFixed(0) * -1)}`}
        </div>
        <div
          className="subHeader"
          style={{
            ...cardStyleWithoutWidthOrMargin,
            margin: "auto 0px auto 15px",
            width: "15%",
            color: netReturn > 0 ? "#2C7E12" : "red",
            fontWeight: "bold",
          }}
        >
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
