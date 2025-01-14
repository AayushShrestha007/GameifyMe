import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled, { keyframes } from 'styled-components';
import {
  decreaseCartItem,
  getCartItem,
  increaseCartItem,
  removeCartItem
} from '../../apis/Api';
import Navbar from '../../components/Navbar';

const sampleImages = [
  '/assets/images/cart_banner/cart 1.jpg',
  '/assets/images/cart_banner/cart 2.jpg',
  '/assets/images/cart_banner/cart 3.jpg',
  '/assets/images/cart_banner/cart 4.jpg',
];

/* Keyframes for scrolling images */
const scrollAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

/* Container for the entire cart page */
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  margin-top: 30px;
  box-sizing: border-box;
`;

/* Title at the center */
const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
  text-align: center;
`;

/* Scrolling container for images */
const ScrollingContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  height: 200px;
  margin-bottom: 20px;
`;

/* Wrapper that scrolls from left to right */
const ImagesWrapper = styled.div`
  display: flex;
  width: 60%;
  gap: 30px;
  animation: ${scrollAnimation} 20s linear infinite;
  &:hover {
    animation-play-state: paused;
  }
`;

/* Each scrolling image */
const ScrollingImage = styled.img`
  width: 25%;
  height: 100%;
  object-fit: cover;
`;

/* Divider line */
const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #ccc;
  margin: 20px 0;
`;

/* "Your Cart" heading */
const CartHeader = styled.h1`
  width: 100%;
  text-align: left;
  margin-bottom: 20px;
  margin-left: 45px;
  font-size: 24px;
`;

/* Main cart layout: items on left, summary on right */
const CartContent = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
`;

/* Left section with cart items */
const CartItemsSection = styled.div`
  margin-left: 30px;
  flex: 2;
`;

/* Single cart item row */
const CartItemRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

/* Product image style */
const ProductImage = styled.img`
  width: 220px;
  height: 220px;
  object-fit: cover;
  margin-right: 20px;
`;

/* Container for item details */
const CartItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

/* Product name text */
const ProductName = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

/* Container for the item-specific buttons (delete, plus, quantity, minus) */
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

/* Generic button style */
const Button = styled.button`
  padding: 8px 12px;
  background-color: #ed4708;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 24px;
`;

/* Icon button for delete */
const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const DeleteIcon = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
`;

/* Quantity text displayed between plus and minus */
const QuantityText = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

/* Right side summary container */
const SummarySection = styled.div`
  flex: 1;
  margin-left: 40px;
  margin-top: 30px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

/* Summary row label and value */
const SummaryRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

const SummaryLabel = styled.span`
  font-weight: bold;
`;

const SummaryValue = styled.span``;

const CheckoutButton = styled(Button)`
  background-color: #fecf08;
  color: #000;
  font-weight: bold;
  margin-top: 10px;
`;

const CartPage = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const shippingCost = 100;

  // Fetch cart items
  const fetchCartData = async () => {
    try {
      const res = await getCartItem();
      if (res.data.success) {
        setCartItems(res.data.cartItems);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
      toast.error("Failed to fetch cart items");
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  // 1. Increment item => calls increaseCartItem API
  const handleIncrement = async (cartItemId) => {
    try {
      const res = await increaseCartItem({ cartItemId });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchCartData();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Increment cart item error:', error);
      toast.error('Failed to increment cart item');
    }
  };

  // 2. Decrement item => calls decreaseCartItem API
  const handleDecrement = async (cartItemId) => {
    try {
      const res = await decreaseCartItem({ cartItemId });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchCartData();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Decrement cart item error:', error);
      toast.error('Failed to decrement cart item');
    }
  };

  // 3. Delete => calls removeCartItem API
  const handleDelete = async (cartItemId) => {
    try {
      const res = await removeCartItem({ cartItemId });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchCartData();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Delete cart item error:', error);
      toast.error('Failed to delete cart item');
    }
  };

  // Compute subTotal from each cartItem's price
  const subTotal = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);
  const total = subTotal + shippingCost;

  return (
    <>
      <Navbar />
      <PageContainer>
        {/* 1. Title text */}
        <Title>Cart</Title>

        {/* 2. Scrolling images horizontally */}
        <ScrollingContainer>
          <ImagesWrapper>
            {sampleImages.map((img, i) => (
              <ScrollingImage key={i} src={img} alt={`Banner ${i + 1}`} />
            ))}
            {sampleImages.map((img, i) => (
              <ScrollingImage key={`dup-${i}`} src={img} alt={`Banner dup ${i + 1}`} />
            ))}
          </ImagesWrapper>
        </ScrollingContainer>

        {/* 3. Horizontal line */}
        <Divider />

        {/* 4. If cart is empty, show message. Otherwise show cart layout */}
        {cartItems.length === 0 ? (
          <p style={{ width: '100%', marginLeft: '45px', fontSize: '18px' }}>
            No item available in the cart
          </p>
        ) : (
          <>
            <CartHeader>Your Cart</CartHeader>
            <CartContent>
              {/* Left side cart items */}
              <CartItemsSection>
                {cartItems.map((item) => (
                  <CartItemRow key={item._id}>
                    <ProductImage
                      src={
                        item.gameOption?.exampleImages?.[0]
                          ? `http://localhost:5500/${item.gameOption.exampleImages[0]}`
                          : '/assets/path_to_main_product.jpg'
                      }
                      alt={item.gameOption?.name || 'Cart product'}
                    />
                    <CartItemDetails>
                      <ProductName>{item.gameOption?.name || 'No Name'}</ProductName>
                      {/* Buttons: Delete icon, plus, quantity, minus */}
                      <ButtonsContainer>
                        {/* Button has been hidden to disable delete funcitionality */}
                        {/* <IconButton onClick={() => handleDelete(item._id)}>
                          <DeleteIcon src="/assets/icons/delete.jpg" alt="Delete" />
                        </IconButton> */}
                        <Button onClick={() => handleIncrement(item._id)}>+</Button>
                        <QuantityText>1</QuantityText>
                        <Button onClick={() => handleDecrement(item._id)}>-</Button>
                      </ButtonsContainer>
                    </CartItemDetails>
                  </CartItemRow>
                ))}
              </CartItemsSection>

              {/* Right side summary */}
              <SummarySection>
                <SummaryRow>
                  <SummaryLabel>Sub Total:</SummaryLabel>
                  <SummaryValue>Rs {subTotal}</SummaryValue>
                </SummaryRow>
                <SummaryRow>
                  <SummaryLabel>Shipping Cost:</SummaryLabel>
                  <SummaryValue>Rs {shippingCost}</SummaryValue>
                </SummaryRow>
                <SummaryRow>
                  <SummaryLabel>Total:</SummaryLabel>
                  <SummaryValue>Rs {total}</SummaryValue>
                </SummaryRow>
                <CheckoutButton onClick={() => navigate('/checkout')}>Checkout</CheckoutButton>
              </SummarySection>
            </CartContent>
          </>
        )}
      </PageContainer>
    </>
  );
};

export default CartPage;
