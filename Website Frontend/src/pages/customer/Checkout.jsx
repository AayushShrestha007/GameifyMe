import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { getCartItem, khaltiInitiate } from '../../apis/Api';
import Navbar from '../../components/Navbar';
// ^ Import getCartItem from your API file

// Example images:
// Logo -> `/assets/logo.png`
// "premium quality" -> `/assets/trust_builder/premium quality.png`
// "top rated artist" -> `/assets/trust_builder/top rated artist.png`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  min-height: 100vh;
  background-color:rgb(255, 255, 255);
  padding: 20px;
  box-sizing: border-box;
`;

const LeftSection = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  margin-right: 20px;
  border-radius: 10px;
`;

const RightSection = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 30px;
  margin-left: 20px;
  border-radius: 10px;
`;

const SectionHeading = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  text-align: left;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 20px 10px 10px 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  size: 20px;
  border: 1px solid #ccc;
`;
const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 0px;
`;
const PlaceOrderButton = styled.button`
  background-color: #ed4708;
  color: #fff;
  padding: 14px 24px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin: 0px auto 0 auto;
`;

/* Right side items */
const CartItemContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 15px;
  border-radius: 6px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const VerticalDivider = styled.div`
  width: 1px;
  background-color: #ccc;
  margin: 0 20px; 
`;

const ProductName = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const PeopleCount = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0 0 0;
  font-size: 14px;
`;

const HorizontalLine = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #ccc;
  margin: 20px 0;
