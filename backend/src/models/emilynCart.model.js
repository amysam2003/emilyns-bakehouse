import mongoose from "mongoose";
const EmilynCartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EmilynProduct",
    required: true,
  },
  bakeryItemName: String,
  bakeryItemPrice: Number,
  bakeryItemImage: String,
  quantity: {
    type: Number,
    default: 1,
  },
});
const EmilynCartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmilynUser",
      required: true,
      unique: true,
    },
    items: [EmilynCartItemSchema],
  },
  { timestamps: true }
);
export const EmilynCartModel = mongoose.model(
  "EmilynCart",
  EmilynCartSchema
);