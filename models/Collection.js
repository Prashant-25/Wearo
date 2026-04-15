import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  banner: { type: String },
}, {
  timestamps: true
});

const Collection = mongoose.models.Collection || mongoose.model("Collection", CollectionSchema);

export default Collection;
