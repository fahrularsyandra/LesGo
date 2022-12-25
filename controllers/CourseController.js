const { Course, Company } = require("../models");

class CourseController {
	static async get(req, res) {
		try {
			const courses = await Course.findAll({
				include: [Company],
				order: [["id", "asc"]],
			});
			// res.json({ data: courses })
			res.render("courses/index.ejs", { courses });
		} catch (error) {
			res.render("error/errorPage.ejs", { message: error.message });
		}
	}

	static add = async (req, res) => {
		try {
			const companies = await Company.findAll();

			res.render("courses/store.ejs", { companies });
		} catch (error) {
			res.render("error/errorPage.ejs", { message: error.message });
		}
	};

	static async create(req, res) {
		try {
			const courses = await Course.create(req.body);
			res.redirect("/courses");
			// res.json({ message: "Course has been added!", data: courses });
		} catch (error) {
			res.render("error/errorPage.ejs", { message: error.message });
		}
	}

	static edit = async (req, res) => {
		try {
			const course = await Course.findByPk(req.params.id);
			const companies = await Company.findAll();
			// res.json(course.company_id);
			res.render("courses/update.ejs", { course, companies });
		} catch (error) {
			res.render("error/errorPage.ejs", { message: error.message });
		}
	};

	static update = async (req, res) => {
		try {
			await Course.update(req.body, {
				where: { id: req.params.id },
			});
			res.redirect("/courses");
		} catch (error) {
			res.render("error/errorPage.ejs", { message: error.message });
		}
	};

	static delete = async (req, res) => {
		try {
			await Course.destroy({
				where: { id: req.params.id },
			});
			res.redirect("/courses");
		} catch (error) {
			res.render("error/errorPage.ejs", { message: error.message });
		}
	};
}

module.exports = CourseController;
