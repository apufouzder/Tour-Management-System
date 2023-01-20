const {
  createTourService,
  getTourService,
  updateTourByIdService,
  incTourViewService,
} = require("../services/tour.service");


exports.createTour = async (req, res, next) => {
  try {
    const tour = await createTourService(req.body);

    res.status(200).json({
      status: "success",
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failure",
      message: "data not created successfully",
      error: error.message,
    });
  }
};

exports.getTour = async (req, res, next) => {
  try {
      let filters = { ...req.query };
      
    const excludeFields = ["sort", "fields", "limit", "page"];
    excludeFields.forEach((field) => delete filters[field]);

    const queries = {};
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(queries);
    }

    if (req.query.sort) {
      const sort = req.query.sort.split(",").join(" ");
      queries.sort = sort;
      console.log(queries);
    }

    if (req.query.page) {
      const { page = 1, limit = 5 } = req.query;

      const skip = parseInt(page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const tour = await getTourService(filters, queries);

    res.status(200).json({
      status: "success",
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failure",
      message: "data not load",
      error: error.message,
    });
  }
};

exports.getTourById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tourById = await incTourViewService(id);

    res.status(200).json({
      status: "success",
      data: tourById,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failure",
      message: "data not load",
      error: error.message,
    });
  }
};


// update single tour by id
exports.updateTourById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tourUpdate = await updateTourByIdService(id, req.body);

    res.status(200).json({
      status: "success",
      data: tourUpdate,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failure",
      message: "data not updated",
      error: error.message,
    });
  }
};

exports.getTrendingTour = async (req, res, next) => {
  try {
    const filters = {};
    const queries = {
      sort: "-view",
      limit: 3,
    };

    const trendingTour = await getTourService(filters, queries);

    res.status(200).json({
      status: "success",
      data: trendingTour,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failure",
      message: "data not load",
      error: error.message,
    });
  }
};


exports.getCheapestTour = async (req, res, next) => {
    try {
      const filters = {};
      const queries = {
        sort: "price",
        limit: 3,
      };
  
      const cheapestTour = await getTourService(filters, queries);
  
      res.status(200).json({
        status: "success",
        data: cheapestTour,
      });
    } catch (error) {
      res.status(400).json({
        status: "Failure",
        message: "data not load",
        error: error.message,
      });
    }
};
  