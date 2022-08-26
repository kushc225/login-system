import mongoose from "mongoose";
const userSchema = mongoose.Schema;
const Person = userSchema({
  name: { type: String, rquired: true },
  email: { type: String, required: true, unique: true },
  phoneNO: { type: Number },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  createAt: { type: Date, default: Date.now },
});

const UserModal = new mongoose.model("users", Person);
export default UserModal;
