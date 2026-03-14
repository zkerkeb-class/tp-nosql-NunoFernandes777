"use strict";

import mongoose from "mongoose";
import { hashPassword } from "@/mvc/auth/password";

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

const USER_MODEL_NAME = "UserAuthV2";
const User =
  mongoose.models[USER_MODEL_NAME] ||
  mongoose.model(USER_MODEL_NAME, userSchema, "users");

export default User;
