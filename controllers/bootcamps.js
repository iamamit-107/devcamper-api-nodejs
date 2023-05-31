const asyncHandler = require("../middlewares/async");
const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query = { ...req.query };

  // fields to exclude
  const removeFields = ["select", "sort", "limit", "page"];
  removeFields.map((field) => delete query[field]);

  let queryStr = JSON.stringify(query);
  queryStr = queryStr.replace(/\b(gt|gte|lte|lt)\b/g, (match) => `$${match}`);

  let finalQuery = Bootcamp.find(JSON.parse(queryStr));

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    finalQuery.select(fields);
  }

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    finalQuery.sort(sortBy);
  } else {
    finalQuery.sort("-createdAt");
  }

  // Paginations
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();

  finalQuery.skip(startIndex).limit(limit);

  let bootcamps = await finalQuery.populate({
    path: "courses",
    select: "title",
  });
  const count = bootcamps.length;

  let paginations = {};
  if (endIndex < total) {
    paginations.next = {
      page: page + 1,
      count,
    };
  }

  if (startIndex > 0) {
    paginations.prev = {
      page: page - 1,
      count,
    };
  }

  res
    .status(200)
    .json({ success: true, count: total, paginations, data: bootcamps });
});

// @desc create new bootcamps
// @route POST /api/v1/bootcamps
// @access Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

// @desc get bootcamp by id
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcampById = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(new ErrorResponse("No bootcamp found", 404));
  }

  res.status(200).json({ success: true, data: bootcamp });
});

// @desc update bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(new ErrorResponse("No bootcamp found", 404));
  }

  res.status(200).json({ success: true, data: bootcamp });
});

// @desc delete bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(new ErrorResponse("No bootcamp found", 404));
  }

  bootcamp.deleteOne();

  res.status(200).json({ success: true, data: {} });
});
