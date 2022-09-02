import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import { withAuth0 } from "@auth0/auth0-react";
import Login from "./auth0/login";
import { addUser, getUser } from "./users/userApi";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./Pages/UserProfile";
import UserSettings from "./Pages/UserSettings";
import Feedback from "./Pages/Feedback";
import Tutorial from "./Pages/Tutorial";
import { Overallpage } from "./Pages/Overallpage";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Assetpage from "./Pages/Assetpage";
import { PortfolioPage } from "./Pages/Portfoliopage";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userAuth0: null, userMongo: null };
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
    const { isAuthenticated } = this.props.auth0;
    if (!isAuthenticated) {
      return <Login />;
    }
    return (
      <BrowserRouter>
      <div>
        <div className="container-fluid overflow-hidden ">
          <div className="row" style={{ boxShadow: "0 0px 5px grey" }}>
            <Header />
          </div>
          <div className="row  overflow-auto" style={{ height: "78vh" }}>
            <div className="col-12 col-sm-2 col-xl-2  d-flex sticky-top p-0">
              <div className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start text-white">
                <Sidebar user={this.state.userMongo} />
              </div>
            </div>
            <div className="col-sm-10 d-flex flex-column h-sm-100">
              <div className="row overflow-auto">
                <div className="col">
                  
                    <Routes>
                        <Route path="/">
                          <Route
                            index
                            element={
                              <Overallpage user={this.state.userMongo} />
                            }/>
                          <Route path="/overall" element={
                              <Overallpage user={this.state.userMongo} />} />
                          <Route path="/portfolio/:portfolioId" element={
                              <PortfolioPage user={this.state.userMongo} />} />
                          {/* <Route path="login" element={<Login/>} /> */}
                          <Route path="tutorial" element={<Tutorial />} />
                          <Route path="user">
                            
                            <Route index element={<Overallpage user={this.state.userMongo}/>}/>
                            <Route path="profile" element={<UserProfile />} />
                            <Route path="settings" element={<UserSettings />} />
                            <Route path="feedback" element={<Feedback />} />
                          </Route>
                        </Route>

                    </Routes>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default withAuth0(App);
