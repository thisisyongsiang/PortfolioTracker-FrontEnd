import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { numberWithCommas } from "../util/util";
import { computeAssetNetReturn, computeAssetPnL } from "../util/financeComputations";
import { useNavigate } from "react-router-dom";

const AssetTableCardForPortfolio = ({ content }) => {
//   const [open, setOpen] = React.useState(false);
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

let {quantity, regularMarketPrice, shortName, symbol, transactions, value} = content

  let cardStyle = {
    width: "20%",
    verticalAlign: "middle",
    justifyContent: "center",
    textAlign: "center",
    padding: "0",
    margin: "auto",
    fontSize: "20px",
    fontSize: "1.2vw"
  };

  let {width, margin, ...cardStyleWithoutWidthOrMargin} = cardStyle

  let netReturn = computeAssetNetReturn(transactions?transactions.transactions:[], value)
  let netPnL = computeAssetPnL(transactions?transactions.transactions:[], value)

  let navigate = useNavigate()
  const routeChange = (path) => {
      navigate(path)
  }

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
          className="card-body mainName"
          style={{ width: "40%", verticalAlign: "middle", margin: "auto" , paddingLeft: "16px"}}
        >
          {shortName ? `${shortName} (${symbol})`: ""}
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

export default AssetTableCardForPortfolio;
