// models/orderModel.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
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
            type: String, // Final image after user's approval
            default: '',
        },
    },

);

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;