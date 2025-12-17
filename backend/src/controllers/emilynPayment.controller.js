import "dotenv/config";
import Stripe from "stripe";
import { EmilynProductModel } from "../models/emilynProduct.model.js";
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Stripe secret key is missing in .env");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});
export const createEmilynPaymentIntent = async (req, res) => {
  try {
    const { items } = req.body;
    const currency = "usd";
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Hello! Your cart is empty!" });
    }
    const verifiedItems = [];
    for (const it of items) {
      const product = await EmilynProductModel.findById(it.productId);
      if (!product) continue;
      verifiedItems.push({
        price: product.bakeryItemPrice,
        quantity: Number(it.quantity) || 1,
      });
    }
    if (verifiedItems.length === 0) {
      return res.status(400).json({ message: "No Valid Items Found" });
    }
    const total = verifiedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency,
      automatic_payment_methods: { enabled: true },
    });
    return res.status(201).json({
      clientSecret: paymentIntent.client_secret,
      amount: total,
      currency,
    });
  } catch (error) {
    console.error("Create PaymentIntent error:", error);
    return res.status(500).json({ message: error.message });
  }
};
export const confirmEmilynPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    if (!paymentIntentId) {
      return res.status(400).json({ message: "paymentIntentId required" });
    }
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId
    );
    if (!paymentIntent) {
      return res.status(404).json({ message: "PaymentIntent not found" });
    }
    if (paymentIntent.status === "succeeded") {
      return res.json({
        message: "Payment confirmed",
        paymentIntent,
      });
    }
    return res.status(400).json({
      message: `Payment not successful. Status: ${paymentIntent.status}`,
    });
  } catch (error) {
    console.error("Confirm Payment error:", error);
    return res.status(500).json({ message: error.message });
  }
};
