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
import UserHomepage from "./Pages/UserHomepage";
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
        <Routes>
          <Route path="/">
            <Route index element={<UserHomepage userMongo={this.state.userMongo}/>} />
            {/* <Route path="login" element={<Login/>} /> */}
            <Route path="tutorial" element={<Tutorial />} />
            <Route path="user">
              <Route index element={<UserHomepage />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="settings" element={<UserSettings />} />
              <Route path="feedback" element={<Feedback />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default withAuth0(App);
