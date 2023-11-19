
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OTPVerificationModal from './OTPVerificationModal';
import './signup.css';
import logo from '../assets/logo.png';

function Signup() {
  const [creden, setCreden] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    repassword: '',
  });
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    setCreden({ ...creden, [name]: value });
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    let error = '';

    switch (name) {
      case 'email':
        error = isValidEmail(value) ? '' : 'Enter a valid email address';
        break;
      case 'phone':
        error = isValidPhone(value) ? '' : 'Enter a valid phone number';
        break;
      case 'password':
        error = isValidPassword(value) ? '' : 'Password should be at least 8 characters long';
        break;
      case 'repassword':
        error = creden.password === value ? '' : 'Passwords do not match';
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all inputs before submission
    for (const [name, value] of Object.entries(creden)) {
      validateInput(name, value);
    }

    // Check if there are any errors
    if (Object.values(errors).some((error) => error !== '')) {
      return;
    }

    const dataToSend = {
      name: creden.name,
      email: creden.email,
      password: creden.password,
      phone: creden.phone,
    };
    // Your form submission logic here
    const response = await fetch('http://localhost:8080/api/createuser', {
            method:'post', 
            headers : {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(dataToSend)
        })

        const json = await response.json()
        console.log(json); 

        if(!json.success){
            alert("Enter valid Credentials")
        }
        if(json.success){
          handleOTPButtonClick();
          console.log('data saved in db')
          // navigate('/login')
        }
    // Show OTP modal after successful form submission

  };

  const poppinsStyle = {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 700,
    fontSize: '20px',
  };


  const handleOTPButtonClick = async() => {
    for (const [name, value] of Object.entries(creden)) {
      validateInput(name, value);
    }

    // Check if there are any errors
    if (Object.values(errors).some((error) => error !== '')) {
      alert('fill complete details'); 
      return;
    }
  
  const email = creden.email;

  // Call the backend endpoint to send OTP via email
  const response = await fetch('http://localhost:8080/api/sendotp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  const result = await response.json();

  if (result.success) {
    // Display success message or handle further actions
    console.log('OTP sent successfully');
    setShowOTPModal(true);
  } else {
    // Handle failure (display error message, etc.)
    console.error('Failed to send OTP');
    alert('Failed to send OTP');
  }
    
    setShowOTPModal(true);
  };

  const handleCloseModal = () => {
    setShowOTPModal(false);
  };

  const handleResendOTP = () => {
    // Logic to resend OTP
    console.log('Resend OTP');
  };

  return (
    <div className='container mt-5 myborder'>
      <div className='d-flex justify-content-center align-items-center'>
        <img src={logo} alt="Logo" />
      </div>
      <div className='d-flex justify-content-center align-items-center' style={poppinsStyle}>
        Sign Up
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            name='name'
            id="username"
            aria-describedby="username"
            placeholder='Enter your Name'
            onChange={inputChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            name='email'
            id="useremail"
            aria-describedby="email"
            placeholder='Enter your email'
            onChange={inputChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="text"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            name='phone'
            id="userphone"
            aria-describedby="phone"
            placeholder='Enter your phone number'
            onChange={inputChange}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Create Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            name='password'
            id="password"
            aria-describedby="password"
            placeholder='Create your password'
            onChange={inputChange}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="repassword" className="form-label">Re-enter Password</label>
          <input
            type="password"
            className={`form-control ${errors.repassword ? 'is-invalid' : ''}`}
            name='repassword'
            id="repassword"
            aria-describedby="Repassword"
            placeholder='Re-enter your password'
            onChange={inputChange}
          />
          {errors.repassword && <div className="invalid-feedback">{errors.repassword}</div>}
        </div>

        <div>
          <h6>Password should be Alpha-numeric</h6>
        </div>

        <div className="d-flex flex-column align-items-center">
          <button type="button" onClick={handleOTPButtonClick} className="btn btn-primary" style={{ width: '203px' }}>Generate OTP</button>
          <h6 className='textAlign-center'>OTP will send to your registered Email id</h6>
          <OTPVerificationModal
            show={showOTPModal}
            onHide={handleCloseModal}
            onResendClick={handleResendOTP}
            email={creden.email}
          />
        </div>

        <div className='d-flex'>
          <Link to='/login' className='m-3 d-flex justify-content-center'><p>Already Registered?</p> Sign In</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
