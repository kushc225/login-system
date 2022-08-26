import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export const loginOrNot = (req, res, next) => {
  const token = req.headers.token;
  console.log(token);
  try {
    if (!token) {
      return res
        .status(404)
        .json({ succes: false, msg: "Please login first " });
    } else {
      jwt.verify(token, process.env.JWT_SEC_KEY, (err, decoded) => {
        if (err) {
          return res.status(404).json({ succes: false, msg: "Invalid token" });
        } else {
          req.userId = decoded.userid;
          req.isAdmin = decoded.isAdmin;
          next();
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export default { loginOrNot };
