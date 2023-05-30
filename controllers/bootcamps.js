const asyncHandler = require("../middlewares/async");
const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    let query = JSON.stringify(req.query);
    query = query.replace(/\b(gt|gte|lte|lt)/g, match => `$${match}`)

    const bootcamps = await Bootcamp.find(JSON.parse(query));

    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
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
    const bootcamp = await Bootcamp.findByIdAndRemove(req.params.id);

    if (!bootcamp) {
      return next(new ErrorResponse("No bootcamp found", 404));
    }

    res.status(200).json({ success: true, data: {} });
});
