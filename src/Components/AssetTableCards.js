import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CancelIcon from "@mui/icons-material/Cancel";
import { numberWithCommas } from "../util/util";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../util/context";
import { deleteUserPortfolio } from "../users/userApi";
import { LineChart } from "../charts/LineChart";

const AssetTableCard = ({ content }) => {
  const chartTableWidth = useRef();
  const [deleted, setDeleted] = useState(false);
  const { userEmail, portfolios, updatePortfolio } = useContext(UserContext);
  const handleDelete = () => {
    let confirmDelete =
      window.confirm(`Delete portfolio : ${content.portfolioName}?
This action is not reversible!
    `);
    if (confirmDelete) {
      let index = portfolios.indexOf(content.portfolioName);
      portfolios.splice(index, 1);
      if (index >= portfolios.length) {
        index -= 1;
      }
      deleteUserPortfolio(userEmail, content.portfolioName).then(() => {
        updatePortfolio([...portfolios]);
        setDeleted(true);
      });
    }
  };

  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };

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
  return deleted ? (
    <></>
  ) : (
    <div
      className="card"
      onClick={() => routeChange(content.route)}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        margin: "10px 0px 10px 0px",
        background: "#F1F1F1",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 15px",
        borderRadius: "10px",
        cursor: "pointer",
      }}
    >
      <div
        // className="card-body mainName"
        style={{
          width: "35%",
          verticalAlign: "middle",
          margin: "auto",
          paddingLeft: "16px",
        }}
      >
        {content.portfolioName ? content.portfolioName : ""}
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
        <Tooltip title="1 Month Portfolio value">
          <div
            className="subHeader"
            style={{
              width: "30%",
              verticalAlign: "middle",
              justifyContent: "left",
              padding: "0",
              overflow:"hidden",
            }}
            ref={chartTableWidth}
          >
            
            
            <LineChart
              data={content.portfolioHistory}
              dynamicWidth={true}
              displayDiff={true}
              trackMouse={false}
              margin={{ right: 10, left: 10, bottom: 10, top: 10 }}
              height={80}
              lineWidth="2px"
              width={chartTableWidth.current?chartTableWidth.current.offsetWidth:200}
              xValue={(d) => new Date(d.date)}
              yValue={(d) => d.value}
              yAxisFormat={(d) => `$${numberWithCommas(d.toFixed(2))}`}
              displayXTicks={false}
              displayYTicks={false}
            />
           
          </div>
          </Tooltip>
        <div
          className="subHeader"
          ref={chartTableWidth}
          style={{
            ...cardStyle,
            color: "black",
            fontWeight: "bold",
          }}
        >
          {content.value >= 0
            ? `$${numberWithCommas(content.value.toFixed(0))}`
            : `-$${numberWithCommas(content.value.toFixed(0) * -1)}`}
        </div>
        <div
          className="subHeader"
          style={{
            ...cardStyle,
            color: content.netPnL > 0 ? "#2C7E12" : "red",
            fontWeight: "bold",
          }}
        >
          {content.netPnL >= 0
            ? `$${numberWithCommas(content.netPnL.toFixed(0))}`
            : `-$${numberWithCommas(content.netPnL.toFixed(0) * -1)}`}
        </div>
        <div
          className="subHeader"
          style={{
            ...cardStyle,
            color: content.netReturn > 0 ? "#2C7E12" : "red",
            fontWeight: "bold",
          }}
        >
          {content.netReturn.toFixed(1)}%
        </div>
        <div
          className="subHeader"
          style={{
            ...cardStyle,
            color: content.volatility < 1 ? "#2C7E12" : "red",
            fontWeight: "bold",
          }}
        >
          {content.volatility.toFixed(1)}%
        </div>

        <div
          className="actionIcons"
          style={{
            width: "20%",
            verticalAlign: "middle",
            justifyContent: "center",
            textAlign: "center",
            padding: "0px",
            margin: "auto",
          }}
        >
          <Tooltip title="Delete Portfolio">
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

export default AssetTableCard;
