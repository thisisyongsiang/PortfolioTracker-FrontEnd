import React from "react";

export const UserContext=React.createContext({
    userEmail:null,     //user email
    portfolios:[],     //List of portfolios
    updatePortfolio:()=>{},
    transactionTrigger:false,
    setTransactionTrigger:()=>{},
    portfolioUpdateTrigger:false,
})