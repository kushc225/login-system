import express from "express";
const route = express.Router();
import { body } from "express-validator";
import {
  loginOrNot,
  authAdminOrNot,
  authSuperAdminOrNot,
} from "../AuthUser/authUser.js";
import {
  signup,
  login,
  profile,
  profileUsingId,
  allUserList,
  updateProfile,
} from "../controller/user.js";

//                                                        all the endpoints for normal user

//     <SIGNUP>                 http://localhost:5000/api/
route.post(
  "/",
  [
    body("name").isLength({ min: 5 }),
    body("email").isEmail(),
    body("password").isStrongPassword({ min: 5 }),
  ],
  signup
);

//     <LOGIN>                  http://localhost:5000/api/login/
route.post("/login", login);

//      <LOGOUT>                     http://localhost:5000/api/profile/
route.get("/profile", loginOrNot, profile);

//    <PROFILE>                  http://localhost:5000/api/profile/:id
route.get("/profile/:id", authAdminOrNot, profileUsingId);

//                             http://localhost:5000/api/updateProfile/
route.put("/updateProflie/:id", loginOrNot, updateProfile);

//                                                        all the endpoints for Admin

//         <ALLUSERLIST BY SUPER ADMIN>             http://localhost:5000/api/getAllUsers
route.get("/getAllUsers", authSuperAdminOrNot, allUserList);

export default route;
