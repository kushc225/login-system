import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbConnect = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err.message));
};

export default dbConnect;
