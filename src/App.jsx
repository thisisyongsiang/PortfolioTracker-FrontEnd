import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';
import LoginButton from "./auth0/loginButton";
import { withAuth0,useAuth0 } from '@auth0/auth0-react';
import LogoutButton from "./auth0/logoutButton";
import Login from "./auth0/login";
import Loading from "./auth0/loading";
import { BrowserRouter, Route } from "react-router-dom";  // import router for 2 page directory
import Header from "./Components/Header"; // import header object
import Banner from "./Components/Banner";
import AssetTable from "./Components/AssetTable";
import Homepage from "./Pages/Homepage"; // import homepage object
import Assetpage from "./Pages/Assetpage";
import PortfolioCharts from "./Components/PortfolioCharts";

class App extends React.Component{
  
  render(){
    const {user, isAuthenticated,isLoading } = this.props.auth0;

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
          <div className="row">
            <div className="col-xs-12">
              <h2>hello</h2>
              {(!isAuthenticated &&!isLoading)&& <LoginButton />}
              {(isAuthenticated &&!isLoading)&& <LogoutButton />}
              {isLoading &&<Loading />}
            </div>
          </div>
        </div>

        </React.Fragment>
        </BrowserRouter>
    );
  }
}

export default withAuth0(App) ;
