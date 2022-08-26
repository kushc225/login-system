import express from "express";
import UserModal from "../Models/user.js";
import { validationResult } from "express-validator";

export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, name, passwrod } = req.body;
    const emailExist = await UserModal.find({ email });
    console.log(emailExist.length);
    if (emailExist.length == 0) {
      const data = await UserModal.create(req.body);
      return res.status(201).json({ success: true, data });
    } else {
      return res
        .status(401)
        .json({ success: false, mgs: "email already registered" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, mgs: error.message });
  }
};

export default { signup };
