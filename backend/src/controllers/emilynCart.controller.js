import { EmilynCartModel } from "../models/emilynCart.model.js";
import { EmilynProductModel } from "../models/emilynProduct.model.js";
export const addToEmilynCart = async (req, res) => {
  try {
    const userId = req.emilynUser.userId;
    const { productId } = req.body;
    const product = await EmilynProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Bakery item not found." });
    }
    let cart = await EmilynCartModel.findOne({ userId });
    if (!cart) {
      cart = await EmilynCartModel.create({
        userId,
        items: [],
      });
    }
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        productId,
        bakeryItemName: product.bakeryItemName,
        bakeryItemPrice: product.bakeryItemPrice,
        bakeryItemImage: product.bakeryItemImage,
        quantity: 1,
      });
    }
    await cart.save();
    res.json({
      message: "Item added to cart.",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Add to cart failed.", error });
  }
};
export const getEmilynCart = async (req, res) => {
  try {
    const cart = await EmilynCartModel.findOne({
      userId: req.emilynUser.userId,
    });
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: "Failed to load cart.", error });
  }
};
export const updateEmilynCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await EmilynCartModel.findOne({ userId: req.emilynUser.userId });
    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (item) {
      item.quantity = quantity;
    }
    cart.items = cart.items.filter((i) => i.quantity > 0);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Cart update failed.", error });
  }
};
export const removeFromEmilynCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await EmilynCartModel.findOne({ userId: req.emilynUser.userId });
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Remove failed.", error });
  }
};
