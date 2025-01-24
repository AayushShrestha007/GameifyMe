const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchasedItemSchema = new Schema({
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
    paymentMethod: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postCode: { type: String, required: true },



    // Optional: store additional purchase details if needed
}, { timestamps: true });

const PurchasedItem = mongoose.model('PurchasedItem', purchasedItemSchema);
module.exports = PurchasedItem;
