import express from "express";
import {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUser,
  getUserProfile,
  getMemberships,
  buyMembership,
} from "../controllers/userController.js";
import { authenticate, restrict } from "../middleware/auth/verifyToken.js";

let router = express.Router();

router.get("/:id", authenticate, restrict(["client", "admin"]), getSingleUser);
router.get("/", authenticate, restrict(["admin"]), getAllUser);
router.delete("/:id", authenticate, restrict(["client"]), deleteUser);
router.get(
  "/profile/me",
  authenticate,
  restrict(["client", "admin"]),
  getUserProfile
);
router.put("/profile/me", authenticate, restrict(["client"]), updateUser);
router.get(
  "/memberships/my-memberships",
  authenticate,
  restrict(["client", "admin"]),
  getMemberships
);

router.post(
  "/memberships/buy/:id",
  authenticate,
  restrict(["client", "admin"]),
  buyMembership
);

export default router;