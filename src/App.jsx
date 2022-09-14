import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import { withAuth0 } from "@auth0/auth0-react";
import Login from "./auth0/login";
import { addUser, getUser, getUserPortfolioNames } from "./users/userApi";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import UserProfile from "./Pages/UserProfile";
import UserSettings from "./Pages/UserSettings";
import Feedback from "./Pages/Feedback";
import Tutorial from "./Pages/Tutorial";
import { Overallpage } from "./Pages/Overallpage";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import {Assetpage} from "./Pages/Assetpage";
import { PortfolioPage } from "./Pages/Portfoliopage";
import { UserContext } from "./util/context";
import Landingpage from "./Pages/Landingpage";
import { MainPage } from "./Pages/MainPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userAuth0: null, userMongo: null ,portfolios:null,transactionTrigger:false};
    this.onUpdatePortfolioList=(portfolios)=>{
      this.setState({portfolios:portfolios});
    }
    this.onSetTransactionTrigger=(t)=>{
      this.setState({transactionTrigger:t});
    }
  }

  onLoggedIn(user) {
    let userObj = {
      lastName: user.family_name,
      firstName: user.given_name,
      emailAddress: user.email,
    };
    this.setState({ userAuth0: userObj });
    getUser(user.email)
      .then((res) => {
        if (res) {
          this.setState({ userMongo: res });
          return false;
        }
        return true;
      })
      .then((newUser) => {
        if (newUser) {
          addUser(userObj).then((res) => {
            this.setState({ userMongo: res });
          });
        }
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.auth0.isAuthenticated && this.props.auth0.isAuthenticated) {
      this.onLoggedIn(this.props.auth0.user);
    }
  }
  render() {

    const { isAuthenticated ,isLoading } = this.props.auth0;
    if (!isAuthenticated&&!isLoading ) {
      return(        
      <Routes>
      <Route path='/'
      element={<Landingpage />}/>
      <Route path='*'element={<Navigate to ="/" replace />} />
      </Routes>
      )
    }
    if(isAuthenticated&&!isLoading){
    return( 
      <UserContext.Provider value={{
        userEmail:this.props.auth0.user.email,
        portfolios:this.state.portfolios,
        transactionTrigger:this.state.transactionTrigger,
        setTransactionTrigger:this.onSetTransactionTrigger,
        updatePortfolio:this.onUpdatePortfolioList}}>
          <MainPage />
      </UserContext.Provider>
    )}
}
}

export default withAuth0(App);
