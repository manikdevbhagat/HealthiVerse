import express from "express";
import {
  updateTrainer,
  deleteTrainer,
  getSingleTrainer,
  getAllTrainer,
  getTrainerProfile,
  getMemberships,
} from "../controllers/trainerController.js";
import { authenticate, restrict } from "../middleware/auth/verifyToken.js";
import reviewRoutes from "./review.js";
let router = express.Router();

//nested route
router.use("/:id/reviews", reviewRoutes);

router.get("/:id", getSingleTrainer);
router.get("/", getAllTrainer);
router.delete("/:id", authenticate, restrict(["trainer"]), deleteTrainer);
router.get(
  "/profile/me",
  authenticate,
  restrict(["trainer", "admin"]),
  getTrainerProfile
);

router.get(
  "/memberships/my-memberships",
  authenticate,
  restrict(["trainer", "admin"]),
  getMemberships
);
router.put("/profile/me", authenticate, restrict(["trainer"]), updateTrainer);
export default router;