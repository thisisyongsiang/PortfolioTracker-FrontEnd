import { Typography } from "@mui/material";
import React from "react";
import ProfileMenu from "./Profilemenu";

const Header = () => {
  return (
    <nav className="navbar-brand h1 m-0" style={{ backgroundColor: "#333333" }}>
      <div className="container-fluid row">
        <div
          id="navbar"
          style={{ color: "#FFFFFF" }}
          className="col align-self-center justify-content-start h5"
        >
          <h1>FinDash</h1>
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
