import React, { useContext, useState } from 'react'
import { TransactionForm } from './TransactionForm'
import { Paper } from '@mui/material';
import { AddPortfolioForm } from './AddPortfolioForm';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../util/context';
export const Transaction = ({closeFn}) => {
  const {userEmail}=useContext(UserContext); 
  const routeParam=useParams();

  let ht=routeParam["portfolioId"]?'500px':"200px";
  return (
    <>
    <Paper id="transactionPaper" sx={{minHeight:ht}}>
        {routeParam["portfolioId"]?
            <TransactionForm closeFn={closeFn} portfolioName={routeParam["portfolioId"]}/>:
            <AddPortfolioForm closeFn={closeFn}/>
        }
        
    </Paper>
    </>
  )
}
