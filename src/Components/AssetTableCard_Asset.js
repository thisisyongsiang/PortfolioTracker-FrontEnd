import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CancelIcon from '@mui/icons-material/Cancel';
import { numberWithCommas } from "../util/util";
import { computeAssetNetReturn, computeAssetPnL } from "../util/financeComputations";
import { Tooltip } from "@mui/material";
import { deleteUserPortfolioTransaction } from "../users/userApi";
import { useContext } from "react";
import { UserContext } from "../util/context";

const AssetTableCardForAsset = ({ content,portfolioName }) => {
//   const [open, setOpen] = React.useState(false);
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
const {userEmail,transactionTrigger,setTransactionTrigger}=useContext(UserContext);
let {date, price, quantity, value, ticker, type} = content;
const handleDelete=()=>{
  let confirmDelete=window.confirm(`Delete Transaction : ${ticker}: ${type} | ${new Date(date).toDateString()}?
This action is not reversible!
  `)
  if(confirmDelete){  
    deleteUserPortfolioTransaction(userEmail,portfolioName,type,content).then(
      ()=>{
        let trigger=!transactionTrigger;
        setTransactionTrigger(trigger);
      }
    );
  }
}
  let cardStyle = {
    width: "20%",
    verticalAlign: "middle",
    justifyContent: "center",
    textAlign: "center",
    padding: "0",
    margin: "auto",
    fontSize: "20px",
    fontSize: "1.5vw"
  };

  let {width, margin, ...cardStyleWithoutWidthOrMargin} = cardStyle

  const dateFormat = new Date(date)

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
          borderRadius: "10px",
        }}
      >
        <div
          // className="card-body mainName"
          style={{ width: "35%", verticalAlign: "middle", margin: "auto" , paddingLeft: "16px", fontWeight: "bold", color: type==="buy"? "#2C7E12" : (type==="sell"? "red": "black")}}
        >
          {type ? type.toUpperCase() : ""}
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
          <div className="subHeader" style={{...cardStyle, fontWeight: "bold"}}>
            {quantity?numberWithCommas(quantity.toFixed(1)):"NA"}
          </div>
          <div className="subHeader" style={{...cardStyle, fontWeight: "bold", paddingLeft: "2px"}}>
            {price?`$${numberWithCommas(price.toFixed(2))}`:"NA"}
          </div>
          <div className="subHeader" style={{...cardStyle, fontWeight: "bold", paddingLeft: "2px"}}>
            {value?`$${numberWithCommas(value.toFixed(2))}`:"NA"}
          </div>
          <div className="subHeader" style={{...cardStyle, fontWeight: "bold", paddingLeft: "2px"}}>
            {`${dateFormat.getDate()}/${dateFormat.getMonth()+1}/${dateFormat.getFullYear()}`}
          </div>

          <div
            className="actionIcons"
            style={{
              width: "20%",
              verticalAlign: "middle",
              justifyContent: "center",
              textAlign: "right",
              padding: "20px",
              margin: "0",
            }}
          >
            <Tooltip title="Delete Transaction">
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

export default AssetTableCardForAsset;
