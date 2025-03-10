const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItemModel');
const CartItem = require('../models/cartItemModel');
const mongoose = require('mongoose');


const getOrderHistory = async (req, res) => {
    try {
        // Log the incoming request for debugging
        console.log('Received request to fetch order history.');

        // Ensure the user is authenticated
        const userId = req.user.id;
        console.log(`Authenticated user ID: ${userId}`);

        // Validate the userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.warn(`Invalid user ID format: ${userId}`);
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID format.',
            });
        }

        // Fetch all orders for the user, sorted by creation date (most recent first)
        const orders = await Order.find({ user: userId })
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'gameOption',
                    model: 'gameOptions', // Ensure this matches your GameOption model name
                },
            })
            .sort({ createdAt: -1 });

        console.log(`Number of orders found: ${orders.length}`);

        // If orders are found, log a summary of each order
        if (orders.length > 0) {
            orders.forEach((order, index) => {
                console.log(`Order ${index + 1}: ID=${order._id}, Status=${order.status}, TotalPrice=${order.totalPrice}`);
            });
        }

        if (!orders.length) {
            console.log('No orders found for the user.');
            return res.status(200).json({
                success: true,
                message: 'No orders found.',
                orders: [],
            });
        }

        // Optionally, log the complete orders data (be cautious with sensitive information)
        // console.log('Orders Data:', JSON.stringify(orders, null, 2));

        return res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        console.error('Error fetching order history:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error.',
        });
    }
};

const placeOrder = async (req, res) => {
    try {
        // 1. Confirm the user is logged in
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated',
            });
        }

        const userId = req.user.id || req.user._id;

        // 2. Extract shipping / contact details from request body
        const {
            email,
            phoneNumber,
            firstName,
            lastName,
            address,
            city,
            postCode,
        } = req.body;

        // Basic validation
        if (!email || !phoneNumber || !firstName || !lastName || !address || !city || !postCode) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields for checkout',
            });
        }

        // 3. Fetch the user's cart items
        const cartItems = await CartItem.find({ user: userId }).populate('gameOption');
        if (!cartItems.length) {
            return res.status(400).json({
                success: false,
                message: 'Your cart is empty',
            });
        }

        // 4. Calculate the subtotal by summing all cart item prices
        const subTotal = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

        // 5. For shipping cost, we can store or use the default from the model
        //    We'll assume the default shipping cost is 100 for demonstration.
        //    If you prefer a dynamic shippingCost, you can pass it from the body or
        //    compute it differently.
        const shippingCost = 100;
        const totalPrice = subTotal + shippingCost;

        // 6. Create the order document
        const newOrder = new Order({
            user: userId,
            status: 'Pending', // or another default from your enum
            totalPrice,        // store the total price
            // finalArtwork: '', (if needed, you can set or leave default)
            email,
            phoneNumber,
            firstName,
            lastName,
            address,
            city,
            postCode,
            shippingCost,      // your model has shippingCost
        });

        await newOrder.save();

        // 7. For each cart item, create an OrderItem
        const orderItemIds = [];
        for (const cartItem of cartItems) {
            const orderItem = new OrderItem({
                order: newOrder._id,
                gameOption: cartItem.gameOption._id,
                peopleCount: cartItem.peopleCount,
                backgroundImage: cartItem.backgroundImage,
                poseDescription: cartItem.poseDescription,
                outfitDescription: cartItem.outfitDescription,
                uploadedImages: cartItem.uploadedImages,
                price: cartItem.price,
            });

            await orderItem.save();
            orderItemIds.push(orderItem._id);
        }

        // 8. Optionally, if you want to store an array of orderItems in your order
        //    (not strictly required, but useful for referencing)
        //    *Make sure your orderModel has something like `orderItems: [{ type: Schema.Types.ObjectId, ref: 'orderItems' }]`
        //    If you want to store them, do the following:
        newOrder.orderItems = orderItemIds;
        await newOrder.save();

        // 9. Clear the user's cart
        await CartItem.deleteMany({ user: userId });

        // 10. Respond with success
        return res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            orderId: newOrder._id,
        });
    } catch (error) {
        console.error('Error placing order:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};




module.exports = {
    placeOrder, getOrderHistory
};
