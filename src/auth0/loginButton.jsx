import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="nav-link"
  style={{
    textAlign: "center",
    width: "auto",
    backgroundImage: "linear-gradient(to bottom right, #2858FE, #7B1DFF)",
    borderRadius: "10px",
    border: "none",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    fontSize: "15px",
    padding: "5px 20px 5px 20px",
    fontFamily: "Montserrat",
    // fontWeight: "bold",
    color: "white"
  }}
  onClick={() => loginWithRedirect()}>LOGIN/SIGN UP</button>;
};

export default LoginButton;