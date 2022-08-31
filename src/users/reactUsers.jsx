import React,{useState,useEffect} from "react";
import { getAllUsers } from "./userApi";

export const Users=(props)=>{
    let usersArray=[];
    const[users,setUsers]=useState(usersArray);


    useEffect(()=>{
        getAllUsers().then(
            (users)=>{
                console.log(users);
                setUsers(users);
            }
        );
    },[])
    return(
        <React.Fragment>
            {users &&
            users.map((user)=>{
                return(
                    <React.Fragment key={user.emailAddress}>
                    <div className="row">
                        <p>First Name : {user.firstName}</p>
                        <p>Last Name : {user.lastName}</p>
                        <p>Email : {user.emailAddress}</p>
                    </div>
                    <hr />
                    </React.Fragment>

                )
            })}
        </React.Fragment>
        
    )
}