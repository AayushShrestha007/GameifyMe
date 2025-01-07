import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { loginUserApi } from '../../../apis/Api';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const LoginFormWrapper = styled.div`
  display: flex;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* You can remove the display:flex if you want a single-column layout */
`;

const LoginForm = styled.div`
  width: 300px;
  padding: 40px;
  text-align: center;
  margin: auto; /* centers the form if using flex above */
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #108A00;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
`;

const Text = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #666;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: 5px 0 0 0;
  text-align: left;
`;

const LoginPage = () => {

  // State

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Error states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Navigation
  const navigate = useNavigate();


  // Validation

  const validate = () => {
    let isValid = true;

    setEmailError('');
    setPasswordError('');

    if (email.trim() === '' || !email.includes('@')) {
      setEmailError('Valid email is required');
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    }

    return isValid;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = { email, password };

    loginUserApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message)
        }
        else {
          toast.success(res.data.message);

          // Store token in localStorage
          localStorage.setItem('token', res.data.token);

          // Store user data
          const convertedData = JSON.stringify(res.data.userData);
          localStorage.setItem('user', convertedData);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Something went wrong during login');
        }
        console.error(error);
      });
  };


  return (
    <Container>
      <LoginFormWrapper>
        <LoginForm>
          <Title>Login Here</Title>
          <Input
            type="text"
            placeholder="Email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

          <Button onClick={handleSubmit}>Login</Button>

          <Text>
            Don’t have an account? <Link to="/register">Register</Link>
          </Text>
        </LoginForm>
      </LoginFormWrapper>
    </Container>
  );
};

export default LoginPage;