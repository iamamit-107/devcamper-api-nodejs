const asyncHandler = require("../middlewares/async");
const Bootcamp = require("../models/Bootcamp");
const Course = require("../models/Course");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc get all courses
// @route GET /api/v1/courses
// @route GET /api/v1/bootcamps/:bootcampId/courses
// @access Public
exports.getAllCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: "bootcamp",
      select: "name description",
    });
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    courses: courses,
  });
});

// @desc get course by id
// @route GET /api/v1/courses/:id
// @access Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorResponse("Course not found!", 400));
  }

  res.status(200).json({
    success: true,
    course,
  });
});

// @desc add a course
// @route GET /api/v1/bootcamp/:bootcampId/courses
// @access Private
exports.addCourse = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  
    if (!bootcamp) {
      return next(new ErrorResponse("Course not found!", 400));
    }

    const course = await Course.create(req.body)
  
    res.status(200).json({
      success: true,
      data: course,
    });
  });

// @desc update a course
// @route GET /api/v1/courses/:id
// @access Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorResponse("Course not found!", 400));
  }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
    })
  
    res.status(200).json({
      success: true,
      data: updatedCourse,
    });
  });

// @desc delete a course
// @route GET /api/v1/courses/:id
// @access Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorResponse("Course not found!", 400));
  }

    await Course.findByIdAndRemove(req.params.id)
  
    res.status(200).json({
      success: true,
      data: {},
    });
  });
