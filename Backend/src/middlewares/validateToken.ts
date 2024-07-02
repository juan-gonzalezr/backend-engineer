import { Request, Response, NextFunction } from "express";
import jwt, { decode } from "jsonwebtoken";
import { TOKEN_SECRET_KEY } from "../config";

export const authRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(401).json({ message: "no token, access denied" });
    jwt.verify(token, TOKEN_SECRET_KEY, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    (req as Request & { user: any }).user = user;
    next();
  });
};
