const express = require("express");
const { getBootcamps, createBootcamp, getBootcampById, updateBootcamp, deleteBootcamp } = require("../controllers/bootcamps");
const router = express.Router();

// re-route it to courses route
const courseRouter = require("./course");
router.use("/:bootcampId/courses", courseRouter)

router.route("/").get(getBootcamps).post(createBootcamp);

router.route("/:id").get(getBootcampById).put(updateBootcamp).delete(deleteBootcamp)

module.exports = router;
