import React, { useEffect,useState } from 'react'
import '../App.css'
import { getUserPortfolioNames } from '../users/userApi';
import {SidebarData} from './SidebarData';
import { AiFillPlusCircle } from "react-icons/ai";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function Sidebar(user) {
    const userData=user.user;
    const overall={name:'Overall',route:'/Overall'};
    const [sideBarData,setSideBarData]=useState([]);
    let activeElem=null;
    useEffect(()=>{
        if (userData){
            getUserPortfolioNames(userData.emailAddress)
            .then(pfNames=>{
                let sbData=pfNames.map(name=>{
                    return {name:name,route:`/portfolio/${name}`}
                })
                sbData.unshift(overall)
                setSideBarData(sbData)
            });
        }
    },[userData]);
    const onLinkSelected=(e)=>{
        if(activeElem)activeElem.id='';
        activeElem=e.target.parentElement;
        e.target.parentElement.id="active";
    }
    return (
                <div className="Sidebar w-100">
        <ul className="SidebarList">

            {sideBarData.map((val, key) => {
            return (
            <li 
            key={key} 
            className="row" 
            id={window.location.pathname === `${val.route}` ? "active" : ""}
            // onClick={() => {
            //     window.location.pathname =`${val.route}`
            // }}
            
            > 
            <Link to={val.route} onClick={onLinkSelected}>{val.name}</Link>
            {/* <div>{val.name}</div>  */}
            </li>
        ); 
    })}
                <li className='addPortfolio row'>
                    Add Portfolio
                <AiFillPlusCircle />
            </li>
    </ul>
    </div>

)}

 
export default Sidebar;