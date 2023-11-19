import {React, useState} from 'react'  
import { Link, useNavigate } from 'react-router-dom'  
import './login.css'  
import logo from '../assets/logo.png'  

function ResetPass() {
  const [creden, setCreden] = useState({email:'', password:''})
  let navigate = useNavigate();
  const inputChange = (e)=>{
      setCreden({...creden, [e.target.name]:e.target.value})
  } 
  const handleSubmit = async(e)=>{
      e.preventDefault();

      const response = await fetch('',{
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
    <div className='d-flex justify-content-center align-items-center' style={{ ...poppinsStyle, fontWeight:700, fontSize:'20px'} }>Reset Password</div>
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Create Password</label>
            <input type="password" className="form-control" name='password' id="exampleInputPassword1" aria-describedby="password" placeholder='Enter your password' onChange={inputChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Re-enter Password</label>
            <input type="password" className="form-control" name='password' id="exampleInputPassword1" aria-describedby="password" placeholder='Enter your password' onChange={inputChange}/>
        </div>
        <div className='d-flex align-items-center'>
        <button type="submit" className=" btn btn-primary m-auto mb-5" style={{width:'203px'}}>Submit</button>
        </div>
  </form>
</div>
  )
}

export default ResetPass

//  fieldset & legend 

