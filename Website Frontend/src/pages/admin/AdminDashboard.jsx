import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AdminNavbar from '../../components/AdminNavbar';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Heading = styled.h1`
  font-size: 32px;
  color: #333;
  margin-bottom: 40px;
`;

const AddProductButton = styled.button`
  padding: 12px 24px;
  background-color: #FECF08;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  margin-bottom: 20px;
`;

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate('/admin/product-management');
  };

  return (
    <>
      <AdminNavbar />
      <DashboardContainer>
        <Heading>Manage Your Orders</Heading>
        <AddProductButton onClick={handleAddProduct}>
          Manage Products
        </AddProductButton>
        {/* Future content for managing orders can be added here */}
      </DashboardContainer>
    </>
  );
};

export default AdminDashboard;
