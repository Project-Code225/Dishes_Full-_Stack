const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
  dishId: {
    type: String,
    required: true,
    unique: true,
  },
  dishName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Dish', DishSchema);