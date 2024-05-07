import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  googleID: {
    type: String,
  },
});

export const User = models?.User || model("User", UserSchema);
