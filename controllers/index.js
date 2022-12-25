const { Company, Course } = require("../models");

module.exports = {
	homePage: async (req, res) => {
		try {
			const companies = await Company.findAll({
				include: [Course],
			});

			res.render("index.ejs", { companies });
		} catch (error) {
			res.render("error/errorPage.ejs", { message: error.message });
		}
	},
	CompanyController: require("./CompanyController"),
	CourseController: require("./CourseController"),
	UserController: require("./UserController"),
};
