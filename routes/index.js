const route = require("express").Router();
const { homePage } = require("../controllers");

route.get("/", homePage);

const companyRoutes = require("./company");
route.use("/partners", companyRoutes);

const courseRoutes = require("./course");
route.use("/courses", courseRoutes);

const userRoutes = require("./user");
route.use("/partners", userRoutes);


route.all("*", (req, res) => {
	res.render("error/404.ejs", { message: "PAGE_NOT_FOUND!" });
});

module.exports = route;
