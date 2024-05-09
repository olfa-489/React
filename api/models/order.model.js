const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    titre: {
      type: String,
      required: true,
    },
    prix: {
      type: Number,
      required: true,
    },
    sellerId: {
      type: String,
      required: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    payment_intent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
