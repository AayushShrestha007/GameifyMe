import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TopImageBanner = styled.img`
  width: 100%;
  height: auto;     
  object-fit: cover; 
`;


const Banner = styled.div`
  background-color: #ED4708;
  color: #fff;
  width: 100%;
  text-align: center;
  padding: 20px 0;      
  font-size: 16px;
  font-weight: bold;
`;

const SubHeading = styled.h2`
  color: #ED4708;
  margin-top: 20px;  /* space from the banner */
  font-size: 28px;   /* adjust as needed */
  text-align: center;
  font-weight: bold;
`;


const BottomImagesRow = styled.div`
  display: flex;
  width: 15%;       
  justify-content: center;
  gap: 70px;        
  margin: 20px 0;   
  
  img {
    flex: 1;
    width: 100%;   
    height: auto;
    object-fit: cover;
  }
`;


const GiftButton = styled.button`
  background-color: #FECF08;
  color: #000;
  font-size: 30px;    
  font-weight: bold;  
  padding: 15px 25px; 
  margin-bottom: 40px;
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;


const Home = () => {
  return (

    <>
      <Navbar></Navbar>
      <HomeContainer>


        <TopImageBanner
          src="/assets/images/banner/banner.jpg"
          alt="Combined Banner"
        />


        <Banner>
          We Turn Your Loved Ones To Game Character
        </Banner>

        <SubHeading>Here’s how it works</SubHeading>

        <BottomImagesRow>

          <img src="/assets/images/instruction/instruction 1.png" alt="Bot 1" />
          <img src="/assets/images/instruction/instruction 2.png" alt="Bot 2" />
          <img src="/assets/images/instruction/instruction 3.png" alt="Bot 3" />
          <img src="/assets/images/instruction/instruction 4.png" alt="Bot 4" />
        </BottomImagesRow>


       
        <Link to="/">
          <GiftButton>Get The Perfect Gift</GiftButton>
        </Link>
      </HomeContainer>
    </>
  );
};

export default Home;
