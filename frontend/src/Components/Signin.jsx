import { useState } from "react";
import { Button } from "./Button";
import { Heading } from "./Heading";
import { Input } from "./Input";
import { SubHeading } from "./SubHeading";
import { Warning } from "./Warning";
import axios from "axios";
import { useNavigate } from "react-router-dom"

export function Signin(){

    const navigate = useNavigate();
    const [email,setEmail]  = useState('');
    const [password,setPassword] = useState('');

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className= "flex flex-col justify-center">
            <div className="bg-white rounded shadow-2xl">
            <Heading label={'Sign In'}></Heading>
            <SubHeading label={'Enter your credentials to access your account'}></SubHeading>
            <Input label={'Email'} placeholder={'johndoe@example.com'} onchange={(e) => {
                setEmail(e.target.value);
            }}></Input>
            <Input label={'Password'} placeholder={''} onchange={(e) => {
                setPassword(e.target.value);
            }}></Input>
            <Button label={'Sign In'} onclick={async()=>{
                  const res = await axios.post('http://localhost:3000/api/v1/user/signin',{
                    userName : email,
                    password : password
                },{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                  }).catch((e) => {
                    alert(e.response.data.msg);
                  });
                  localStorage.setItem("token", res.data.token)
                  navigate("/dashboard")
            }}></Button>
            <Warning label={"Don't have an account?"} buttonText={'Sign Up'} to = {'/signup'}></Warning>
            </div>
        </div>
    </div>
}