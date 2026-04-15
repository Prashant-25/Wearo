import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional if using only OAuth
  image: { type: String },
  role: { 
    type: String, 
    enum: ["user", "admin"], 
    default: "user" 
  },
  addresses: [{
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    isDefault: { type: Boolean, default: false }
  }],
  wishlist: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product" 
  }],
  emailVerified: { type: Date }
}, {
  timestamps: true
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
