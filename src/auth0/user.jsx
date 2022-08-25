import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


export const UserPage=()=>{
    const {user, isAuthenticated,isLoading } = useAuth0();
    if(isAuthenticated&&!isLoading){
        return(
            <React.Fragment>
                <div className="row">
                    <div className="col-xs-12">
                    <h5>Last name : {user.family_name}</h5>
                    <h5>First name : {user.given_name}</h5>
                    <h5>Email : {user.email}</h5>
                    <img src={user.picture} alt={user.name} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
    else{
        return(
            <React.Fragment>
                <h2>Not Logged in! Please Log in</h2>
            </React.Fragment>
        )
    }

}