// src/pages/customer/Faqs.jsx

import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';

// Styled Components

// Container for the entire FAQs page
const FaqsContainer = styled.div`
  padding: 100px 20px 50px 20px; /* Top padding accounts for fixed Navbar */
  max-width: 1200px;
  margin: 0 auto;
`;

// Header for the page
const Header = styled.h1`
  color: #ED4708; /* Specified font color */
  font-size: 2.5em;
  text-align: left;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

// Subtitle for the page
const SubHeader = styled.p`
  color: #555;
  font-size: 1.2em;
  text-align: left;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

// FAQs Grid
const FAQsGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch; /* Stretch to take full width */
  gap: 20px; /* Space between FAQ items */

  @media (max-width: 768px) {
    align-items: center; /* Center-align on smaller screens */
  }
`;

// Individual FAQ Item Container
const FAQItemContainer = styled.div`
  width: 100%;
  background-color: #D9D9D9; /* Background color as specified */
  border-radius: 8px;
  padding: 15px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

// Question Container with Toggle Icon on the Left
const QuestionContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #c0c0c0; /* Slightly darker on hover */
  }
`;

// Toggle Icon styled
const ToggleIcon = styled.div`
  font-size: 1.2em;
  color: #ED4708;
  margin-right: 10px; /* Space between icon and question text */
  display: flex;
  align-items: center;
`;

// Question Text
const QuestionText = styled.h3`
  font-size: 1.2em;
  color: #ED4708; /* Using the specified color */
  margin: 0;
`;

// Answer Text with Smooth Transition
const Answer = styled.p`
  font-size: 1em;
  color: #555;
  margin: 10px 0 0 35px; /* Indent answer to align with question text */
  text-align: left;
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, padding 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  padding: ${({ isOpen }) => (isOpen ? '10px 0' : '0')};
`;

// Faqs Component
const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Sample FAQs Data
  const faqs = [
    {
      question: 'How do I create an account?',
      answer:
        'To create an account, click on the "Login" button in the navbar. Fill in the required details to complete the registration process.',
    },
    {
      question: 'How long does shipping take?',
      answer:
        `We strive to ship all orders placed before 12:00PM (MST) within 2 business days, regardless of shipping speed selected, unless the item is on pre-order. If one or more of the items in your order is on pre-order, shipment will only begin once all items are available.
      
**Important:** Processing times do not include weekends or federal holidays.

We strongly encourage you to double-check your shipping address prior to placing your order. Keep in mind that we're not liable for incorrectly entered addresses.`
    },
    {
      question: 'How much does shipping cost',
      answer:
        'As of now, shipping cost is Rs100 regardless of delivery location',
    },
    {
      question: 'What payment methods are accepted?',
      answer:
        'We accept payment through Khalti Digital Wallet only',
    },
    {
      question: 'How do I reset my password?',
      answer:
        'If you have forgotten your password, click on the "Login" button and select "Forgot Password". Enter your registered email address, and we will send you the OTP to reset your password.',
    },
    {
      question: 'Do I get to view the final art before receiving it?',
      answer:
        'Absolutely! GameifyMe team will email you the final art and ensure you approve the art before its drawn',
    },

  ];

  // Function to toggle FAQ open state
  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Collapse if the same FAQ is clicked
    } else {
      setActiveIndex(index); // Expand the clicked FAQ
    }
  };

  return (
    <>
      <Navbar />
      <FaqsContainer>
        <Header>Frequently Asked Questions</Header>
        <SubHeader>Get answers to your most commonly asked questions.</SubHeader>
        <FAQsGrid>
          {faqs.map((faq, index) => (
            <FAQItemContainer key={index}>
              <QuestionContainer
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <ToggleIcon>
                  {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </ToggleIcon>
                <QuestionText>{faq.question}</QuestionText>
              </QuestionContainer>
              <Answer id={`faq-answer-${index}`} isOpen={activeIndex === index}>
                {faq.answer}
              </Answer>
            </FAQItemContainer>
          ))}
        </FAQsGrid>
      </FaqsContainer>
    </>
  );
};

export default Faqs;
