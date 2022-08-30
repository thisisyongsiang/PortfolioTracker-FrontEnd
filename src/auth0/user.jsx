import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./logoutButton";


export const UserPage=()=>{
    const {user, isAuthenticated,isLoading } = useAuth0();
    if(isAuthenticated&&!isLoading){
        return(
            <React.Fragment>
                    <div className="container w-20" style={{"height": "50px"}}>
                        <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col" style={{"height": "50px"}}>
                            <div className="card" style={{"borderRadius": "15px", "height": "50px"}}>
                            <div className="card-body p-4">
                                <div className="d-flex text-black">
                                <div className="flex-shrink-0">
                                <img src={user.picture} alt={user.name} style={{"width": "50px", "borderRadius:": "10px"}}/>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h5 className="mb-1">{user.family_name} {user.given_name}</h5>
                                    <p className="mb-2 pb-1" style={{"color": "#2b2a2a"}}>
                                        Admin User</p>
                                    <p className="mb-2 pb-1" style={{"color": "#2b2a2a"}}>
                                    Email : {user.email}</p>
                                    <div className="d-flex pt-1">
                                    <LogoutButton />
                                    {/* <button type="button" className="btn btn-primary flex-grow-1">Follow</button> */}
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
            {/* <React.Fragment>
                <div className="row">
                    <div className="col-xs-12">
                    <h5>Last name : {user.family_name}</h5>
                    <h5>First name : {user.given_name}</h5>
                    <h5>Email : {user.email}</h5>
                    <img src={user.picture} alt={user.name} />
                    </div>
                </div>
            </React.Fragment> */}
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