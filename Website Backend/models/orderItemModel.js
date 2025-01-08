// models/orderItemModel.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema(
    {
        order: {
            type: Schema.Types.ObjectId,
            ref: 'orders',  // matches the "orders" model name
            required: true,
        },
        gameOption: {
            type: Schema.Types.ObjectId,
            ref: 'gameOptions',
            required: true,
        },

        peopleCount: {
            type: Number,
            default: 1,
        },

        backgroundImage: {
            type: String,
            default: '',
        },
        poseDescription: {
            type: String,
            default: '',
        },
        outfitDescription: {
            type: String,
            default: '',
        },

        uploadedImages: [
            {
                type: String,
            },
        ],

        price: {
            type: Number,
            default: 0,
        },
    },
);

const OrderItem = mongoose.model('orderItems', orderItemSchema);
module.exports = OrderItem;