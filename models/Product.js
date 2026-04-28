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
  category: {
    type: String,
    required: true,
    // enum: ["shirt", "t-shirt", "polo", "shoes", "jeans", "pants"]
  },
  category_slug: { type: String, required: true },
  tags: [{ type: String }],
  gender_type: { type: Number },
  mrp: { type: Number, required: true },
  price: { type: Number, required: true },
  soldCount: { type: Number, default: 0 },
  rating_count: { type: Number, default: 0 },
  variants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  images: [{ type: String }],
  colors: [{
    id: Number,
    color_name: String,
    color_hex: String
  }],
  sizes: [{
    size: {
      type: String,
      enum: [
        "XS", "S", "M", "L", "XL", "XXL",
        "28", "30", "32", "34", "36", "38"
      ]
    },
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

ProductSchema.index({ category: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ avg_rating: -1 });
ProductSchema.index({ soldCount: -1 });
ProductSchema.index({ "sizes.size": 1 });
ProductSchema.index({ tags: 1 });

ProductSchema.pre("save", function () {
  const tagsSet = new Set(this.tags || [])

  // Add category
  if (this.category) {
    tagsSet.add(this.category.toLowerCase())
  }

  // Add attributes
  if (this.attributes) {
    Object.values(this.attributes).forEach((val) => {
      if (val) {
        tagsSet.add(String(val).toLowerCase())
      }
    })
  }

  this.tags = Array.from(tagsSet)
})

// Standard Next.js Mongoose model pattern
// In development, we sometimes need to delete the model from the cache to register schema changes
if (process.env.NODE_ENV === "development") {
  delete mongoose.models.Product;
}

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;


// {
//   "mappings": {
//     "dynamic": false,
//     "fields": {
//       "category": [
//         {
//           "type": "string"
//         },
//         {
//           "type": "token"
//         }
//       ],
//       "gender_type": {
//         "type": "number"
//       }
//     }
//   }
// }