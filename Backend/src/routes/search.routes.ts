import { Router } from "express";


import { saveSearchRestaurant, getRestaurant ,showHistorical} from "../controllers/restaurant.controller";
import { authRequired } from "../middlewares/validateToken";
const router = Router();

router.get("/restaurants", authRequired ,getRestaurant);
router.post("/restaurants",authRequired,saveSearchRestaurant)
router.get("/restaurants/history", authRequired ,showHistorical);

export default router;
