const courseRoute = require('express').Router();
const CourseController = require('../controllers/CourseController');


courseRoute.get('/', CourseController.get)
courseRoute.get('/:id', CourseController.getSpesificCompany)
courseRoute.post('/create', CourseController.create)

module.exports = courseRoute