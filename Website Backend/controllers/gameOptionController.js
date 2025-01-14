const path = require('path');
const fs = require('fs');
const GameOption = require('../models/gameOptionModel');

const createGameOption = async (req, res) => {
    try {
        const { name, description, basePrice } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required"
            });
        }

        let exampleImages = [];

        // Check if files were uploaded
        if (req.files && req.files.exampleImages) {
            let files = req.files.exampleImages;
            if (!Array.isArray(files)) {
                files = [files];
            }

            // Directory for storing game option images
            const uploadDir = path.join(__dirname, '../public/GameOptionImages');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            // Move each file to the upload directory with a unique name and store the paths
            for (let file of files) {
                const timestamp = Date.now();
                const uniqueFileName = `${timestamp}-${file.name}`;
                const uploadPath = path.join(uploadDir, uniqueFileName);
                await file.mv(uploadPath);
                exampleImages.push(`/GameOptionImages/${uniqueFileName}`);
            }
        }

        const newGameOption = new GameOption({
            name,
            description,
            basePrice,
            exampleImages
        });

        await newGameOption.save();

        return res.status(201).json({
            success: true,
            message: "Game Option created successfully",
            gameOption: newGameOption
        });
    } catch (error) {
        console.error("Error creating game option:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



const getAllGameOptions = async (req, res) => {
    try {
        const options = await GameOption.find();
        return res.status(200).json({
            success: true,
            gameOptions: options
        });
    } catch (error) {
        console.error("Error fetching game options:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching game options"
        });
    }
};

const getGameOptionById = async (req, res) => {
    try {
        const { id } = req.params;
        const gameOption = await GameOption.findById(id);
        if (!gameOption) {
            return res.status(404).json({
                success: false,
                message: 'Game option not found'
            });
        }
        return res.status(200).json({
            success: true,
            gameOption
        });
    } catch (error) {
        console.error("Error fetching game option by ID:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


module.exports = {
    createGameOption,
    getAllGameOptions,
    getGameOptionById
};
