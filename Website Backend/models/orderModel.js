// models/orderModel.js (edited)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        orderItems: [
            {
                type: Schema.Types.ObjectId,
                ref: 'orderItems'
            },
        ],
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        status: {
            type: String,
            enum: [
                'Pending',
                'InProgress',
                'Approved',
                'Rejected',
                'FinalProduction',
                'Delivered',
            ],
            default: 'Pending',
        },
        totalPrice: {
            type: Number,
            default: 0,
        },
        finalArtwork: {
            type: String,
            default: '',
        },

        // --- Add the fields below ---
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postCode: { type: String, required: true },

        // You can store shipping cost or subTotal if desired
        shippingCost: { type: Number, default: 100 },
        // subTotal: { type: Number, default: 0 },

    },
    { timestamps: true } // optional
);

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;
