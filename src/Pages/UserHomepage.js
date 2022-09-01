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
      <div>
        <div className="container-fluid overflow-hidden ">
          <div className="row" style={{ boxShadow: "0 0px 5px grey" }}>
            <Header />
          </div>
          <div className="row  overflow-auto" style={{ height: "78vh" }}>
            <div className="col-12 col-sm-2 col-xl-2  d-flex sticky-top p-0">
              <div className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start text-white">
                <Sidebar user={this.props.userMongo} />
              </div>
            </div>
            <div className="col-sm-10 d-flex flex-column h-sm-100">
              <div className="row overflow-auto">
                <div className="col">
                  <Overallpage user={this.props.userMongo} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserHomepage;
