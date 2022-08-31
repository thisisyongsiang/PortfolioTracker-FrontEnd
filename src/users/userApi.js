import axios from "axios";

const url=process.env.REACT_APP_APIURL;
const axiosInstance=axios.create({
    baseURL:url,
});
export function addUser(user){
    return axiosInstance.post(url+'user/add',user,{
        headers:{
            'Content-Type':'application/json',
        },
    }).then(res=>{
        if(res.status!==200){
            console.warn('wrong status: '+res.data);
            return null;
        };
        return res.data;
    }).catch(err=>{
        console.error('rejected post '+err);
        return null;
    })
    // fetch(process.env.REACT_APP_APIURL+'user/add',
    //     {
    //         method:'POST',
    //         headers:{
    //             'Content-Type':'application/json',
    //         },
    //         body:JSON.stringify(user)
    // }).then((res)=>{
    //     res.json();
    // }).then(data=>{
    //     console.log('successfully added user');
    //     console.log(data);
    // }).catch(error=>{
    //     console.error('error ',error);
    // })
}
export async function getAllUsers(){
    try {
        let response = await axios.get(url+'user/all');
        if (response.status===200)return response.data;
        else {
            console.warn('wrong status: '+response.data);
            return [];
        }
    } catch (error) {
        console.error('some error with request :'+error);
        return [];
    }
    
    // let response= await fetch(process.env.REACT_APP_APIURL+'user/all',
    //     {
    //         method:'GET'
    // })
    // let users=response.json();
}
export function getUser(email){
    return axios.get(url+'user/select',{
        params:{email:email}
    }).then(res=>{
        if(res.status!==200){
            console.warn('wrong status: '+res.data);
            return null;
        };
        return res.data;
    }).catch(err=>{
        console.error('some error with request :'+err);
        return null;
        
    })
}