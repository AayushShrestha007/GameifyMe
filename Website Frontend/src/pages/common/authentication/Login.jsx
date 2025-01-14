import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { loginUserApi } from '../../../apis/Api';
import Navbar from '../../../components/Navbar';

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  padding-top: 20px;
`;

const LoginSection = styled.div`
  background: rgb(255, 255, 255);
  border-radius: 10px;
  width: 350px;
  padding: 40px;
  margin-top: 40px;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  font-size: 32px;
  color: #333;
  text-align: left;
  margin-left: 0;
`;

const Label = styled.label`
  font-size: 20px;
  color: #555;
  display: block;
  margin-top: 20px;
`;

const Input = styled.input`
  margin-bottom: 20px;
  width: 94%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 20px;
`;

const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PasswordInput = styled(Input)`
  padding-right: 40px; /* Space for the toggle button */
`;

const ToggleButton = styled.span`
  position: absolute;
  right: 10px;
  top: 12px;
  cursor: pointer;
`;

const IconImage = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: 5px 0 0 0;
`;

const Button = styled.button`
  display: block;
  width: 60%;
  padding: 10px;
  margin: 25px auto 0 71px;
  border: none;
  border-radius: 15px;
  background-color: #FECF08;
  color: black;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 30px;
`;

const ForgotPassword = styled.p`
  margin-top: 15px;
  font-size: 20px;
  text-align: center;
  text-decoration: underline;
  color: #1E90FF;
  font-weight: bold;
  cursor: pointer;
`;

const Divider = styled.hr`
  width: 110%;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 25px 0;
`;

const SmallText = styled.p`
  color: #666;
  font-size: 20px;
  margin-top: 10px;
  text-align: center;
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

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
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          localStorage.setItem('token', res.data.token);
          const convertedData = JSON.stringify(res.data.userData);
          localStorage.setItem('user', convertedData);
          if (res.data.userData.findUser.isAdmin) {
            navigate('/admin/dashboard');
          } else {
            navigate('/');
          }
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Something went wrong during login');
        }
      });
  };

  return (
    <>
      <Navbar />

      <ContentWrapper>
        <LoginSection>
          <Title>Customer Login</Title>

          <Label>Email*</Label>
          <Input
            type="text"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

          <Label>Password*</Label>
          <PasswordWrapper>
            <PasswordInput
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <ToggleButton onClick={() => setShowPassword(!showPassword)}>
              <IconImage
                src={
                  showPassword
                    ? '/assets/icons/eye_unhidden.png'
                    : '/assets/icons/eye_hidden.png'
                }
                alt={showPassword ? "Hide Password" : "Show Password"}
              />
            </ToggleButton>
          </PasswordWrapper>
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

          <Button onClick={handleSubmit}>Login</Button>
          <ForgotPassword>Forgot Password?</ForgotPassword>
          <Divider />
          <SmallText>
            New To GamiefyMe? <Link to="/register">Register Here</Link>
          </SmallText>
        </LoginSection>
      </ContentWrapper>
    </>
  );
};

export default LoginPage;
