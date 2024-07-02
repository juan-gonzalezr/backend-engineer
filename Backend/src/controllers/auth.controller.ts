import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt";
import { TOKEN_SECRET_KEY } from "../config";
import jwt from "jsonwebtoken";

export const singUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser)
      return res.status(400).json({ message: ["email already in use"] });

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    console.log(newUser);
    const userSaved = await newUser.save();
    const token = await createAccesToken({ id: userSaved._id });

    res.cookie("token", token);

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error });
    } else {
      console.error("Unexpected error:", error); // Handle non-Error types
    }
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatchPassword = await bcrypt.compare(password, userFound.password);
    if (!isMatchPassword)
      return res.status(400).json({ message: "Invalid password" });

    const token = await createAccesToken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error });
    }
  }
};

export const singOut = (req: Request, res: Response) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req: Request, res: Response) => {
  const userToken = (req as Request & { user?: any }).user;
  const userId = userToken.id;
  const userFound = await User.findById(userId);
  if (!userFound) return res.status(400).json({ message: "Not found" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req: Request, res: Response) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorize" });

  jwt.verify(token, TOKEN_SECRET_KEY, async (err: any, user: any) => {
    if (err) return res.status(401).json({ message: "Unauthorize" });

    const userFound = await User.findById(user.id);
    if(!userFound)  res.status(401).json({ message: "Unauthorize" });

    return res.json({
      id:userFound?._id,
      username:userFound?.username,
      email:userFound?.email
    })
  });
};
