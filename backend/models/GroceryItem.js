const mongoose = require('mongoose');

const groceryItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  basePrice: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

// Virtual field for display price with surge pricing
groceryItemSchema.virtual('displayPrice').get(function() {
  return this.stock <= 10 ? this.basePrice * 1.2 : this.basePrice;
});

// Ensure virtual fields are included when converting to JSON
groceryItemSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('GroceryItem', groceryItemSchema);