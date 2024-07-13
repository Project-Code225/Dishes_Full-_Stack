const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish');

// Get all dishes
router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Toggle isPublished status
router.patch('/:id', async (req, res) => {
  try {
    const dish = await Dish.findOne({ dishId: req.params.id });
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    dish.isPublished = !dish.isPublished;
    await dish.save();
    res.json(dish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;