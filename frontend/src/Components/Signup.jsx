import { useState } from "react"
import { Button } from "./Button"
import { Heading } from "./Heading"
import { Input } from "./Input"
import { SubHeading } from "./SubHeading"
import { Warning } from "./Warning"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
export function Signup(){
    const [email,setEmail] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    return <div className = "bg-slate-300 h-screen flex justify-center">
        <div className= "flex flex-col justify-center">
        <div className="bg-white rounded shadow-2xl">
        <Heading label = {'Sign Up'}></Heading>
        <SubHeading label = {'Enter your information to create an account'}></SubHeading>
        <Input label= {'First Name'} placeholder = 'John' onchange = {(e)=>{
               setFirstName(e.target.value);
               console.log('firstName set');
        }}></Input>
        <Input label= {'Last Name'} placeholder = 'Doe' onchange = {(e)=>{
               setLastName(e.target.value);
        }}></Input>
        <Input label= {'Email'} placeholder = 'Johndoe@example.com' onchange = {(e)=>{
               setEmail(e.target.value);
        }}></Input>
        <Input label= {'Password'} placeholder = '' onchange = {(e)=>{
               setPassword(e.target.value);
        }}></Input>
        <Button label={'Sign Up'} onclick = {async () =>{
            const res = await axios.post('http://localhost:3000/api/v1/user/signup',{
                userName : email,
                firstName : firstName,
                lastName : lastName,
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
              alert(res.data.msg);
        }}></Button>
        <Warning label = {'Already have an account?'} buttonText = {'Login'} to={'/signin'}></Warning>
        </div>
    </div>
    </div>
}

