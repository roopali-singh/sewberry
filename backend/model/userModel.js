import mongoose from "mongoose";

// Create a schema for user
// Using userSchema => we can create a userModel => which is a collection mongoDB database
const userSchema = new mongoose.Schema(
  {
    // object
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pin: { type: Number },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    // options
    // Timestamp of creating a record and last update of record.
    timestamps: true, // after the above 4 fields => add 2 more fields => 1) Created at, 2) Updated at.
  }
);

const User = mongoose.model("User", userSchema);

export default User;
