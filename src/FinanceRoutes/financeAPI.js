import axios from "axios";

export function getHistoricalDailyQuotes(symbol,startDate,endDate,interval){
    return axios.request({
        url:'financeapi/historical/'+symbol,
        method:'get',
        params:{
            startdate:startDate,
            enddate:endDate,
            interval:interval
        }
    }).then((res)=>{
        return res.data;
    }).catch(err=>{
        console.error('error occurred '+err );
        return [];
    });
}
export function getAssetQuote(symbol){
    return axios.request({
        url:'financeapi/quote/'+symbol,
        method:'get',
    }).then((res)=>{
        return res.data;
    }).catch(err=>{
        console.error('error occurred '+err );
        return [];
    });
}
export function searchAsset(search){
    return axios.request({
        url:'financeapi/searchsymbols/'+search,
        method:'get',
    }).then((res)=>{
        return res.data;
    }).catch(err=>{
        console.error('error occurred '+err );
        return [];
    });
}
export function getStockSplit(symbol,startDate){
    return axios.request({
        url:'financeapi/split/'+symbol,
        method:'get',
        params:{
            startdate:startDate,
        }
    }).then((res)=>{
        return res.data;
    }).catch(err=>{
        console.error('error occurred '+err );
        return [];
    });
}
export function getDividend(symbol,startDate){
    return axios.request({
        url:'financeapi/dividend/'+symbol,
        method:'get',
        params:{
            startdate:startDate,
        }
    }).then((res)=>{
        return res.data;
    }).catch(err=>{
        console.error('error occurred '+err );
        return null;
    });
}
