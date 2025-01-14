import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getAllGameOptionApi } from '../../apis/Api';
import Navbar from '../../components/Navbar';


const PageContainer = styled.div`
  padding: 20px;
  margin-top: 50px;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 32px;
  margin-bottom: 40px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 100px;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);  
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;  
  }
`;

const GameOptionCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const GameOptionImage = styled.img`
  width: 50%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const GameOptionName = styled.h2`
  font-size: 20px;
  margin: 10px 0;
`;

const GameOptionDescription = styled.p`
  font-size: 14px;
  color: #555;
`;

const ChooseStyle = () => {
  const [gameOptions, setGameOptions] = useState([]);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await getAllGameOptionApi();
        if (response.data.success) {
          setGameOptions(response.data.gameOptions);
        }
      } catch (error) {
        console.error("Error fetching game options:", error);
      }
    }
    fetchOptions();
  }, []);

  return (
    <>
      <Navbar />
      <PageContainer>
        <Header>The perfect personalized gift</Header>
        {gameOptions.length === 0 ? (
          <p>No game options available.</p>
        ) : (
          <GridContainer>
            {gameOptions.map(option => (
              <Link key={option._id} to={`/game-option/${option._id}`} style={{ textDecoration: 'none' }}>
                <GameOptionCard>
                  {option.exampleImages && option.exampleImages[0] && (
                    <GameOptionImage
                      src={`http://localhost:5500/${option.exampleImages[0]}`}
                      alt={option.name}
                    />
                  )}
                  <GameOptionName>{option.name}</GameOptionName>
                  <GameOptionDescription>{option.description}</GameOptionDescription>
                </GameOptionCard>
              </Link>
            ))}
          </GridContainer>
        )}
      </PageContainer>
    </>
  );
};

export default ChooseStyle;
