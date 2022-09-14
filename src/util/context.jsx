import React from "react";

export const UserContext=React.createContext({
    userEmail:null,     //user email
    portfolios:null,     //List of portfolios
    updatePortfolio:()=>{},
    transactionTrigger:false,
    setTransactionTrigger:()=>{},
})