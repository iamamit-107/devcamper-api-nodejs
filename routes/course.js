const express = require("express");
const { getAllCourses, getCourse, addCourse } = require("../controllers/courses");
const router = express.Router({ mergeParams: true });

router.route("/").get(getAllCourses).post(addCourse);
router.route("/:id").get(getCourse)

module.exports = router;
