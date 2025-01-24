// src/pages/customer/OrderHistory.jsx

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { getOrderHistory } from '../../apis/Api';
import Navbar from '../../components/Navbar';

// Importing format from date-fns for date formatting
import { format } from 'date-fns';

// Optional: Import a spinner for better loading UX
import { ClipLoader } from 'react-spinners';

// Styled Components
const OrderHistoryContainer = styled.div`
  padding: 80px 20px 20px 20px; /* Added top padding to account for fixed Navbar */
  max-width: 1200px;
  margin: 0 auto;
`;

const OrderCard = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const OrderDetails = styled.div`
  margin-bottom: 10px;
`;

const OrderDate = styled.div`
  margin-bottom: 10px;
  
`;

const OrderStatus = styled.span`
  padding: 10px;
  border-radius: 4px;
  background-color: ${(props) => {
        switch (props.status) {
            case 'Pending':
                return '#FFA500';
            case 'InProgress':
                return '#00BFFF';
            case 'Approved':
                return '#32CD32';
            case 'Rejected':
                return '#FF4500';
            case 'FinalProduction':
                return '#FFD700';
            case 'Delivered':
                return '#008000';
            default:
                return '#ccc';
        }
    }};
  color: white;
  font-weight: bold;
`;

const OrderItemList = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between; /* Distribute space between left and right sections */
  align-items: center; /* Vertically center the content */
  margin-bottom: 15px;
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1; /* Take up remaining space */
  min-width: 250px; /* Ensure a minimum width for content */
`;

const ProductImage = styled.img`
  width: 160px;
  height: 160px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 6px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Align items to the right */
  min-width: 150px; /* Ensure a minimum width */
  margin-left: 20px;
`;

const Price = styled.p`
  margin: 5px 0;
  font-weight: bold;
`;

const PeopleCount = styled.p`
  margin: 5px 0;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const NoOrders = styled.div`
  text-align: center;
  margin-top: 100px; /* Adjusted for fixed Navbar */
  font-size: 20px;
  color: #555;
`;

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch order history on component mount
        const fetchOrders = async () => {
            try {
                console.log('Attempting to fetch order history...');
                const response = await getOrderHistory();
                console.log('Order History API Response:', response.data);

                if (response.data.success) {
                    console.log(`Setting ${response.data.orders.length} orders to state.`);
                    setOrders(response.data.orders);
                } else {
                    console.warn(
                        'Order History API returned unsuccessful response:',
                        response.data.message
                    );
                    toast.error(response.data.message || 'Failed to fetch order history.');
                }
            } catch (error) {
                console.error('Error fetching order history:', error);
                if (error.message === 'No authentication token found') {
                    toast.error('Please log in to view your orders.');
                    // Optionally, redirect to login page if using react-router
                    // navigate('/login');
                } else if (error.response && error.response.status === 401) {
                    toast.error('Unauthorized. Please log in again.');
                    // Optionally, redirect to login page if using react-router
                    // navigate('/login');
                } else {
                    toast.error('Failed to fetch order history.');
                }
            } finally {
                setLoading(false);
                console.log('Order history fetch completed.');
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <>
                <Navbar />
                <Loading>
                    <ClipLoader size={50} color={'#ED4708'} />
                </Loading>
            </>
        );
    }

    if (!orders.length) {
        return (
            <>
                <Navbar />
                <NoOrders>You have no orders yet.</NoOrders>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <OrderHistoryContainer>
                <h2>Your Order History</h2>
                {orders.map((order) => (
                    <OrderCard key={order._id}>
                        {/* Order Items Section */}
                        <OrderDetails>
                            <strong>Order Items:</strong>
                            <p></p>
                            <OrderItemList>
                                {order.orderItems.map((item) => (
                                    <OrderItem key={item._id}>
                                        <LeftSection>
                                            <ProductImage
                                                src={`http://localhost:5500/${item.gameOption.exampleImages[0]}`}
                                                alt={item.gameOption.name}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/assets/images/product-placeholder.png';
                                                }}
                                            />
                                            <ProductInfo>
                                                <p>
                                                    <strong>Product:</strong> {item.gameOption.name}
                                                </p>
                                                <OrderStatus status={order.status}>
                                                    Status: {order.status}
                                                </OrderStatus>
                                            </ProductInfo>
                                        </LeftSection>

                                        <RightSection>
                                            <PeopleCount>
                                                <strong>People Count:</strong> {item.peopleCount}
                                            </PeopleCount>
                                            <Price>
                                                <strong>Price:</strong> Rs {item.price}
                                            </Price>
                                        </RightSection>
                                    </OrderItem>
                                ))}
                            </OrderItemList>
                        </OrderDetails>

                        {/* Order Date Section */}
                        <OrderDate>
                            <strong>Order Date:</strong>{' '}
                            {order.createdAt
                                ? format(new Date(order.createdAt), 'yyyy-MM-dd')
                                : 'N/A'}
                        </OrderDate>

                        {/* Shipping Address Section */}
                        <OrderDetails>
                            <strong>Shipping Details:</strong>
                            <p>
                                {order.firstName} {order.lastName}
                                <br />
                                {order.address}, {order.city}, {order.postCode}
                                <br />
                                Email: {order.email}
                                <br />
                                Phone: {order.phoneNumber}
                            </p>
                        </OrderDetails>
                    </OrderCard>
                ))}
            </OrderHistoryContainer>
        </>
    );
};

export default OrderHistory;
