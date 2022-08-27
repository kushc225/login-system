import UserModel from "../Models/user.js";
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
    const emailExist = await UserModel.find({ email });
    if (emailExist.length == 0) {
      if (phoneNo === undefined) {
        const data = await UserModel.create({ name, email, password: secPass });
        return res.status(201).json({ success: true, data });
      } else {
        const phoneNumberExist = await UserModel.find({ phoneNo });
        if (phoneNumberExist.length == 0) {
          const data = await UserModel.create({
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
    const emailExist = await UserModel.findOne({ email });
    if (emailExist != null) {
      const comPass = await bcryptjs.compare(password, emailExist.password);
      if (comPass) {
        const payload = {
          userId: emailExist._id,
          isAdmin: emailExist.isAdmin,
          isSuperAdmin: emailExist.isSuperAdmin,
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

export const profile = async (req, res) => {
  const id = req.body.userId;
  try {
    const userProfile = await UserModel.findById(id).select("-password");
    if (userProfile) {
      return res.status(500).json({ success: false, userProfile });
    } else {
      return res
        .status(404)
        .json({ success: false, error: "Access denied..." });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const profileUsingId = async (req, res) => {
  const id = req.params.id;
  try {
    const userProfile = await UserModel.findById(id).select("-password");
    if (userProfile) {
      return res.status(200).json({ success: true, userProfile });
    } else {
      return res
        .status(404)
        .json({ success: false, error: "Access denied..." });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const allUserList = async (req, res) => {
  try {
    const data = await UserModel.find().select("-password");
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    // you can't use callback and async await together
    const result = await UserModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    return res.status(201).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

export default {
  signup,
  login,
  profile,
  profileUsingId,
  allUserList,
  updateProfile,
};
