const companyRoute = require('express').Router();
const CompanyController = require('../controllers/CompanyController');


companyRoute.get('/', CompanyController.get)
companyRoute.get('/:id', CompanyController.getSpesificCompany)
companyRoute.post('/create', CompanyController.create)

module.exports = companyRoute