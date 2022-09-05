import axios from "axios";

const url=process.env.REACT_APP_APIURL;
const axiosInstance=axios.create({
    baseURL:url,
    // timeout:1000,

});

export function getHistoricalDailyQuotes(symbol,startDate,endDate,interval){
    return axiosInstance.request({
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
    return axiosInstance.request({
        url:'financeapi/quote/'+symbol,
        method:'get',
    }).then((res)=>{
        return res.data;
    }).catch(err=>{
        console.error('error occurred '+err );
        return [];
    });
}
