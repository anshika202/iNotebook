import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

  const [credentials, setCredentials] = useState({name : "", email : "", password : "", confirmpassword : ""})

  let navigate = useNavigate();

  const host = "http://localhost:5000/"
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await fetch(`${host}api/auth/createUser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
              },
              body: JSON.stringify({name : credentials.name, email : credentials.email, password : credentials.password, confirmpassword : credentials.confirmpassword})
          })
          const json = await response.json()
          console.log(json)

          if(json.success)
          {
            localStorage.setItem('token',json.authToken)
            props.showAlert("account created ","success")
            navigate("/");
          }
          else{
            props.showAlert("Invalid details","danger")
          }
    }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
}


  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" onChange={onChange} name = "name" value={credentials.name} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" onChange={onChange} name = "email" value={credentials.email} aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={onChange} name = "password"  value={credentials.password}/>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmpassword" onChange={onChange} name = "confirmpassword" value={credentials.confirmpassword}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup