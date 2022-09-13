import { Typography } from "@mui/material";
import React from "react";
import ProfileMenu from "./Profilemenu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar-brand h1 m-auto" style={{ backgroundColor: "#333333" }}>
      <div className="container-fluid row" style={{verticalAlign: "middle"}}>
        <div
          id="navbar"
          style={{ color: "#FFFFFF", alignContent: "middle", verticalAlign: "middle" }}
          className="col align-self-center justify-content-start"
        >
          <h1><Link to="/Overall" style={{color: "white"}}>FinDash</Link></h1>
          <Typography
            variant="subtitle2"
            mt={0}
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Your one-stop, value-added portfolio tracker
          </Typography>
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