`;

const Checkout = () => {
    // User’s contact/shipping info
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postCode, setPostCode] = useState('');

    // We'll store the entire cart array
    const [cartItems, setCartItems] = useState([]);
    // Then we'll derive subTotal, shippingCost, grandTotal
    const [subTotal, setSubTotal] = useState(0);
    const [shippingCost, setShippingCost] = useState(100);
    const [grandTotal, setGrandTotal] = useState(0);

    // For display, let's pick the first cart item (if it exists) as an example
    const [displayItem, setDisplayItem] = useState(null);

    // 1. On mount, auto-fill user from localStorage AND fetch cart
    useEffect(() => {
        // Fill user data from localStorage (or fetch from an API if you prefer)
        const userRaw = localStorage.getItem('user');
        if (userRaw) {
            const userData = JSON.parse(userRaw);
            const actualUser = userData.findUser || {};
            setEmail(actualUser.email || '');
            setPhoneNumber(actualUser.phone || '');
            setFirstName(actualUser.firstName || '');
            setLastName(actualUser.lastName || '');
            setAddress(actualUser.address || '');
            setCity(actualUser.city || '');
            setPostCode(actualUser.postalCode || '');
        }

        // Fetch cart items from the backend
        fetchCartData();
    }, []);

    // 2. fetchCartData function
    const fetchCartData = async () => {
        try {
            const res = await getCartItem();  // calls /api/cart/get-cart-items
            if (res.data.success) {
                const fetchedItems = res.data.cartItems;
                setCartItems(fetchedItems);

                // Compute subTotal
                const calcSubTotal = fetchedItems.reduce((acc, item) => acc + (item.price || 0), 0);
                setSubTotal(calcSubTotal);

                // shipping cost is 100 (or if your backend determines it, fetch it)
                const shipping = 100;
                setShippingCost(shipping);

                const total = calcSubTotal + shipping;
                setGrandTotal(total);

                // If we want to display just the first item
                if (fetchedItems.length > 0) {
                    const first = fetchedItems[0];
                    setDisplayItem({
                        // we'll assume first.gameOption has exampleImages
                        productImage: first.gameOption?.exampleImages?.[0]
                            ? `http://localhost:5500/${first.gameOption.exampleImages[0]}`
                            : '/assets/images/product.jpg',
                        productName: first.gameOption?.name || 'No Name',
                        peopleCount: first.peopleCount || 1,
                    });
                }
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Error fetching user cart:", error);
            toast.error("Failed to fetch cart items");
        }
    };

    // 3. handlePlaceOrder: gather shipping info & call placeOrder API
    // const handlePlaceOrder = async () => {
    //     try {
    //         // gather data 
    //         const data = {
    //             email,
    //             phoneNumber,
    //             firstName,
    //             lastName,
    //             address,
    //             city,
    //             postCode,
    //             // you might pass shippingCost / subTotal / grandTotal as well
    //         };

    //         // call placeOrder
    //         const response = await placeOrder(data);
    //         if (response.data.success) {
    //             toast.success("Order placed successfully!");
    //             // maybe navigate to an order success page or clear cart
    //         } else {
    //             toast.error(response.data.message || "Failed to place order.");
    //         }
    //     } catch (error) {
    //         console.error('Place order error:', error);
    //         toast.error('Error placing order');
    //     }
    // };

    //handle pay with khalti
    const handlePayWithKhalti = async () => {
        // Ensure necessary data is available
        if (!cartItems.length) {
            toast.error("Cart is empty");
            return;
        }

        const gameOptionId = cartItems[0]?.gameOption?._id; // Use first item's gameOption as an example
        const totalPrice = grandTotal; // totalPrice in rupees; ensure correct unit conversion if necessary
        const website_url = window.location.origin; // Current site URL

        try {
            const response = await khaltiInitiate({ gameOptionId, totalPrice, website_url, email, phoneNumber, firstName, lastName, address, city, postCode });
            if (response.data.success) {
                const paymentDetails = response.data.payment;
                // Redirect user to Khalti payment URL to complete payment
                window.location.href = paymentDetails.payment_url;
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Payment initiation error:", error);
            toast.error("Payment initiation failed.");
        }
    };

    return (
        <>
            <Navbar></Navbar>
            <Container>
                {/* Left side */}
                <LeftSection>
                    {/* 1. Logo on top */}
                    <img
                        src="/assets/checkout_logo.png"
                        alt="Logo"
                        style={{ width: '220px', margin: '20px auto 0px auto', display: 'block' }}
                    />

                    {/* 2. Title: Contact Details */}
                    <SectionHeading>Contact Details</SectionHeading>

                    {/* 3. Email field */}
                    <Label>Email Address</Label>
                    <Input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* 4. phoneNumber field */}
                    <Label>Phone Number</Label>
                    <Input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />

                    {/* 5. First name + Last name side by side */}
                    <Row>
                        <div style={{ flex: 1 }}>
                            <Label>First Name</Label>
                            <Input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <Label>Last Name</Label>
                            <Input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </Row>

                    {/* 6. Title: Delivery Address */}
                    <SectionHeading>Delivery Address</SectionHeading>

                    {/* 7. Address field */}
                    <Label>Address</Label>
                    <Input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    {/* 8. city + post code side by side */}
                    <Row>
                        <div style={{ flex: 1 }}>
                            <Label>City</Label>
                            <Input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <Label>Post Code</Label>
                            <Input
                                type="text"
                                value={postCode}
                                onChange={(e) => setPostCode(e.target.value)}
                            />
                        </div>
                    </Row>

                    {/* 9. Place Order button */}
                    <ButtonContainer>
                        <PlaceOrderButton onClick={handlePayWithKhalti}>
                            Place Order
                        </PlaceOrderButton>
                    </ButtonContainer>
                </LeftSection>
                <VerticalDivider />
                {/* Right side */}
                <RightSection>
                    {displayItem ? (
                        <>
                            {/* Show the first item’s image & details */}
                            {cartItems.map((item) => {
                                const imagePath = item.gameOption?.exampleImages?.[0]
                                    ? `http://localhost:5500/${item.gameOption.exampleImages[0]}`
                                    : '/assets/images/product.jpg';

                                return (
                                    <CartItemContainer key={item._id}>
                                        <ProductImage src={imagePath} alt={item.gameOption?.name || 'No Name'} />
                                        <ProductInfo>
                                            <ProductName>{item.gameOption?.name || 'No Name'}</ProductName>
                                            <PeopleCount>No. of People: {item.peopleCount || 1}</PeopleCount>
                                        </ProductInfo>
                                    </CartItemContainer>
                                );
                            })}
                        </>
                    ) : (
                        <p>No items in the cart.</p>
                    )}

                    {/* 3. Sub total */}
                    <p style={{ fontSize: '18px', fontWeight: 'bold' }}>

                        <span style={{ color: '#ED4708', fontSize: '18px', fontWeight: 'bold', marginLeft: '5px' }}>
                            Rs {subTotal}
                        </span>
                    </p>
                    {/* 4. Shipping cost */}
                    <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        Shipping Cost:

                        <span style={{ color: '#ED4708', fontSize: '18px', fontWeight: 'bold', marginLeft: '5px' }}>
                            Rs {shippingCost}
                        </span>
                    </p>
                    {/* 5. Grand total */}
                    <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        Grand Total:
                        <span style={{ color: '#FECF08', fontSize: '18px', fontWeight: 'bold', marginLeft: '5px' }}>
                            Rs {grandTotal}
                        </span>
                    </p>

                    <HorizontalLine></HorizontalLine>

                    {/* 7. Title: Why Customers Love Us */}
                    <SectionHeading>Why Customers Love Us</SectionHeading>
                    {/* 8 + 9. Trust builder images */}
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'left', flexDirection: 'column' }}>
                        <img
                            src="/assets/images/trust_builder/premium quality.jpg"
                            alt="premium quality"
                            style={{ width: '360px', height: 'auto', objectFit: 'contain' }}
                        />
                        <img
                            src="/assets/images/trust_builder/top rated artist.jpg"
                            alt="top rated artist"
                            style={{ width: '360px', height: 'auto', objectFit: 'contain' }}
                        />
                    </div>
                </RightSection>
            </Container>
        </>
    );
};

export default Checkout;
