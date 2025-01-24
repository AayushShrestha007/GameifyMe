// controllers/khaltiController.js

const path = require('path');
const CartItem = require('../models/cartItemModel');
const Payment = require('../models/paymentModel');
const GameOption = require('../models/gameOptionModel');
const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItemModel');
const PurchasedItem = require('../models/purchasedItemModel');
const { initializeKhaltiPayment, verifyKhaltiPayment } = require('../middleware/khalti');

const initializeKhalti = async (req, res) => {
    try {
        const { gameOptionId, totalPrice, website_url, email, phoneNumber, firstName, lastName, address, city, postCode } = req.body;

        if (!gameOptionId || !totalPrice) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields (gameOptionId, totalPrice).",
            });
        }

        // Validate the game option and price
        const gameOptionData = await GameOption.findOne({
            _id: gameOptionId,
        });
        if (!gameOptionData) {
            return res.status(400).json({
                success: false,
                message: "Game option not found or price mismatch.",
            });
        }

        // Create a purchase document for this transaction
        const purchasedItemData = await PurchasedItem.create({
            user: req.user.id,
            gameOption: gameOptionId,
            paymentMethod: "khalti",
            totalPrice: Number(totalPrice) * 100, // store as paisa
            email,
            phoneNumber,
            firstName,
            lastName,
            address,
            city,
            postCode
        });

        // Initialize Khalti payment
        const paymentInitiate = await initializeKhaltiPayment({
            amount: Number(totalPrice) * 100,
            purchase_order_id: purchasedItemData._id.toString(),
            purchase_order_name: gameOptionData.name,
            return_url: `${process.env.BACKEND_URI}/api/khalti/complete-khalti-payment`,
            website_url,
        });

        return res.status(200).json({
            success: true,
            purchasedItemData,
            payment: paymentInitiate,
        });
    } catch (error) {
        console.error("Error initializing Khalti payment:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message || error,
        });
    }
};


const completeKhaltiPayment = async (req, res) => {
    const {
        pidx,
        txnId,
        amount,
        purchase_order_id,
        transaction_id,
    } = req.query;

    try {
        // Verify payment with Khalti using the provided pidx
        const paymentInfo = await verifyKhaltiPayment(pidx);

        if (
            paymentInfo?.status !== "Completed" ||
            paymentInfo.transaction_id !== transaction_id ||
            Number(paymentInfo.total_amount) !== Number(amount)
        ) {
            return res.status(400).json({
                success: false,
                message: "Incomplete payment information",
                paymentInfo,
            });
        }

        // Retrieve the corresponding purchased item
        const purchasedItemData = await PurchasedItem.findById(purchase_order_id).populate('gameOption');
        if (!purchasedItemData || Number(purchasedItemData.totalPrice) !== Number(amount)) {
            return res.status(400).json({
                success: false,
                message: "Purchased data not found or price mismatch",
            });
        }

        // Update the purchase record status to completed
        await PurchasedItem.findByIdAndUpdate(purchase_order_id, { $set: { status: "completed" } });

        // Create a new order using shipping details from purchasedItemData
        const newOrder = new Order({
            user: purchasedItemData.user,
            status: 'Pending',
            totalPrice: purchasedItemData.totalPrice / 100, // converting paisa to currency
            email: purchasedItemData.email,
            phoneNumber: purchasedItemData.phoneNumber,
            firstName: purchasedItemData.firstName,
            lastName: purchasedItemData.lastName,
            address: purchasedItemData.address,
            city: purchasedItemData.city,
            postCode: purchasedItemData.postCode,
            shippingCost: 100,
            orderItems: [] // will populate below
        });

        await newOrder.save();

        // Fetch all cart items for the user
        const cartItems = await CartItem.find({ user: purchasedItemData.user }).populate('gameOption');

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

        // Update order with the created order items
        newOrder.orderItems = orderItemIds;
        await newOrder.save();

        // Clear the user's cart
        await CartItem.deleteMany({ user: purchasedItemData.user });

        // Redirect to order success page or send a success response
        return res.redirect(`http://localhost:3000/order-success`);
    } catch (error) {
        console.error("Error completing Khalti payment:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred",
            error: error.message || error,
        });
    }
};


module.exports = { initializeKhalti, completeKhaltiPayment };
