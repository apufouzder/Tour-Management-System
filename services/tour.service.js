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

exports.incTourViewService = async (id) => {
  const tourView = await Tour.findByIdAndUpdate(
    id,
    { $inc: { view: 1 } },
    { runValidators: true, new: true }
  );

  return tourView;
};

exports.updateTourByIdService = async (id, data) => {
  const result = await Tour.findByIdAndUpdate(id, data, {
    runValidators: true,
    new: true,
  });

  return result;
};

// exports.getTourTrendingService = async (filter, queries) => {
//   const tour = await Tour.find(filter)
//     .select(queries.fields)
//     .sort(queries.sort)
//     .limit(queries.limit)
//     .skip(queries.skip);

//   return tour;
// };
