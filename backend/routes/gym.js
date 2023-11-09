import express from "express";
import {
  updateGym,
  deleteGym,
  getSingleGym,
  getAllGym,
  getGymProfile,
  getMemberships,
} from "../controllers/gymController.js";
import { authenticate, restrict } from "../middleware/auth/verifyToken.js";
import reviewRoutes from "./review.js";
let router = express.Router();

//nested route
router.use("/:id/reviews", reviewRoutes);

router.get("/:id", getSingleGym);
router.get("/", getAllGym);
router.delete("/:id", authenticate, restrict(["gym"]), deleteGym);
router.get(
  "/profile/me",
  authenticate,
  restrict(["gym", "admin"]),
  getGymProfile
);

router.get(
  "/memberships/my-memberships",
  authenticate,
  restrict(["gym", "admin"]),
  getMemberships
);
router.put("/profile/me", authenticate, restrict(["gym"]), updateGym);
export default router;