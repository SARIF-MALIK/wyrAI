import {React, useState} from 'react'  
import { Link, useNavigate } from 'react-router-dom'  
import './login.css'  
import logo from '../assets/logo.png'  

function Login() {
  const [creden, setCreden] = useState({email:'', password:''})
  let navigate = useNavigate();
  const inputChange = (e)=>{
      setCreden({...creden, [e.target.name]:e.target.value})
  } 
  const handleSubmit = async(e)=>{
      e.preventDefault();

      const response = await fetch('http://localhost:8080/api/loginuser',{
        method:'post', 
            headers : {
                "Content-Type" : "application/json"
            },    
            body:JSON.stringify({email:creden.email, password:creden.password})
          })
      const json = await response.json()
      console.log(json); 
          
      if(!json.success){
          alert("Enter valid Credentials")
      }
      if(json.success){
        localStorage.setItem("userEmail", creden.email)
        localStorage.setItem("authToken", json.authToken); 
        console.log(localStorage.getItem('authToken')); 
        navigate('/')
      }
  }

  const poppinsStyle = {
    fontFamily: '"Poppins", sans-serif',
  }
  return (
    <div className='container w-50 mt-5 myborder' >
    <div className='d-flex justify-content-center align-items-center'><img src={logo}/></div>
    <div className='d-flex justify-content-center align-items-center' style={{ ...poppinsStyle, fontWeight:700, fontSize:'20px'} }>Sign In</div>
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email or Phone</label>
            <input type="email" className="form-control" name ='email' id="exampleInputEmail1" aria-describedby="email" placeholder='Enter your email or phone number' onChange={inputChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' id="exampleInputPassword1" aria-describedby="password" placeholder='Enter your password' onChange={inputChange}/>
        </div>
        <div>
        <Link to='/resetpassword' className='m-3 d-flex justify-content-end'>Forget Password?</Link>
        </div>
        <div className="d-flex justify-content-center">
        <button type="submit" className=" btn btn-primary">Sign In</button>
        </div>
        <div className='d-flex'>
        <Link to='/newuser' className='m-3 d-flex justify-content-center'><p>Not Registerd yet?</p> Create Account </Link>
        </div>
  </form>
</div>
  )
}

export default Login

//  fieldset & legend 

