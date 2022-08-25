

export function addUser(user){
    fetch(process.env.REACT_APP_APIURL+'user/add',
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(user)
    }).then((res)=>{
        res.json();
    }).then(data=>{
        console.log('successfully added user');
        console.log(data);
    }).catch(error=>{
        console.error('error ',error);
    })
}
export async function getAllUsers(){
    console.log('getuser')
    let response= await fetch(process.env.REACT_APP_APIURL+'user/all',
        {
            method:'GET'
    })
    let users=response.json();
    return users;
}