import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { registerUserApi } from '../../../apis/Api';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const FormWrapper = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 350px;
  padding: 40px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Label = styled.label`
  text-align: left;
  font-size: 14px;
  margin-top: 12px;
  color: #555;
`;

const Input = styled.input`
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: 5px 0 0 0;
  text-align: left;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color: #108A00;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

const Text = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #666;
`;

const Register = () => {
    // State Section
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');

    // Error states
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [phoneError, setPhoneError] = useState('');


    // Handlers
    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);
    const handlePhone = (e) => setPhone(e.target.value);

    const navigate = useNavigate()

    // Validation

    const validate = () => {
        let isValid = true;

        // Clear out old errors
        setFirstNameError('');
        setLastNameError('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setPhoneError('');

        // Validate firstName
        if (firstName.trim() === '') {
            setFirstNameError('First name is required');
            isValid = false;
        }

        // Validate lastName
        if (lastName.trim() === '') {
            setLastNameError('Last name is required');
            isValid = false;
        }

        // Validate email
        if (email.trim() === '') {
            setEmailError('Email is required');
            isValid = false;
        }

        // Validate password
        if (password.trim() === '') {
            setPasswordError('Password is required');
            isValid = false;
        }

        // Validate confirmPassword
        if (confirmPassword.trim() === '') {
            setConfirmPasswordError('Confirm Password is required');
            isValid = false;
        } else if (confirmPassword.trim() !== password.trim()) {
            setConfirmPasswordError("Passwords don't match");
            isValid = false;
        }

        // Validate phone
        if (phone.trim() === '') {
            setPhoneError('Phone is required');
            isValid = false;
        }

        return isValid;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const data = {
            firstName,
            lastName,
            email,
            password,
            phone,
        };

        registerUserApi(data)
            .then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message)
                }
                else {
                    toast.success('Register Successful');
                    console.log(res.data);
                    navigate('/login');
                }
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('Something went wrong during registration');
                }
                console.error(error);
            });

    };


    return (
        <Container>
            <FormWrapper>
                <Title>Create An Account</Title>
                <StyledForm>
                    {/* First Name */}
                    <Label>First Name</Label>
                    <Input
                        onChange={handleFirstName}
                        value={firstName}
                        type="text"
                        placeholder="Enter your first name"
                    />
                    {firstNameError && <ErrorMessage>{firstNameError}</ErrorMessage>}

                    {/* Last Name */}
                    <Label>Last Name</Label>
                    <Input
                        onChange={handleLastName}
                        value={lastName}
                        type="text"
                        placeholder="Enter your last name"
                    />
                    {lastNameError && <ErrorMessage>{lastNameError}</ErrorMessage>}

                    {/* Email */}
                    <Label>Email</Label>
                    <Input
                        onChange={handleEmail}
                        value={email}
                        type="text"
                        placeholder="Enter your email"
                    />
                    {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

                    {/* Password */}
                    <Label>Password</Label>
                    <Input
                        onChange={handlePassword}
                        value={password}
                        type="password"
                        placeholder="Enter your password"
                    />
                    {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

                    {/* Confirm Password */}
                    <Label>Confirm Password</Label>
                    <Input
                        onChange={handleConfirmPassword}
                        value={confirmPassword}
                        type="password"
                        placeholder="Confirm your password"
                    />
                    {confirmPasswordError && <ErrorMessage>{confirmPasswordError}</ErrorMessage>}

                    {/* Phone */}
                    <Label>Phone</Label>
                    <Input
                        onChange={handlePhone}
                        value={phone}
                        type="text"
                        placeholder="Enter your phone number"
                    />
                    {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}

                    <Button onClick={handleSubmit}>Create An Account</Button>
                </StyledForm>

                <Text>
                    Already have an account? <Link to="/login">Login</Link>
                </Text>
            </FormWrapper>
        </Container>
    );
};

export default Register;