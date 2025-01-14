const CartItem = require('../models/cartItemModel');
const GameOption = require('../models/gameOptionModel');
const path = require('path');
const fs = require('fs');


const addToCart = async (req, res) => {
    try {
        // Ensure user is authenticated
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }

        const userId = req.user.id || req.user._id;
        const {
            gameOptionId,
            peopleCount,
            poseDescription,
            outfitDescription

        } = req.body;

        // Validate required fields
        if (!gameOptionId || !peopleCount) {
            return res.status(400).json({
                success: false,
                message: 'Game option and number of people are required'
            });
        }

        // Fetch the game option to get basePrice
        const gameOption = await GameOption.findById(gameOptionId);
        if (!gameOption) {
            return res.status(404).json({
                success: false,
                message: 'Game option not found'
            });
        }

        // Calculate total price
        let totalPrice = gameOption.basePrice;
        if (peopleCount > 1) {
            totalPrice += (peopleCount - 1) * 200;
        }

        // Handle file upload for background image with unique naming
        let backgroundImagePath = "";
        if (req.files && req.files.backgroundImage) {
            const bgFile = req.files.backgroundImage;
            const timestamp = Date.now();
            const uniqueBgFileName = `${timestamp}-${bgFile.name}`;

            const bgUploadDir = path.join(__dirname, '../public/backgroundImages');
            if (!fs.existsSync(bgUploadDir)) {
                fs.mkdirSync(bgUploadDir, { recursive: true });
            }

            const bgUploadPath = path.join(bgUploadDir, uniqueBgFileName);
            await bgFile.mv(bgUploadPath);
            backgroundImagePath = `/backgroundImages/${uniqueBgFileName}`;
        }

        // Handle file uploads for cart images with unique naming
        let uploadedImages = [];
        if (req.files && req.files.uploadedImages) {
            let files = req.files.uploadedImages;
            if (!Array.isArray(files)) {
                files = [files];
            }

            const uploadDir = path.join(__dirname, '../public/cartImages');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            for (let file of files) {
                const timestamp = Date.now();
                const uniqueFileName = `${timestamp}-${file.name}`;
                const uploadPath = path.join(uploadDir, uniqueFileName);
                await file.mv(uploadPath);
                uploadedImages.push(`/cartImages/${uniqueFileName}`);
            }
        }

        // Create and save a new cart item
        const newCartItem = new CartItem({
            user: userId,
            gameOption: gameOptionId,
            peopleCount,
            backgroundImage: backgroundImagePath,
            poseDescription,
            outfitDescription,
            uploadedImages,
            price: totalPrice
        });

        await newCartItem.save();

        res.status(201).json({
            success: true,
            message: 'Item added to cart',
            cartItem: newCartItem
        });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


const getUserCartItems = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated',
            });
        }

        const userId = req.user.id || req.user._id;

        // Find all cart items for this user, optionally populate the gameOption
        const cartItems = await CartItem.find({ user: userId })
            .populate('gameOption')
            .exec();

        return res.status(200).json({
            success: true,
            cartItems,
        });
    } catch (error) {
        console.error('Error fetching user cart items:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};


/**
 * Duplicate a cart item (increment)
 */
const incrementCartItem = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }

        const { cartItemId } = req.body;
        if (!cartItemId) {
            return res.status(400).json({ success: false, message: 'cartItemId is required' });
        }

        // Find the existing cart item
        const existingItem = await CartItem.findOne({ _id: cartItemId, user: req.user.id })
            .populate('gameOption')
            .exec();

        if (!existingItem) {
            return res.status(404).json({ success: false, message: 'Cart item not found' });
        }

        // Create a new cart item with the same details
        const newItem = new CartItem({
            user: req.user.id,
            gameOption: existingItem.gameOption,
            backgroundImage: existingItem.backgroundImage,
            poseDescription: existingItem.poseDescription,
            outfitDescription: existingItem.outfitDescription,
            uploadedImages: existingItem.uploadedImages,
            price: existingItem.price,
        });

        await newItem.save();

        return res.status(201).json({
            success: true,
            message: 'Cart item duplicated',
            cartItem: newItem
        });
    } catch (error) {
        console.error('Increment cart item error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

/**
 * Decrement a cart item by removing a single record from the DB
 */
const decrementCartItem = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }

        const { cartItemId } = req.body;
        if (!cartItemId) {
            return res.status(400).json({ success: false, message: 'cartItemId is required' });
        }

        // Remove exactly one matching cart item
        const removedItem = await CartItem.findOneAndDelete({
            _id: cartItemId,
            user: req.user.id
        });

        if (!removedItem) {
            return res.status(404).json({ success: false, message: 'Cart item not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'One cart item removed',
        });
    } catch (error) {
        console.error('Decrement cart item error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


/**
* Delete one cart item (similar to decrement, but maybe no difference)
*/
const deleteCartItem = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }

        const { cartItemId } = req.body;
        if (!cartItemId) {
            return res.status(400).json({ success: false, message: 'cartItemId is required' });
        }

        const deletedItem = await CartItem.findOneAndDelete({
            _id: cartItemId,
            user: req.user.id
        });

        if (!deletedItem) {
            return res.status(404).json({ success: false, message: 'Cart item not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Cart item deleted',
        });
    } catch (error) {
        console.error('Delete cart item error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};




module.exports = { addToCart, getUserCartItems, incrementCartItem, decrementCartItem, deleteCartItem };

