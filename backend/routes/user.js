import express from "express";
const route = express.Router();
import { signup } from "../controller/user.js";
import { body } from "express-validator";

route.post(
  "/",
  [
    body("name").isLength({ min: 5 }),
    body("email").isEmail(),
    body("password").isStrongPassword({ min: 5 }),
  ],
  signup
);

export default route;
