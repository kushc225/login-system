import express from "express";
const route = express.Router();
import { body } from "express-validator";
import { loginOrNot } from "../AuthUser/authUser.js";
import { signup, login } from "../controller/user.js";

//                      http://localhost:5000/api/

route.post(
  "/",
  [
    body("name").isLength({ min: 5 }),
    body("email").isEmail(),
    body("password").isStrongPassword({ min: 5 }),
  ],
  signup
);

//                      http://localhost:5000/api/login/
route.post("/login", login);

export default route;
