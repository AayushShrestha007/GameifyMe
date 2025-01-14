const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const CartItem = mongoose.model('cartItems', cartItemSchema);
module.exports = CartItem;
