import express from "express";
import {
  getAllTour,
  createTour,
  deleteTour,
  updateTour,
  getSingleTour,
  getTourBySearch,
  getFeaturedTours,
  getTourCount
} from "../controllers/tourcontroller.js";

const router = express.Router();

//create tour
router.post("/", createTour);

//update tour
router.put("/:id", updateTour);

//delete tour
router.delete("/:id", deleteTour);

//single tour
router.get("/:id", getSingleTour);

//all tour
router.get("/", getAllTour);

//get tour by search
router.get("/search/getTourBySearch", getTourBySearch);

//get featured tour
router.get("/search/getFeaturedTours", getFeaturedTours);

//get tourCount
router.get("/search/getTourCount", getTourCount);

export default router;