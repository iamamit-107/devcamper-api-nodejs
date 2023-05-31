const express = require("express");
const { getAllCourses, getCourse, addCourse, updateCourse, deleteCourse } = require("../controllers/courses");
const router = express.Router({ mergeParams: true });

router.route("/").get(getAllCourses).post(addCourse);
router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse)

module.exports = router;
