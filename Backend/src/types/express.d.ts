// types/express.d.ts
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any; // Puedes definir un tipo más específico para `user` si lo deseas
    }
  }
}
