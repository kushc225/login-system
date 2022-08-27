import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const loginOrNot = (req, res, next) => {
  const token = req.headers.token;
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
          req.body.userId = decoded.userId;
          req.body.isAdmin = decoded.isAdmin;
          req.body.isSuperAdmin = decoded.isSuperAdmin;
          next();
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const authAdminOrNot = (req, res, next) => {
  const token = req.headers.token;
  try {
    if (!token) {
      return res
        .status(404)
        .json({ success: false, msg: "Please login first " });
    } else {
      jwt.verify(token, process.env.JWT_SEC_KEY, (err, decoded) => {
        if (err) {
          return res.status(404).json({ success: false, msg: "Invalid token" });
        } else {
          if (decoded.isAdmin) {
            req.body.userId = decoded.userId;
            req.body.isAdmin = decoded.isAdmin;
            next();
          } else {
            return res
              .status(409)
              .json({ success: false, msg: "You are not admin" });
          }
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const authSuperAdminOrNot = (req, res, next) => {
  const token = req.headers.token;
  try {
    if (!token) {
      return res
        .status(404)
        .json({ success: false, msg: "Please login first " });
    } else {
      jwt.verify(token, process.env.JWT_SEC_KEY, (err, decoded) => {
        if (err) {
          return res.status(404).json({ success: false, msg: "Invalid token" });
        } else {
          if (decoded.isSuperAdmin) {
            req.body.userId = decoded.userId;
            req.body.isAdmin = decoded.isAdmin;
            req.body.isSuperAdmin = decoded.isSuperAdmin;
            next();
          } else {
            return res
              .status(409)
              .json({ success: false, msg: "You are not admin" });
          }
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export default { loginOrNot, authAdminOrNot, authSuperAdminOrNot };
