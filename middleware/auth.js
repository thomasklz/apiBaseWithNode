import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../config/config.js";
export const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }
  try {
    const decoded = await jwt.verify(token, TOKEN_KEY);
  //  req.dd = decoded;
    console.log("xxx"+JSON.stringify(decoded));
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
  return next();
};
