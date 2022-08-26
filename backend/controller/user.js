import UserModal from "../Models/user.js";
import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, name, password, phoneNo } = req.body;
    const salt = await bcryptjs.genSalt(10);
    const secPass = await bcryptjs.hash(password, salt);
    const emailExist = await UserModal.find({ email });
    if (emailExist.length == 0) {
      if (phoneNo === undefined) {
        const data = await UserModal.create({ name, email, password: secPass });
        return res.status(201).json({ success: true, data });
      } else {
        const phoneNumberExist = await UserModal.find({ phoneNo });
        if (phoneNumberExist.length == 0) {
          const data = await UserModal.create({
            name,
            email,
            phoneNo,
            password: secPass,
          });
          return res.status(201).json({ success: true, data });
        } else {
          return res
            .status(401)
            .json({ success: false, mgs: "phone number already exist" });
        }
      }
    } else {
      return res
        .status(401)
        .json({ success: false, mgs: "email already registered" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, mgs: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailExist = await UserModal.findOne({ email });
    if (emailExist != null) {
      const comPass = await bcryptjs.compare(password, emailExist.password);
      if (comPass) {
        const payload = {
          userId: emailExist._id,
          isAdmin: emailExist.isAdmin,
        };
        const token = await Jwt.sign(payload, process.env.JWT_SEC_KEY);
        return res.status(200).json({ success: true, token });
      } else {
        return res
          .status(409)
          .json({ success: false, msg: "Invalid Cradentials" });
      }
    } else {
      return res.status(404).json({ success: false, mgs: "User not found..." });
    }
  } catch (error) {
    return res.status(500).json({ success: false, mgs: error.message });
  }
};

export default { signup, login };
