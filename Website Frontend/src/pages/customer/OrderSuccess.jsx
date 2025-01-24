// src/pages/customer/ThankYou.jsx

import React from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';

// Styled Components

// Container for the Thank You page
const ThankYouContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  text-align: center;
  background-color:rgb(255, 255, 255); /* Optional: Light background color */
`;

// Styled image for the tick
const TickImage = styled.img`
  width: 250px;
  height: 250px;
  object-fit: contain;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    margin-bottom: 20px;
  }
`;

// Styled message text
const Message = styled.p`
  font-size: 1.5em;
  color: #333;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 1.2em;
    padding: 0 10px;
  }
`;

const GoHomeButton = styled.button`
  padding: 12px 24px;
  background-color: #FECF08; /* Button background color */
  color: black; /* Button text color */
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 30px; /* Space above the button */
  transition: background-color 0.3s ease;


  &:disabled {
    background-color: #FECF08;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.9em;
    margin-top: 20px;
  }
`;

const OrderSuccess = () => {

  const navigate = useNavigate(); // Initialize useNavigate hook

    // Handler to navigate to the Home page
    const handleGoHome = () => {
        navigate('/'); // Adjust the path if your home route is different
    };
  return (
    <>
      <Navbar />
      <ThankYouContainer>
        <TickImage src="/assets/images/green tick.jpg" alt="Green Tick" />
        <Message>Payment Complete</Message>
        <GoHomeButton onClick={handleGoHome}>
          Go To Home
        </GoHomeButton>
      </ThankYouContainer>
    </>
  );
};

export default OrderSuccess;
