import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Signup = () =>{

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate();

    useEffect(()=> {
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    }, []);
    
    const collectData= async()=>{
        console.warn(name, email, password);
        const response = await fetch('http://localhost:5000/register',{
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type':'application/json'
            }
        });
        const result = await response.json();
        console.warn(result);
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate('/')
    };

    return(
        <div className="flexColumn">
            <h1>Register</h1>
            <input className="inputbox" type="text" name="name" placeholder="Enter Name : " value={name} onChange={(e) => setName(e.target.value)} />
            <input className="inputbox" type="email" name="email" placeholder="Enter Email : " value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="inputbox" type="password" name="password" placeholder="Enter Password : " value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="btn-submit" onClick={collectData}>Sign Up</button>
        </div>
    );
};

export default Signup;