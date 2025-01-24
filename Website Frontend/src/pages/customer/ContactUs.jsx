// src/pages/customer/ContactUs.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import { sendContactEmail } from '../../apis/Api'; // Adjust the import path as needed
import Navbar from '../../components/Navbar';

// Styled Components

// Container for the entire Contact Us page
const ContactUsContainer = styled.div`
  padding: 100px 20px 50px 20px; /* Top padding accounts for fixed Navbar */
  max-width: 800px;
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

// Form Container
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

// Label for input fields
const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

// Input fields for Name and Email
const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:disabled {
    background-color: #f2f2f2;
  }
`;

// Textarea for Message
const TextArea = styled.textarea`
  padding: 10px;
  height: 150px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

// Submit Button
const SubmitButton = styled.button`
  padding: 12px;
  background-color: #FECF08;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1em;

  &:disabled {
    background-color: #a04300;
    cursor: not-allowed;
  }
`;

const ContactUs = () => {
    // State to hold form data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // State to handle form submission status
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Effect to fetch user data from localStorage on component mount
    useEffect(() => {
        const rawData = localStorage.getItem('user');
        let user = null;
        if (rawData) {
            const parsed = JSON.parse(rawData);
            user = parsed.findUser || parsed;
        }

        if (user) {
            setName(user.firstName || '');
            setEmail(user.email || '');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!name.trim() || !email.trim() || !message.trim()) {
            toast.error('Please fill in all fields.');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await sendContactEmail({
                name,
                email,
                message,
            });

            if (response.status === 200) {
                navigate('/contact-success');
                setMessage('');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            if (error.response && error.response.data && error.response.data.msg) {
                toast.error(error.response.data.msg);
            } else {
                toast.error('Failed to send the message. Please try again later.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />
            <ContactUsContainer>
                <Header>Contact Us</Header>
                <SubHeader>Fill in the form below and we will get back to you soon</SubHeader>
                <Form onSubmit={handleSubmit}>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}


                    />

                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />

                    <Label htmlFor="message">Message</Label>
                    <TextArea
                        id="message"
                        name="message"
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}

                    />

                    <SubmitButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send'}
                    </SubmitButton>
                </Form>
            </ContactUsContainer>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </>
    );
};

export default ContactUs;
