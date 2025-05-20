import Tour from "../models/Tour.js";

//create new tour
export const createTour = async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    const savedTour = await newTour.save(); 
    
    res.status(200).json({
      success: true,
      message: "Successfully Created",
      data: savedTour,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to Create. Try again",
      error: err.message
    });
  }
};
//update tour
export const updateTour = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully Updated",
      data: updatedTour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
    });
  }
};

//delete tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;

  try {
    await Tour.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};

//single tour
export const getSingleTour = async (req, res) => {
  const id = req.params.id;

  try {
    const tour = await Tour.findById(id);

    res.status(200).json({
      success: true,
      message: "Successfully Fetched",
      data: tour,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};

//All tour
export const getAllTour = async (req, res) => {
  //for pagination
  const page = parseInt(req.query.page);

  try {
    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * 6)
      .limit(6);
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successfull",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};

//get tour by search
export const getTourBySearch = async (req, res) => {
  const country = new RegExp(req.query.country, "i");

  try {
    const tours = await Tour.find({
      country,
    }).populate("reviews");

    res.status(200).json({
      success: true,
      message: "Successfull",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Failed",
    });
  }
};

//get featured tour
export const getFeaturedTours = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true }).limit(8);
    res
      .status(200)
      .json({ success: true, message: "Successfull", data: tours });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};

//get tour count
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();

    res.status(200).json({ success: true, data: tourCount });
  } catch (error) {
    res.status(500).json({ success: true, message: "Failed To Fetch" });
  }
};