import { Router } from "express";
import {
  signIn,
  singUp,
  singOut,
  profile,
  verifyToken,
} from "../controllers/auth.controller";
import {validateSchema} from '../middlewares/validatorMiddleware'
import {loginSchema,registerSchema} from '../schemas/auth.schema'
import { authRequired } from "../middlewares/validateToken";
const router = Router();

router.post("/sign-up", validateSchema(registerSchema),singUp);
router.post("/sign-in",validateSchema(loginSchema), signIn);
router.post("/sign-out", authRequired, singOut);
router.get("/verify", verifyToken);
router.get("/profile", authRequired, profile);



export default router;
