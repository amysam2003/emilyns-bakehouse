import mongoose from "mongoose";
export const connectToEmilynBakehouseDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); 
    console.log(
      "Hurray! Congratulations Emilyn Cynthia! Emilyn's Bakehouse Database Connected Successfully!"
    );
  } catch (error) {
    console.error(
      "Sorry, Connection Failed! Database Connection Failed at Emilyn Bakehouse:",
      error
    );
    process.exit(1);
  }
};
