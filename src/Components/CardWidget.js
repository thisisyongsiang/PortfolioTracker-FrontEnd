import React from "react";

const CardWidget = ({ type }) => {
  let data;
  switch (type) {
    case "netReturn":
      data = {
        subtitle: "Net Return",
        value: "5%",
      };
      break;
    case "annReturn":
      data = {
        subtitle: "Ann. Return",
        value: "5%",
      };
      break;
    case "unrealisedPnL":
      data = {
        subtitle: "Unrealised PNL",
        value: "$2,353",
      };
      break;
    case "volatility":
      data = {
        subtitle: "Volatility",
        value: "14%",
      };
      break;
    default:
      break;
  }
  return (
    <div className="card mx-1" style={{ width: "auto", border: "none" }}>
      <div
        className="card-body"
        style={{
          textAlign: "center",
          width: "auto",
          backgroundImage: "linear-gradient(to bottom right, #2858FE, #7B1DFF)",
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <h5 className="card-title text-white" style={{ fontSize: "40px" }}>
          {data.value}
        </h5>
        <h6 className="card-subtitle text-white">{data.subtitle}</h6>
      </div>
    </div>
  );
};

export default CardWidget;
