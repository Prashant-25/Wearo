import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  created_at: { type: Date, default: Date.now }
});

const ProductSchema = new mongoose.Schema({
  product: { type: String, required: true },
  product_slug: { type: String, required: true, unique: true },
  artist_slug: { type: String },
  avg_rating: { type: Number, default: 0 },
  category: { type: String, required: true },
  category_slug: { type: String, required: true },
  gender_type: { type: Number },
  neck: { type: String },
  sleeve: { type: String },
  mrp: { type: Number, required: true },
  price: { type: Number, required: true },
  soldCount: { type: Number, default: 0 },
  rating_count: { type: Number, default: 0 },
  variants: [{ type: String }],
  images: [{ type: String }],
  colors: [{
    id: Number,
    color_name: String,
    color_hex: String
  }],
  sizes: [{
    size: String,
    stock: Number
  }],
  reviews: [ReviewSchema],
  attributes: {
    fabric: String,
    fitType: String,
    neck: String,
    sleeve: String
  },
}, {
  timestamps: true
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
