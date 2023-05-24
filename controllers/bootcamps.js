const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (error) {
    next(error)
  }
};

// @desc create new bootcamps
// @route POST /api/v1/bootcamps
// @access Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    next(error)
  }
};

// @desc get bootcamp by id
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcampById = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return next(new ErrorResponse("No bootcamp found", 404));
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error);
  }
};

// @desc update bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return next(new ErrorResponse("No bootcamp found", 404));
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error)
  }
};

// @desc delete bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndRemove(req.params.id);

    if (!bootcamp) {
      return next(new ErrorResponse("No bootcamp found", 404));
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error)
  }
};
