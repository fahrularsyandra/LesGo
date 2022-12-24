const companyRoute = require('express').Router();
const CompanyController = require('../controllers/CompanyController');


companyRoute.get('/', CompanyController.get)
companyRoute.get("/create", CompanyController.add);
companyRoute.get("/:id", CompanyController.getSpesificCompany);
companyRoute.post("/create", CompanyController.create);
companyRoute.get("/delete/:id", CompanyController.delete);
companyRoute.get("/update/:id", CompanyController.edit);
companyRoute.post("/update/:id", CompanyController.update);

module.exports = companyRoute