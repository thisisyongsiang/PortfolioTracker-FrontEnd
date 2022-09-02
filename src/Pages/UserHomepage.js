import React, { Component } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { Overallpage } from "./Overallpage";

class UserHomepage extends Component {
  constructor(props) {
    super(props);
    this.state = { userAuth0: null, userMongo: null };
  }
  // state = {};
  render() {
    return (
      <div className="col-sm-10 d-flex flex-column h-sm-100">
        <div className="row overflow-auto">
          <div className="col">
            <Overallpage user={this.props.userMongo} />
          </div>
        </div>
      </div>
    );
  }
}

export default UserHomepage;
