import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { registerUserApi } from '../../../apis/Api';
import Navbar from '../../../components/Navbar';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #FFFFFF;
  padding-bottom: 40px;
`;

const FormWrapper = styled.div`
  background: #fff;
  border-radius: 10px;
  width: 350px;
  padding: 40px;
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 32px;
  color: #333;
  text-align: left;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Row = styled.div`
  display: flex;
  gap: 30px;
`;

const HalfInputContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 18px;
  color: #555;
  display: block;
  margin-top: 20px;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 18px;
`;

const IconImage = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;


const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PasswordInput = styled(Input)`
  padding-right: 40px;
`;

const ToggleButton = styled.span`
  position: absolute;
  right: 10px;
  cursor: pointer;
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: 5px 0 0 0;
  text-align: left;
`;

const Button = styled.button`
  display: block;
  width: 90%;
  padding: 10px;
  margin: 35px auto 0 30px;
  border: none;
  border-radius: 15px;
  background-color: #FECF08;
  color: black;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 30px;
`;

const Text = styled.p`
  margin-top: 10px;
  font-size: 18px;
  color: #666;
`;

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [cityError, setCityError] = useState('');
    const [postalCodeError, setPostalCodeError] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);
    const handlePhone = (e) => setPhone(e.target.value);
    const handleAddress = (e) => setAddress(e.target.value);
    const handleCity = (e) => setCity(e.target.value);
    const handlePostalCode = (e) => setPostalCode(e.target.value);

    const validate = () => {
        let isValid = true;
        setFirstNameError('');
        setLastNameError('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setPhoneError('');
        setAddressError('');
        setCityError('');
        setPostalCodeError('');

        if (firstName.trim() === '') {
            setFirstNameError('First name is required');
            isValid = false;
        }
        if (lastName.trim() === '') {
            setLastNameError('Last name is required');
            isValid = false;
        }
        if (email.trim() === '') {
            setEmailError('Email is required');
            isValid = false;
        }
        if (password.trim() === '') {
            setPasswordError('Password is required');
            isValid = false;
        }
        if (confirmPassword.trim() === '') {
            setConfirmPasswordError('Confirm Password is required');
            isValid = false;
        } else if (confirmPassword.trim() !== password.trim()) {
            setConfirmPasswordError("Passwords don't match");
            isValid = false;
        }
        if (phone.trim() === '') {
            setPhoneError('Phone is required');
            isValid = false;
        }
        if (address.trim() === '') {
            setAddressError('Address is required');
            isValid = false;
        }
        if (city.trim() === '') {
            setCityError('City is required');
            isValid = false;
        }
        if (postalCode.trim() === '') {
            setPostalCodeError('Postal Code is required');
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
            address,
            city,
            postalCode
        };
        registerUserApi(data)
            .then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message);
                } else {
                    toast.success('Register Successful');
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
        <>
            <Navbar />
            <Container>
                <FormWrapper>
                    <Title>Create An Account</Title>
                    <StyledForm>
                        <Row>
                            <HalfInputContainer>
                                <Label>First Name*</Label>
                                <Input
                                    onChange={handleFirstName}
                                    value={firstName}
                                    type="text"
                                    placeholder="Enter first name"
                                />
                                {firstNameError && <ErrorMessage>{firstNameError}</ErrorMessage>}
                            </HalfInputContainer>
                            <HalfInputContainer>
                                <Label>Last Name*</Label>
                                <Input
                                    onChange={handleLastName}
                                    value={lastName}
                                    type="text"
                                    placeholder="Enter last name"
                                />
                                {lastNameError && <ErrorMessage>{lastNameError}</ErrorMessage>}
                            </HalfInputContainer>
                        </Row>

                        <Label>Email*</Label>
                        <Input
                            onChange={handleEmail}
                            value={email}
                            type="text"
                            placeholder="Enter email"
                        />
                        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

                        <Label>Phone*</Label>
                        <Input
                            onChange={handlePhone}
                            value={phone}
                            type="text"
                            placeholder="Enter phone number"
                        />
                        {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}

                        <Row>
                            <HalfInputContainer>
                                <Label>Password*</Label>
                                <PasswordWrapper>
                                    <PasswordInput
                                        onChange={handlePassword}
                                        value={password}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                    />
                                    <ToggleButton onClick={() => setShowPassword(!showPassword)}>
                                        <IconImage
                                            src={`/assets/icons/${showPassword ? 'eye_unhidden.png' : 'eye_hidden.png'}`}
                                            alt={showPassword ? "Hide Password" : "Show Password"}
                                        />
                                    </ToggleButton>
                                </PasswordWrapper>

                                {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
                            </HalfInputContainer>
                            <HalfInputContainer>
                                <Label>Confirm Password*</Label>
                                <PasswordWrapper>
                                    <PasswordInput
                                        onChange={handleConfirmPassword}
                                        value={confirmPassword}
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm Password"
                                    />
                                    <ToggleButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        <IconImage
                                            src={`/assets/icons/${showConfirmPassword ? 'eye_unhidden.png' : 'eye_hidden.png'}`}
                                            alt={showConfirmPassword ? "Hide Password" : "Show Password"}
                                        />
                                    </ToggleButton>
                                </PasswordWrapper>

                                {confirmPasswordError && <ErrorMessage>{confirmPasswordError}</ErrorMessage>}
                            </HalfInputContainer>
                        </Row>

                        <Label>Address*</Label>
                        <Input
                            onChange={handleAddress}
                            value={address}
                            type="text"
                            placeholder="Enter address"
                        />
                        {addressError && <ErrorMessage>{addressError}</ErrorMessage>}

                        <Row>
                            <HalfInputContainer>
                                <Label>City*</Label>
                                <Input
                                    onChange={handleCity}
                                    value={city}
                                    type="text"
                                    placeholder="Enter city"
                                />
                                {cityError && <ErrorMessage>{cityError}</ErrorMessage>}
                            </HalfInputContainer>
                            <HalfInputContainer>
                                <Label>Postal Code*</Label>
                                <Input
                                    onChange={handlePostalCode}
                                    value={postalCode}
                                    type="text"
                                    placeholder="Enter postal code"
                                />
                                {postalCodeError && <ErrorMessage>{postalCodeError}</ErrorMessage>}
                            </HalfInputContainer>
                        </Row>

                        <Button onClick={handleSubmit}>Create An Account</Button>
                    </StyledForm>

                    <Text>
                        Already have an account? <Link to="/login">Login</Link>
                    </Text>
                </FormWrapper>
            </Container>
        </>
    );
};

export default Register;
