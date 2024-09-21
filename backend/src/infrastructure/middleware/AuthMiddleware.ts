import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@config/index";
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
      const verified = jwt.verify(token, JWT_SECRET as string);
      if (!verified) return res.status(401).json({ message: "Access Denied" });
      next();
      return;
    }
    return res.status(401).json({ message: "Access Denied" });
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
