const express = require("express");
const router = express.Router();

const tourController = require("../../controllers/tour.controller");

router
    .route("/tours")
    .get(tourController.getTour) // get all tours || tours?page=2&limit=5 || tours?fields=name,price || tours?sort=price
    .post(tourController.createTour); // create tours


router
  .route("/tours/:id")
    .get(tourController.getTourById) // get single tour with view count
  .patch(tourController.updateTourById); // update single tour by id


router
    .route("/tour/trending")
    .get(tourController.getTrendingTour) // top 3 view page


router
    .route("/tour/cheapest")
    .get(tourController.getCheapestTour) // top 3 low price tour


module.exports = router;
