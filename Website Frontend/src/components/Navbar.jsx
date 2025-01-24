import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  display: ${(props) => (props.open ? 'block' : 'none')};
  min-width: 150px;
  z-index: 1000; /* Ensure dropdown is above other elements */

  li {
    padding: 0.5rem 1rem;
    a, button {
      color: #333;
      text-decoration: none;
      background: none;
      border: none;
      width: 100%;
      text-align: left;
      cursor: pointer;
      font-size: 0.95rem;
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

const UserName = styled.div`
  position: relative;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
`;

const UserDropdownContent = styled.ul`
  position: absolute;
  top: 30px; 
  right: 0;
  background-color: #fff;
  list-style: none;
  padding: 0.5rem;
  margin: 0;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  display: ${(props) => (props.open ? 'block' : 'none')};
  min-width: 150px;
  z-index: 1000; /* Ensure dropdown is above other elements */

  li {
    padding: 0.5rem 1rem;
    a, button {
      color: #333;
      text-decoration: none;
      background: none;
      border: none;
      width: 100%;
      text-align: left;
      cursor: pointer;
      font-size: 0.95rem;
    }
    &:hover {
      background-color: #f2f2f2;
    }
  }
`;


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [getHelpDropdownOpen, setGetHelpDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const getHelpRef = useRef();
  const userDropdownRef = useRef();

  const rawData = localStorage.getItem('user');
  let user = null;
  if (rawData) {
    const parsed = JSON.parse(rawData);
    user = parsed.findUser || parsed;
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (menuOpen) {
      setGetHelpDropdownOpen(false);
      setUserDropdownOpen(false);
    }
  };

  // Toggle Get Help dropdown
  const toggleGetHelpDropdown = (e) => {
    e.stopPropagation();
    setGetHelpDropdownOpen(!getHelpDropdownOpen);
    setUserDropdownOpen(false); // Close user dropdown if open
  };

  // Toggle User dropdown
  const toggleUserDropdown = (e) => {
    e.stopPropagation();
    setUserDropdownOpen(!userDropdownOpen);
    setGetHelpDropdownOpen(false); // Close Get Help dropdown if open
  };

  // Logout handler
  const handleLogout = () => {

    localStorage.removeItem('user');
    localStorage.removeItem('token');


    // Redirect to login page
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (getHelpRef.current && !getHelpRef.current.contains(event.target)) {
        setGetHelpDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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



              <NavItem style={{ position: 'relative' }} ref={getHelpRef}>
                <DropdownItem onClick={toggleGetHelpDropdown}>Get Help ▾</DropdownItem>
                <DropdownContent open={getHelpDropdownOpen}>
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
            {user ? (
              <Link to="/cart">
                <CartButton>
                  <img src="/assets/icons/cart.png" alt="Cart" />
                  {cartCount > 0 && <CartBadge />}
                </CartButton>
              </Link>
            ) : (<Link to="/login">
              <CartButton>
                <img src="/assets/icons/cart.png" alt="Cart" />
                {cartCount > 0 && <CartBadge />}
              </CartButton>
            </Link>)}

            {user ? (
              <UserName ref={userDropdownRef} onClick={toggleUserDropdown}>
                Hi, {user.firstName} ▾
                <UserDropdownContent open={userDropdownOpen}>
                  <li>
                    <Link to="/order-history">Order History</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </UserDropdownContent>
              </UserName>
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