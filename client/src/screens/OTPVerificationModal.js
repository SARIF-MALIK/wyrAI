import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

const OTPVerificationModal = ({ show, onHide, onResendClick, email}) => {
  const [otp, setOtp] = useState({ digit1: '', digit2: '', digit3: '', digit4: '' });
  
  const handleInputChange = (event) => {
    setOtp({ ...otp, [event.target.name]: event.target.value });
  };  

  const handleSubmit = async () => {
    // Logic to verify OTP
    
    const response = await fetch('http://localhost:8080/api/verifyotp', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({email:email, enteredOTP:otp}),
    });
    const result = await response.json();
    if(!result.success){
        console.log("otp not verified")
    }
    if(result.success){
      // localStorage.setItem("userEmail", creden.email)
      // localStorage.setItem("authToken", json.authToken); 
      console.log(localStorage.getItem()); 
     
    }
    console.log('otp');
    // onHide(); // Close modal after verification
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Enter OTP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>OTP sent to your registered Email</p>
        <InputGroup className="mb-3">
          {Object.keys(otp).map((key) => (
            <Form.Control
              key={key}
              type="text"
              maxLength="1"
              name={key}
              value={otp[key]}
              onChange={handleInputChange}
              className="text-center"
            />
          ))}
        </InputGroup>
        <div className="text-center mb-3">00:30</div>
        <Button onClick={handleSubmit} className="w-100">
          Verify
        </Button>
        <div className="text-center mt-3">
          Didn't receive OTP? <Button variant="link" onClick={onResendClick}>Send Again</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default OTPVerificationModal 