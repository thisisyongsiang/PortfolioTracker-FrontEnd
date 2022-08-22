import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login=()=>{
    const{isAuthenticated,loginWithRedirect}=useAuth0();

    return(
        <React.Fragment>
        {!isAuthenticated && (loginWithRedirect())}
    </React.Fragment> 
    )


}
export default Login;