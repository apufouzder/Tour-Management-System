const {
  createTourService,
  getTourService,
    getTourByIdService,
    updateTourByIdService,
    incTourViewService,
    getTourTrendingService,
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
      message: "data not saved",
      error: error.message,
    });
  }
};

exports.getTour = async (req, res, next) => {
  try {
    let filters = { ...req.query };
    console.log(filters);
    const excludeFields = ["sort", "fields", "limit", "page"];
    excludeFields.forEach((field) => delete filters[field]);

    const queries = {};
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(queries);
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
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
      message: "data not saved",
      error: error.message,
    });
  }
};

exports.getTourById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const tourById = await incTourViewService(id)

    res.status(200).json({
        status: "success",
        data: tourById,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failure",
      message: "data not saved",
      error: error.message,
    });
  }
};

exports.updateTourById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const getTour = await getTourByIdService(id);
        if (!getTour) {
            return res.status(400).json({
                message: "No tour found for this id!",
            })
        }

        const tourUpdate = await updateTourByIdService(id, req.body)

      res.status(200).json({
          status: "success",
          data: getTour
      });
    } catch (error) {
      res.status(400).json({
        status: "Failure",
        message: "data not saved",
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
       }
        
        const trendingTour = await getTourTrendingService(filters, queries);

        res.status(200).json({
            status: "success",
            data: trendingTour,
        });
    } catch (error) {
        res.status(400).json({
            status: "Failure",
            message: "data not saved",
            error: error.message,
          });
    }
}