const mongoose = require('mongoose');

const gameOptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    basePrice: {
      type: Number,
      default: 0,
      required: true,
    },
    exampleImages: [
      {
        type: String,
      },
    ],
  },

);

const GameOption = mongoose.model('gameOptions', gameOptionSchema);
module.exports = GameOption;