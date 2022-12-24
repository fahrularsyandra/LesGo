const route = require("express").Router();
const { homePage } = require("../controllers");

route.get("/", homePage);

const companyRoutes = require("./company");
route.use("/partners", companyRoutes);

const courseRoutes = require("./course");
route.use("/courses", courseRoutes);

module.exports = route;
