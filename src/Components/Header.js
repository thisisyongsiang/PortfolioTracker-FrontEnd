import {
  Typography,
} from "@mui/material";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


const Header = () => {
  const {user} = useAuth0();
  return (
    <nav className="navbar-brand h1" style={{"backgroundColor": "#484A4F"}}>
      <div className="container-fluid row">
        <div id="navbar" style={{"color": "#FFFFFF"}} className="col align-self-center justify-content-start h5">
          FinDash
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
          <img
            src= {user.picture} //"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
            alt="Generic placeholder image"
            style={{"width": "60px", "borderRadius": "10px", "float": "right"}}
          />
        </div>
        
      </div>
 
      
    </nav>
  );
};

export default Header;
