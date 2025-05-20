import express from "express";
import {
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "../controllers/usercontroller.js";
const router = express.Router();
import { verifyUser } from "../utils/verifyToken.js";

//update user
router.put("/:id", verifyUser, updateUser);

//delete user
router.delete("/:id", verifyUser, deleteUser);

//single user
router.get("/:id", verifyUser, getSingleUser);

//all user
router.get("/", getAllUser);

export default router;