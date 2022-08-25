import React,{useState} from "react";
import { getAllUsers } from "./users";

export const Users=(props)=>{
    let usersArray=props.users;
    // const[users,setUsers]=useState(usersArray);

    // getAllUsers().then(
    //     (users)=>{
    //         console.log(users);
    //         setUsers(users);
    //     }
    // );
    return(
        <React.Fragment>
            {usersArray.map((user)=>{
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