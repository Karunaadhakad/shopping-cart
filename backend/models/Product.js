import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  offer: { type: Number, default: 0 },
  image: String // store image filename (frontend will map it)
});
export default mongoose.model("Product", productSchema);
