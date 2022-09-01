import React, { useEffect, useState } from "react";
import { getHistoricalDailyQuotes } from "../FinanceRoutes/financeAPI";

export const useGetQuoteData=(ticker,startDate,endDate,interval)=>{
    const [quoteData,setQuoteData]=useState([]);
    useEffect(()=>{
        console.log('trigger');
        getHistoricalDailyQuotes(ticker,startDate,endDate,interval)
        .then((data)=>{
                setQuoteData(data);
            })
    },[ticker,startDate,endDate,interval])
    return quoteData;
}
