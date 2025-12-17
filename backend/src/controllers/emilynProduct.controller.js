import { EmilynProductModel } from "../models/emilynProduct.model.js";
export const addEmilynBakeItem = async (req, res) => {
  try {
    const {
      bakeryItemName,
      bakeryItemDescription,
      bakeryItemPrice,
      bakeryItemCategory,
    } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Hello! Image upload is required." });
    }
    const bakeryItemImage = req.file.path;
    const newBakeItem = await EmilynProductModel.create({
      bakeryItemName,
      bakeryItemDescription,
      bakeryItemPrice,
      bakeryItemCategory,
      bakeryItemImage,
    });
    return res.status(201).json({
      message: "Yay, Yippie is Happy! New delicious item added to Emilyn’s Bakehouse menu!",
      bakeItem: newBakeItem,
    });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ message: "Failed to add bakery item", error });
  }
};
export const getAllEmilynBakeItems = async (req, res) => {
  try {
    const allItems = await EmilynProductModel.find().sort({ createdAt: -1 });
    res.json(allItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to load menu items", error });
  }
};
export const updateEmilynBakeItem = async (req, res) => {
  try {
    const bakeItemId = req.params.id;
    let updateFields = {
      bakeryItemName: req.body.bakeryItemName,
      bakeryItemDescription: req.body.bakeryItemDescription,
      bakeryItemPrice: req.body.bakeryItemPrice,
      bakeryItemCategory: req.body.bakeryItemCategory,
    };
    if (req.file) {
      updateFields.bakeryItemImage = req.file.path;
    }
    const updatedItem = await EmilynProductModel.findByIdAndUpdate(
      bakeItemId,
      updateFields,
      { new: true }
    );
    res.json({
      message: "Bakehouse item updated successfully.",
      updatedItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Update failed.", error });
  }
};
export const deleteEmilynBakeItem = async (req, res) => {
  try {
    const bakeItemId = req.params.id;
    await EmilynProductModel.findByIdAndDelete(bakeItemId);
    res.json({ message: "Item removed from Emilyn’s Bakehouse menu." });
  } catch (error) {
    res.status(500).json({ message: "Delete failed.", error });
  }
};