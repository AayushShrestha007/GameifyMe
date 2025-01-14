import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: #ED4708;
  width: 100%;
  padding: 0 1rem;
`;

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 60px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  img {
    width: 70px;
    height: auto;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
`;

const LoginButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 6px 12px;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
`;

const AdminNavbar = () => {
  const rawData = localStorage.getItem('user');
  let user = null;
  if (rawData) {
    const parsed = JSON.parse(rawData);
    user = parsed.findUser || parsed;
  }

  return (
    <NavbarContainer>
      <NavWrapper>
        <Logo to="/admin/dashboard">
          <img src="/assets/logo.png" alt="GameifyMe Logo" />
        </Logo>
        <RightSection>
          {user ? (
            <span>Hi, {user.firstName}</span>
          ) : (
            <Link to="/login">
              <LoginButton>Login</LoginButton>
            </Link>
          )}
        </RightSection>
      </NavWrapper>
    </NavbarContainer>
  );
};

export default AdminNavbar;
