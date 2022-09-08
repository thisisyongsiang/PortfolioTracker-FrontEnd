import React, { useEffect,useState,useRef, useContext } from 'react'
import '../App.css'
import { getUserPortfolioNames } from '../users/userApi';
import {SidebarData} from './SidebarData';
import { AiFillPlusCircle } from "react-icons/ai";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { TransactionButton } from './Transactions/TransactionButton';
import { Transaction } from './Transactions/Transaction';
import { UserContext } from '../util/context';

function Sidebar() {
    const {userEmail,portfolios,updatePortfolio}=useContext(UserContext);
    const [open, setOpen] = React.useState(false);
    let activeObj=useRef(null);
    let activeElem=null;
    useEffect(()=>{
        if (userEmail){
            getUserPortfolioNames(userEmail)
            .then(pfNames=>{
                updatePortfolio(pfNames);
            });
        }
    },[userEmail]);
    let sbData=portfolios.map(name=>{
        return {name:name,route:`/portfolio/${name}`}
    });
    sbData.unshift({name:'Overall',route:'/Overall'});

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
  

    const onLinkSelected=(e)=>{
        if (activeObj.current){
            activeObj.current.id=''
        }
        // activeObj=null;
        if(activeElem)activeElem.id='';
        activeElem=e.target.parentElement;
        e.target.parentElement.id="active";
    }
    let path=window.location.pathname.split('/');

    path.length>2?path=path[2]:path=path[1];
    path=path.replaceAll('%20',' ');
    return (
                <div className="Sidebar w-100">
        <ul className="SidebarList">
            {sbData.map((val, key) => {
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
                <li className='addPortfolio row' 
                 onClick={handleClickOpen}>
                    Add Portfolio
                <AiFillPlusCircle />
            </li>
    </ul>
    <Dialog open={open} onClose={handleClose}>
        <DialogContent>{userEmail&& <Transaction userEmail={userEmail} closeFn={handleClose}/> }</DialogContent>
            <Button className='position-absolute end-0 top-0' onClick={handleClose} startIcon={<CancelIcon />}> </Button>
    </Dialog>
    </div>

)}

 
export default Sidebar;