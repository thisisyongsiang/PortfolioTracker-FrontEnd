import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { numberWithCommas } from "../util/util";
import { computeAssetNetReturn, computeAssetPnL } from "../util/financeComputations";

const AssetTableCardForAsset = ({ content }) => {
//   const [open, setOpen] = React.useState(false);
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

let {date, price, quantity, ticker, type} = content

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
          className="card-body mainName"
          style={{ width: "40%", verticalAlign: "middle", margin: "auto" , paddingLeft: "16px", fontWeight: "bold", color: type==="buy"? "#2C7E12" : "red"}}
        >
          {type ? type.toUpperCase() : ""}
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
          <div className="subHeader" style={{...cardStyle, fontWeight: "bold"}}>
            {numberWithCommas(quantity.toFixed(1))}
          </div>
          <div className="subHeader" style={{...cardStyle, fontWeight: "bold", paddingLeft: "2px"}}>
            ${numberWithCommas(price.toFixed(2))}
          </div>
          <div className="subHeader" style={{...cardStyle, fontWeight: "bold", paddingLeft: "2px"}}>
            {`${dateFormat.getDate()}/${dateFormat.getMonth()}/${dateFormat.getFullYear()}`}
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
          </div>
        </div>
      </div>
      

  );
};

export default AssetTableCardForAsset;
