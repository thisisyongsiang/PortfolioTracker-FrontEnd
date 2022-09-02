import React, { useEffect,useState } from 'react'
import '../App.css'
import { getUserPortfolioNames } from '../users/userApi';
import {SidebarData} from './SidebarData'

function Sidebar(user) {
    const userData=user.user;
    const [sideBarData,setSideBarData]=useState(['Overall']);
    useEffect(()=>{
        if (userData){
            getUserPortfolioNames(userData.emailAddress)
            .then(d=>{
                d.unshift('Overall');
                setSideBarData(d)
            });
        }
    },[userData]);
    return (
    <div className="Sidebar w-100">
        <ul className="SidebarList">

            {sideBarData.map((val, key) => {
            return (
            <li 
            key={key} 
            className="row" 
            id={window.location.pathname === `/portfolio/${val}` ? "active" : ""}
            onClick={() => {
                window.location.pathname =`/portfolio/${val}`
            }}> 
            <div>{val}</div> 
            </li>
        ); 
    })}
    </ul>
    </div>
)}

 
export default Sidebar;