import {React, useState} from 'react'  
import { Link, useNavigate } from 'react-router-dom'  
import UploadIcon from '../assets/uploadcloud.png'
import './signup.css'  
import logo from '../assets/logo.png'  
import UploadModal from './FileUploadModel'

function Companydetail() {
    const [creden, setCreden] = useState({email:'', password:''})
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const openModal = () => setModalShow(true);
    const closeModal = () => setModalShow(false);
  let navigate = useNavigate();
  const inputChange = (e)=>{
      setCreden({...creden, [e.target.name]:e.target.value})
  } 
  const handleSubmit = async(e)=>{
      e.preventDefault();

      const response = await fetch('http://localhost:5000/api/loginuser',{
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

  const uploadSize = {
    width:'48px',
    height:'48px', 
    display: 'flex'
  }

  const divSize = {
    width: '257px', 
    height: '145px', 
    display: 'flex',
    alignItems: 'center', 
    border: '1px dashed #999999', 
    borderRadius: '15px'
  }
  return (
    <div className='container mt-5 myborder ' >
    <div className='d-flex justify-content-center align-items-center'><img src={logo}/></div>
    <div className='d-flex justify-content-center align-items-center' style={{ ...poppinsStyle, fontWeight:700, fontSize:'20px'} }>Company Details</div>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name ='Username' id="username" aria-describedby="name" placeholder='Enter your Company Name' onChange={inputChange}/>
        </div>        

        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Address</label>
            <input type="email" className="form-control" name ='email' id="exampleInputEmail1" aria-describedby="email" placeholder='Enter your Company Address' onChange={inputChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Country</label>
            <input type="number" className="form-control" name ='email' id="exampleInputEmail1" aria-describedby="email" placeholder='Select the Country' onChange={inputChange}/>
        </div>
        
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">City</label>
            <input type="password" className="form-control" name='password' id="exampleInputPassword1" aria-describedby="password" placeholder='Enter City' onChange={inputChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Pincode</label>
            <input type="password" className="form-control" name='password' id="exampleInputPassword1" aria-describedby="password" placeholder='Enter Pincode' onChange={inputChange}/>
        </div>
        <div className='uploadDoc d-flex gap-3'>

        <div className="mb-3 w-50 d-flex" style={divSize}  onClick={openModal}>
            <p>Upload Company's Incorporation Documents</p>
            <img src={UploadIcon} style={uploadSize} className="form-control" name='password' id="exampleInputPassword1" aria-describedby="password" placeholder='Re-enter your password' onChange={inputChange}/>
        </div>
        <div className="mb-3 w-50 d-flex" style={divSize}  onClick={openModal}>
            <p>Upload Company Images</p>
            <img src={UploadIcon} style={uploadSize} className="form-control" name='password' id="exampleInputPassword1" aria-describedby="password" placeholder='Re-enter your password' onChange={inputChange}/>
        </div>
        </div>
        <UploadModal
        show={modalShow}
        handleClose={closeModal}
      />
        <div className="d-flex flex-column align-items-center">
        <button type="" className="btn btn-primary mb-3" style={{width:'203px'}}>Finish</button>
        </div>
  </form>
</div>
  )
}

export default Companydetail

//  fieldset & legend 

