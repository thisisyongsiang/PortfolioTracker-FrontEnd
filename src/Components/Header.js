import {
  Typography,
} from "@mui/material";
import React from "react";

const Header = () => {

  return (
    <nav className="navbar-brand h1" style={{backgroundColor: "#484A4F"}}>
      <div className="container row">
        <div id="navbar" style={{color: "#FFFFFF"}} className="col align-self-center justify-content-start h5">
          NavBar
        </div>
        <div className="col justify-content-end"></div>
        <div className="col p-1 align-self-center justify-content-end">
          <img
            id="profilepicture"
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
            alt="Generic placeholder image"
            className="img-fluid"
            style={{width: "60px", borderRadius: "10px"}}
          />
        </div>
      </div>
 
      <Typography
        variant="subtitle2"
        ml={1.5}
        mt={-1}
        style={{
          color: "darkgrey",
          textTransform: "capitalize",
          fontFamily: "Montserrat",
        }}
      >
        Your one-stop, value-added portfolio tracker
      </Typography>
    </nav>
  );
};

export default Header;
