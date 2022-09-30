import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import SidebarMobile from "../Components/Sidebar-mobile";
import { UserContext } from "../util/context";
import { Overallpage } from "./Overallpage";
import {Assetpage} from "./Assetpage";
import UserProfile from "./UserProfile";
import UserSettings from "./UserSettings";
import Feedback from "./Feedback";
import Tutorial from "./Tutorial";
import { PortfolioPage } from "./Portfoliopage";
import { addUser, getUser, getUserPortfolioNames } from "../users/userApi";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';

export const MainPage=()=>{
    const{userEmail,updatePortfolio}=useContext(UserContext);
    const{user,getAccessTokenSilently}=useAuth0();
    const [tokenLoaded,setTokenLoaded] = useState(false);
    const [sidebarStatus, setSidebarStatus] = useState(false);

    useEffect(()=>{
      (async()=>{
        const token = await getAccessTokenSilently();
        axios.defaults.headers.common["Authorization"]=`Bearer ${token}`; 
        setTokenLoaded(true);
        let userObj = {
          lastName: user.family_name,
          firstName: user.given_name,
          emailAddress: user.email,
        };
        getUser(user.email)
          .then((res) => {
            if (res) {
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
        getUserPortfolioNames(userEmail).then(pf=>{
            updatePortfolio(pf);
        });
      })();
      
    },[user]);

    const handleSidebarOpen = () => {
      setSidebarStatus(true)
    }

    const handleSidebarClose = () => {
      setSidebarStatus(false)
    }

    if(!tokenLoaded)return<></>
    return(
        <div>

        <div className="container-fluid overflow-hidden ">
          <div className="row" style={{ boxShadow: "0 0px 5px grey", minHeight: "10vh", backgroundColor: "rgb(51, 51, 51)" }}>
            <Header />
          </div>
          <div className="row  overflow-auto" style={{ height: "90vh", position: "relative"}}>
          <div id="mobile-sidebar" className={sidebarStatus?"sidebar-mobile-active":"sidebar-mobile"} style={{position: "relative", padding: "0px"}}>
                    <SidebarMobile onClick={handleSidebarClose} />
                    <span className="sidebar-mobile-close-btn" onClick={handleSidebarClose} style={{position: "absolute", top: "10px", left: "10px", color: "white"}}>X</span>
                  </div>
            <div className="col-12 col-sm-2 col-xl-2  d-flex sticky-top p-0">
              <div className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start text-white">
                <Sidebar />
              </div>
              
            </div>
            <div className="col-sm-10 d-flex flex-column h-sm-100">
              <div className="row overflow-auto h-100" style={{position: "relative"}}>
              <div className="sidebar-open-btn" style={{position: "absolute", top: "0.5rem", left: "-0.3rem", width: "auto"}}>
                  <MenuIcon onClick={handleSidebarOpen}></MenuIcon>
                </div>
                <div className="col" style={{marginLeft: "0.5rem"}}>
                  
                    <Routes>
                          <Route
                            path='/'
                            element={<Navigate to ="/overall" replace />}/>
                          <Route path="overall" element={
                              <Overallpage />} />
                          <Route path="portfolio/:portfolioId" element={
                              <PortfolioPage  />} />
                            <Route path="portfolio/:portfolioId/:assetId" element={
                                  <Assetpage />} />
                          {/* <Route path="login" element={<Login/>} /> */}
                          <Route path="tutorial" element={<Tutorial />} />
                          <Route path="user">
                            
                            <Route index element={<Overallpage />}/>
                            <Route path="profile" element={<UserProfile />} />
                            <Route path="settings" element={<UserSettings />} />
                            <Route path="feedback" element={<Feedback />} />
                          </Route>
                          <Route path="*" element={<Navigate to ="/" replace />} />

                    </Routes>
                </div>
                
              </div>
            </div>
          </div>
        </div>

      </div>
    )
}
