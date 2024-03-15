import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () =>{
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    useEffect(()=> {
        const auth = localStorage.getItem('user');
        if(auth){
            navigate("/")
        }
    })
    const handleLogin = async()=>{
        console.log(email, password);
        const response = await fetch('http://localhost:5000/login',{
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type':'application/json'
            }
        });
        const result = await response.json();
        console.warn(result);
        if(result.auth){
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate("/");
        }else{
            alert("Please enter correct information.");
        }
    }
    return(
        <div className="flexColumn">
            <h1>Login</h1>
            <input className="inputbox" type="email" name="email" placeholder="Enter Email : " value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input className="inputbox" type="password" name="password" placeholder="Enter Password : " value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button type="submit" className="btn-submit" onClick={handleLogin}>Login</button>
        </div>
    )
};

export default Login;