const express = require("express");
const router = express.Router();

const tourController = require("../../controllers/tour.controller");

router
    .route("/tours")
    .get(tourController.getTour)
    .post(tourController.createTour);

router
  .route("/tours:id")
  .get(tourController.getTourById)
  .patch(tourController.updateTourById);


router
    .route("/tour/trending")
    .get(tourController.getTrendingTour)

module.exports = router;
