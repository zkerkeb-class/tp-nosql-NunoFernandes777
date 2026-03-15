import mongoose from "mongoose";
import { hashPassword } from "../mvc/auth/password.js";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: {
    type: [Number],
    default: [],
  },
});

userSchema.pre("save", async function preSave() {
  if (!this.isModified("password")) return;
  this.password = await hashPassword(this.password);
});

const User = mongoose.models.User || mongoose.model("User", userSchema, "users");

export default User;
