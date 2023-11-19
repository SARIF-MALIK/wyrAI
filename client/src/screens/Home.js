import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BuyerIcon from '../assets/buyer.svg';
import AgencyIcon from '../assets/agency.png';
import FactoryIcon from '../assets/factory.png';
import QcIcon from '../assets/qc.png';
import CheckCircle from '../assets/checkCircle.png'
import './home.css'


const Home = () => {
  const [selectedOption, setSelectedOption] = useState('buyer');

  const options = [
    { id: 'buyer', label: 'Buyer', iconUrl: BuyerIcon },
    { id: 'agency', label: 'Buying Agency', iconUrl: AgencyIcon },
    { id: 'factory', label: 'Factory', iconUrl: FactoryIcon },
    { id: 'qc', label: 'QC Agency', iconUrl: QcIcon },
  ];

  const handleSelectOption = (optionId) => {
    setSelectedOption(optionId);
  };

  return (
<Container className="py-5">
      <Row className="justify-content-center">
        <p className='text-center' style={{ color: '#666666', fontWeight: '700', fontSize: '16px' }}>
          Please Tell Us</p>
        <h2 className="text-center mb-4" style={{ color: '#1B9BEF', fontWeight: '700', fontSize: '32px' }} >
          WHAT YOU DO</h2>

        {options.map((option) => (
          <Col key={option.id} xs={12} sm={6} md={3} className="text-center">
            <div
              className={`myflexContainer position-relative d-flex flex-column align-items-center option-item ${selectedOption === option.id ? 'option-selected' : ''} `}
              onClick={() => handleSelectOption(option.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelectOption(option.id)}
            >
              <div className={`option-icon ${selectedOption === option.id ? 'icon-selected' : ''}`}>
                <img src={option.iconUrl} alt={option.label} className="img-fluid" />
                <img className='checkCircle' src={CheckCircle} alt="Check"/>
              </div>

              <p className="mt-2" style={{ color: '#666666', fontWeight: '600', fontSize: '20px' }}>{option.label}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
