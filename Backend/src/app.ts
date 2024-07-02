import express from "express";
import authRoutes from "./routes/auth.routes";
import searchRoutes from "./routes/search.routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", searchRoutes);

export default app;
