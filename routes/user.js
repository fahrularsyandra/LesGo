const userRoute = require('express').Router();
const UserController = require('../controllers/UserController');


userRoute.get('/', UserController.get)
userRoute.get('/:id', UserController.getSpesificUser)
userRoute.post('/create', UserController.create)

module.exports = userRoute