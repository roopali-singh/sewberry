import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // _id: { type: Number, required: true, unique: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    alt: { type: String, required: true, default: "Product Image" },
    image: { type: String, required: true },
    price: {
      lower: { type: Number, required: true },
      upper: { type: Number, required: false },
    },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: false },
    numReviews: { type: Number, required: false },
    description: {
      color: { type: String, required: true },
      neckline: { type: String, required: true },
      type: { type: String, required: true },
      fabric: { type: String, required: true },
      waist_line: { type: String, reuqired: true },
      lining: { type: String, required: true, default: "Not Present" },
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
