import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { numberWithCommas } from "../util/util";
import { Link } from "react-router-dom";


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
    textAlign: "center",
    padding: "0",
    margin: "auto",
    fontSize: "20px"
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
          borderRadius: "10px",
        }}
      >
        <div
          className="card-body mainName"
          style={{ width: "40%", verticalAlign: "middle", margin: "auto" , paddingLeft: "16px"}}
        >
          <Link to={content.route} style={{background: "rgba(130, 130, 130, 0.81", boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px", borderRadius: "10px", padding: "12px"}}>
          {content.portfolioName ? content.portfolioName : ""}
                </Link>
          
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
            <AddCircleOutlineIcon />
            <ArrowCircleRightIcon />
          </div>
        </div>
      </div>
      

  );
};

export default AssetTableCard;
