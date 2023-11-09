import express from "express";
import { getAllReviews, addReview } from "../controllers/reviewController.js";
import { authenticate, restrict } from "../middleware/auth/verifyToken.js";

let router = express.Router({ mergeParams : true });

router.get("/", getAllReviews);
router.post("/", authenticate, restrict(["client"]), addReview);

export default router;
