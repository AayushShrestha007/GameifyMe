import React, { createContext, useEffect, useState } from 'react';
import { getCartItem } from '../apis/Api';

export const CartContext = createContext({
    cartItems: [],
    cartCount: 0,
    fetchCart: () => { },
});

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Helper to fetch items from API
    const fetchCart = async () => {
        try {
            const res = await getCartItem();
            if (res.data.success) {
                setCartItems(res.data.cartItems);
            } else {

            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };

    useEffect(() => {
        // Fetch cart once on mount
        fetchCart();
    }, []);

    const cartCount = cartItems.length;

    return (
        <CartContext.Provider value={{ cartItems, cartCount, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};
