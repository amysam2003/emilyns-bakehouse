import mongoose from "mongoose";
const EmilynProductSchema = new mongoose.Schema(
  {
    bakeryItemName: {
      type: String,
      required: true,
    },
    bakeryItemDescription: {
      type: String,
      required: true,
    },
    bakeryItemPrice: {
      type: Number,
      required: true,
    },
    bakeryItemCategory: {
      type: String,
      enum: [
        "cakes",
        "cupcakes",
        "pastries",
        "snacks",
        "puffs",
        "buns",
        "chocolates",
        "specials",
      ],
      required: true,
    },
    bakeryItemImage: {
      type: String, 
      required: true,
    },
  },
  { timestamps: true }
);
export const EmilynProductModel = mongoose.model(
  "EmilynProduct",
  EmilynProductSchema
);