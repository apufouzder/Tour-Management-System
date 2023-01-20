const { updateOne } = require("../models/tour.model");
const Tour = require("../models/tour.model");

exports.createTourService = async (body) => {
  const tour = await Tour.create(body);

  return tour;
};

exports.getTourService = async (filters, queries) => {
  const tour = await Tour.find(filters)
    .select(queries.fields)
    .sort(queries.sort)
    .limit(queries.limit)
    .skip(queries.skip);

  const pageCount = await Tour.countDocuments(filters);

  return { pageCount, tour };
};

exports.getTourByIdService = async (id) => {
  try {
    const tour = await Tour.findById(id);
    return tour;
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.incTourViewService = async (id) => {
  try {
    const tourView = await Tour.findByIdAndUpdate(
      id,
      { $inc: { view: 1 } },
      { runValidators: true, new: true }
    );

    return tourView;
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.updateTourByIdService = async (id, data) => {
  const result = await Tour.findByIdAndUpdate(id, data, {
    runValidators: true,
    new: true,
  });

  return result;
};

exports.getTourTrendingService = async (filter, queries) => {
  const tour = await Tour.find(filter)
    .select(queries.fields)
    .sort(queries.sort)
    .limit(queries.limit)
    .skip(queries.skip);

  return tour;
};
