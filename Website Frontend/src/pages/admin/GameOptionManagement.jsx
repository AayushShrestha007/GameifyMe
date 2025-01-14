import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AdminNavbar from '../../components/AdminNavbar';

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #333;
  margin: 0;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background-color: #FECF08;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  
`;

const Message = styled.p`
  font-size: 20px;
  color: #666;
  text-align: center;
  margin-top: 40px;
`;

const GameOptionManagement = () => {
  const navigate = useNavigate();
  const [gameOptions, setGameOptions] = useState([]);

  const handleAddGameOption = () => {
    navigate('/admin/add-game-option');
  };

  return (
    <>
      <AdminNavbar />
      <Container>
        <Header>
          <Title>Manage Game Options</Title>
          <AddButton onClick={handleAddGameOption}>Add Game Option</AddButton>
        </Header>

        {gameOptions.length === 0 ? (
          <Message>No Game Option Added Yet</Message>
        ) : (
          // Future implementation: Render list of game options here.
          <div>{/* List of game options will go here */}</div>
        )}
      </Container>
    </>
  );
};

export default GameOptionManagement;
