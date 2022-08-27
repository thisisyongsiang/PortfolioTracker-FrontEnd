import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';
import { withAuth0 } from '@auth0/auth0-react';
import LogoutButton from "./auth0/logoutButton";
import Login from "./auth0/login";
import Loading from "./auth0/loading";
import { UserPage } from "./auth0/user";
import { getAllUsers } from "./users/users";
import { Users } from "./users/reactUsers";
import { BrowserRouter, Route, Routes } from "react-router-dom";  // import router for 2 page directory

import Assetpage from "./Pages/Assetpage";
import OverallPortfolio from "./Pages/OverallPortfolio";
import TransactionPage from "./Pages/TransactionPage";
import Layout from "./Layout";

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
        {(!isAuthenticated &&!isLoading) &&<Login />}
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<OverallPortfolio />} />
              <Route path="assets" element={<Assetpage />} />
              <Route path="transactions" element={<TransactionPage />} />
              {/* <Route path="*" element={<NoPage />} /> */}
            </Route>
        </Routes>

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
        </BrowserRouter>
    );
  }
}

export default withAuth0(App) ;
