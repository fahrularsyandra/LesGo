const courseRoute = require('express').Router();
const CourseController = require('../controllers/CourseController');


courseRoute.get('/', CourseController.get)
courseRoute.get("/create", CourseController.add);
courseRoute.post("/create", CourseController.create);
courseRoute.get("/delete/:id", CourseController.delete);
courseRoute.get("/update/:id", CourseController.edit);
courseRoute.post("/update/:id", CourseController.update);

module.exports = courseRoute