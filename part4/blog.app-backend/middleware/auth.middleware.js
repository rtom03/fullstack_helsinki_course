import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const tokenExtractor = (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log(token);
    if (token) {
      req.decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", req.decodedToken);
    } else {
      return res.status(400).json({ message: "Token missing" });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export { tokenExtractor };
