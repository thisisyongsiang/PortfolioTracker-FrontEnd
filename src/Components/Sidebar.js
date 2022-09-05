import React, { useEffect,useState,useRef } from 'react'
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
    let activeObj=useRef(null);
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
        if (activeObj){
            activeObj.current.id=''
        }
        activeObj=null;
        if(activeElem)activeElem.id='';
        activeElem=e.target.parentElement;
        e.target.parentElement.id="active";
    }
    let path=window.location.pathname.split('/');
    path.length>2?path=path[2]:path=path[0];
    path=path.replaceAll('%20',' ');
    return (
                <div className="Sidebar w-100">
        <ul className="SidebarList">
            {sideBarData.map((val, key) => {
            return (
            <li 
            key={key} 
            className="row" 
            id={path === `${val.name}` ? "active" : ""}
            ref={path === `${val.name}` ? activeObj:null}

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