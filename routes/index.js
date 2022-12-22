const company = require('../models/company');

const route = require('express').Router();

const companyRoutes = require('./company');
route.use("/company", companyRoutes)

const courseRoutes = require('./course');
route.use("/course", courseRoutes)

module.exports = route