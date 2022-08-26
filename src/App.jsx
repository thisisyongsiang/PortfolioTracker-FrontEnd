import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';
import LoginButton from "./auth0/loginButton";
import { withAuth0,useAuth0 } from '@auth0/auth0-react';
import LogoutButton from "./auth0/logoutButton";
import Login from "./auth0/login";
import Loading from "./auth0/loading";
import { UserPage } from "./auth0/user";
import { addUser,getAllUsers } from "./users/users";
import { Users } from "./users/reactUsers";
import { BrowserRouter, Route } from "react-router-dom";  // import router for 2 page directory
import Header from "./Components/Header"; // import header object
import Banner from "./Components/Banner";
import AssetTable from "./Components/AssetTable";
import Homepage from "./Pages/Homepage"; // import homepage object
import Assetpage from "./Pages/Assetpage";
import PortfolioCharts from "./Components/PortfolioCharts";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={users:[]};
  }
  
  onLoggedIn(user){
    let userObj={
      lastName:user.family_name,
      firstName:user.given_name,
      emailAddress:user.email,
    }
    // addUser(userObj);
  }
  getUsers(){
    getAllUsers().then(
      (users)=>{
          this.setState({users:users});
      }
  );
  }
  componentDidMount(){
    this.getUsers();
  }
  render(){
    const {user, isAuthenticated,isLoading } = this.props.auth0;
    if(isAuthenticated&&!isLoading){this.onLoggedIn(user)};
    return (
      <BrowserRouter>
      <React.Fragment>
        {(!isAuthenticated &&!isLoading) &&<Login />}
        <div>
          < Header />
          < Banner />
          < PortfolioCharts />
          < AssetTable />
          {/* < Route path = "/" component={Homepage} /> 
          < Route path = "/asset/:id" component={Assetpage} /> */}
        </div>

        <div className="container">
              <hr />
              {(isAuthenticated &&!isLoading)&&
            <div className="row">
              <div className="col-xs-12">
              <UserPage />
              <LogoutButton />
              {isLoading &&<Loading />}
              </div>
              <hr />
              <Users users={this.state.users}/>
            </div>
  }
        </div>

        </React.Fragment>
        </BrowserRouter>
    );
  }
}

export default withAuth0(App) ;
