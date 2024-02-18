import { useEffect, useState } from "react";
import { Appbar } from "./Appbar";
import { Balance } from "./Balance";
import { Users } from "./Users";
import axios from "axios";

export function Dashboard() {
    
    const [user,setUser] = useState({});
    const [acc,setAcc] = useState({});

    useEffect(()=> {
        axios.get('http://localhost:3000/api/v1/user/getUser',{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                'Content-Type' : 'application/json'
            }
        }).then((res)=>{
            setUser(res.data);
        })

        axios.get('http://localhost:3000/api/v1/account/getAccount',{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                'Content-Type' : 'application/json'
            }
        }).then((res)=>{
            setAcc(res.data);
        })

    },[]);
    return <div >
        <div className="shadow-2xl">
            <Appbar name={user.firstName}></Appbar>
            <Balance balance={acc.balance}></Balance>
            <Users ></Users>
           
        </div>
    </div>
}