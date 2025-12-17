import mongoose from "mongoose";
const EmilynOrderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "EmilynProduct", required: true },
  bakeryItemName: { type: String, required: true },
  bakeryItemPrice: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  bakeryItemImage: { type: String },
});
const EmilynOrderSchema = new mongoose.Schema(
  {
    customer: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "EmilynUser", required: true },
      fullName: { type: String, required: true },
      email: { type: String, required: true },
    },
    items: [EmilynOrderItemSchema],
    shippingAddress: {
      addressLine1: String,
      addressLine2: String,
      city: String,
      postalCode: String,
      country: String,
    },
    paymentMethod: { type: String, default: "stripe" },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    taxPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);
export const EmilynOrderModel = mongoose.model("EmilynOrder", EmilynOrderSchema);