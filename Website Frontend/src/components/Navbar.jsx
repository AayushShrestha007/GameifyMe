import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CartContext } from '../../src/context/cartContext';


const NavbarContainer = styled.nav`
  background-color: #ED4708;
  width: 100%;
  padding: 0 1rem;
position: fixed; top: 0; width: 100%;
`;


const NavWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;  
  align-items: center;
  justify-content: space-between;
  max-width: 1200px; 
  margin: 0 auto;    
  min-height: 60px;
`;


const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  img {
    width: 70px;  
    height: auto;   
  }
`;


const Hamburger = styled.div`
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
`;



const NavMenu = styled.ul`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1rem;
`;

const NavItem = styled.li`
  a {
    color: white;
    text-decoration: none;
    font-size: 1rem;
    &:hover {
      text-decoration: underline;
    }
  }
`;


const DropdownItem = styled.div`
  position: relative;
  color: white;
  cursor: pointer;
`;

const CartBadge = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: #fecf08;
  width: 12px;
  height: 12px;
  border-radius: 50%;
`;

const DropdownContent = styled.ul`
  position: absolute;
  top: 40px; 
  left: 0;
  background-color: #fff;
  list-style: none;
  padding: 0.5rem;
  margin: 0;
  border-radius: 4px;
  display: ${(props) => (props.open ? 'block' : 'none')};

  li {
    padding: 0.5rem 1rem;
    a {
      color: #333;
      text-decoration: none;
    }
    &:hover {
      background-color: #f2f2f2;
    }
  }
`;


const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CartButton = styled.div`
  cursor: pointer;
  img {
    width: 24px;
    height: 24px;
  }
`;

const LoginButton = styled.button`
  background-color: transparent;
  border: 1px transparent;
  padding: 6px 12px;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
`;

const SmallScreenStyles = styled.div`
  @media (max-width: 400px) {
    ${Logo} {
      font-size: 1rem;
    }
    ${Hamburger} {
      font-size: 1.3rem;
    }
    ${CartButton} img {
      width: 20px;
      height: 20px;
    }
    ${LoginButton} {
      font-size: 0.8rem;
      padding: 4px 8px;
    }
  }
`;


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { cartCount } = useContext(CartContext);

  const rawData = localStorage.getItem('user');
  let user = null;
  if (rawData) {
    const parsed = JSON.parse(rawData);
    user = parsed.findUser || parsed;
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);

    if (menuOpen) {
      setDropdownOpen(false);
    }
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <SmallScreenStyles>
      <NavbarContainer>
        <NavWrapper>

          <LeftSection>
            <Logo to="/"> <img src="/assets/logo.png" alt="GameifyMe Logo" /></Logo>
            <Hamburger onClick={toggleMenu}>☰</Hamburger>


            <NavMenu isOpen={menuOpen}>
              <NavItem>
                <Link to="/choose-style">Choose Your Style</Link>
              </NavItem>
              <NavItem>
                <Link to="/our-story">Our Story</Link>
              </NavItem>

              <NavItem style={{ position: 'relative' }}>
                <DropdownItem onClick={toggleDropdown}>Get Help</DropdownItem>
                <DropdownContent open={dropdownOpen}>
                  <li>
                    <Link to="/contact-us">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="/faqs">FAQs</Link>
                  </li>
                </DropdownContent>
              </NavItem>
              <NavItem>
                <Link to="/reviews">Reviews</Link>
              </NavItem>
            </NavMenu>
          </LeftSection>


          <RightSection>
            <Link to="/cart">
              <CartButton>
                <img src="/assets/icons/cart.png" alt="Cart" />
                {cartCount > 0 && <CartBadge />}
              </CartButton>
            </Link>
            {user ? (
              <span style={{ color: 'white', fontSize: '0.9rem' }}>
                Hi, {user.firstName}
              </span>
            ) : (
              <Link to="/login">
                <LoginButton>Login</LoginButton>
              </Link>
            )}
          </RightSection>
        </NavWrapper>
      </NavbarContainer>
    </SmallScreenStyles>
  );
};

export default Navbar;
