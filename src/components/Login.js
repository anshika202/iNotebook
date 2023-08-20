import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({email : "", password:""})
    
    let navigate = useNavigate();

    const host = "http://localhost:5000/"
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await fetch(`${host}api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
              },
              body: JSON.stringify({email : credentials.email, password : credentials.password})
          })
          const json = await response.json()
          console.log(json)
          if(json.success)
          {
            localStorage.setItem('token',json.authToken)
            props.showAlert("Login successful","success")
            navigate("/");
          }
          else{
            props.showAlert("Invalid credentials","danger")
          }
    }
    
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name = "email" onChange={onChange} aria-describedby="email"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" onChange={onChange} name = "password"/>
                </div>
                
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
