import express from "express";
import {
  updateDietician,
  deleteDietician,
  getSingleDietician,
  getAllDietician,
  getDieticianProfile,
  getMemberships,
} from "../controllers/dieticianController.js";
import { authenticate, restrict } from "../middleware/auth/verifyToken.js";
import reviewRoutes from "./review.js";
let router = express.Router();

//nested route
router.use("/:id/reviews", reviewRoutes);

router.get("/:id", getSingleDietician);
router.get("/", getAllDietician);
router.delete("/:id", authenticate, restrict(["dietician"]), deleteDietician);
router.get(
  "/profile/me",
  authenticate,
  restrict(["dietician", "admin"]),
  getDieticianProfile
);

router.get(
  "/memberships/my-memberships",
  authenticate,
  restrict(["dietician", "admin"]),
  getMemberships
);
router.put("/profile/me", authenticate, restrict(["dietician"]), updateDietician);
export default router;