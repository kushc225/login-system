import express from "express";
import bodyParser from "body-parser";
import dbConnect from "./conn/conn.js";
import UserRouter from "./routes/user.js";
import VidoeModel from "./routes/video.js";
const app = express();

dbConnect();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", UserRouter);
app.use("/api/video", VidoeModel);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port ${port}`));
