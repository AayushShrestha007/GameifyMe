// src/pages/customer/ThankYou.jsx

import React from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';

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

const CustomerSuccess = () => {
    return (
        <>
            <Navbar />
            <ThankYouContainer>
                <TickImage src="/assets/images/orange tick.jpg" alt="Success Tick" />
                <Message>We have received your message and we will get back to you soon.</Message>
            </ThankYouContainer>
        </>
    );
};

export default CustomerSuccess;
