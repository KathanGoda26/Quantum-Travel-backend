import express from "express";
import { verifyUser, isSuperAdmin } from "../utils/verifyToken.js";
import { createBooking, getAllBooking, getBooking } from "../controllers/bookingcontroller.js";

const router = express.Router();

router.post("/", verifyUser, createBooking);
router.get("/:id", verifyUser, getBooking);
router.get("/", getAllBooking);
router.delete("/:id", isSuperAdmin);

export default router;