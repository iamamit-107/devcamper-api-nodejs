const express = require("express");
const { getAllCourses, getCourse } = require("../controllers/courses");
const router = express.Router({ mergeParams: true });

router.route("/").get(getAllCourses);
router.route("/:id").get(getCourse)

module.exports = router;
