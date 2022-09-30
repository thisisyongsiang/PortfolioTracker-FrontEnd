import React, { useEffect ,useRef, useContext, useState } from 'react'
import '../App.css'
import { getUserPortfolioNames } from '../users/userApi';
import { AiFillPlusCircle } from "react-icons/ai";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Button } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import { useLocation } from 'react-router-dom';

import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import { Transaction } from './Transactions/Transaction';
import { UserContext } from '../util/context';

function SidebarMobile() {
    const {userEmail,portfolios}=useContext(UserContext);
    const [open, setOpen] = React.useState(false);
    const [activeElem, setActiveElem] = React.useState(null);
    const location = useLocation();
    let listRef=useRef(null);
    const [sbData,setSbData]=useState([]);
    useEffect(()=>{
        if(listRef.current){
           let childNodes= listRef.current.childNodes;
           for(let child of childNodes){
                if(child.id==="active"){
                    setActiveElem(child);
                }
            }
        }
        if(portfolios){
            let tempSbData=portfolios.map(name=>{
                return {name:name,route:`/portfolio/${name}`}
            });
            tempSbData.unshift({name:'Overall',route:'/Overall'});
            setSbData(tempSbData);
        }
    
    },[listRef, portfolios, location.pathname]);



    const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };


    const onLinkSelected=(e)=>{
        if(activeElem){
            if (e.target.parentElement!==activeElem){
                activeElem.id='';
            }
        }
        setActiveElem(e.target.parentElement);
        document.getElementById("sidebar-mobile").classList.toggle("sidebar-mobile")
    }
    let path=window.location.pathname.split('/');
    path.length>2?path=path[2]:path=path[1];
    path=path.replaceAll('%20',' ');
    return (
        <div className="Sidebar-mobile w-100">
        <ul className="SidebarList" ref={listRef}>
            {sbData.map((val, key) => {
            return (
            <li
            key={key}
            className="row"
            id={path.toUpperCase() === `${val.name.toUpperCase()}` ? "active" : ""}
            >
            <Link to={val.route} onClick={onLinkSelected}>{val.name}</Link>
            </li>
            );
            })}
                <li className='addPortfolio row'
                 onClick={handleClickOpen}>
                    Add Portfolio
                <AiFillPlusCircle />
            </li>
    </ul>
    <Dialog open={open} onClose={handleClose}>
        <DialogContent>{userEmail&& <Transaction userEmail={userEmail} closeFn={handleClose}/> }</DialogContent>
            <Button id="transactionCloseButton" onClick={handleClose} startIcon={<CancelIcon />}> </Button>
    </Dialog>
    </div>

)}


export default SidebarMobile;