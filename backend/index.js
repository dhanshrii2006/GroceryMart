require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const GroceryItem = require('./models/GroceryItem');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Seed initial data if DB is empty
async function seedInitialData() {
  const count = await GroceryItem.countDocuments();
  if (count === 0) {
    const initialItems = [
      { name: 'Apples', stock: 50, basePrice: 0.50 },
      { name: 'Milk', stock: 30, basePrice: 3.99 },
      { name: 'Bread', stock: 25, basePrice: 2.49 },
      { name: 'Eggs', stock: 40, basePrice: 3.99 }
    ];
    await GroceryItem.insertMany(initialItems);
    console.log('Initial data seeded');
  }
}
seedInitialData().catch(err => console.error('Seeding error:', err));

// Routes

// Get all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await GroceryItem.find().sort('name');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new item
app.post('/api/items', async (req, res) => {
  try {
    const newItem = new GroceryItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Sell one item
app.post('/api/items/:id/sell', async (req, res) => {
  try {
    const item = await GroceryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    if (item.stock === 0) {
      return res.status(400).json({ message: 'Item out of stock' });
    }
    
    item.stock -= 1;
    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Restock item
app.post('/api/items/:id/restock', async (req, res) => {
  try {
    const item = await GroceryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    item.stock += 20;
    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});