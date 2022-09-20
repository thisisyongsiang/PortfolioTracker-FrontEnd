import { Typography } from "@mui/material";
import React from "react";
import ProfileMenu from "./Profilemenu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar-brand h1 m-auto" style={{ backgroundColor: "#333333" }}>
      {/* <div className="container-fluid row" style={{verticalAlign: "middle"}}> */}
      <div className="navbar-contents" style={{verticalAlign: "middle"}}>
        <div
          id="navbar"
          style={{ color: "#FFFFFF", alignContent: "middle", verticalAlign: "middle" }}
          className="col align-self-center justify-content-start"
        >
          <h1 className="webpage-title" style={{color: "white"}}><Link to="/Overall">FinDash</Link></h1>
          <div
            className="webpage-tagline"
            style={{
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Your one-stop, value-added portfolio tracker
          </div>
        </div>
        <div className="col p-2 m-n2 align-self-center">
          <div style={{ float: "right" }}>
            <ProfileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
