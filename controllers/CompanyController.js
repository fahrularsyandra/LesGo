const { where } = require("sequelize");
const { Company, Course } = require("../models");

class CompanyController {
	static async get(req, res) {
		try {
			const companies = await Company.findAll({
				include: [
					{
						model: Course,
					},
				],
			});
			// res.json({ data: companies })
			res.render("partners/index.ejs", { companies });
		} catch (error) {
			res.json({ error: error });
		}
	}

	static async getSpesificCompany(req, res) {
		try {
			const company = await Company.findAll({
				where: {
					id: req.params.id,
				},
				include: [
					{
						model: Course,
					},
				],
			});
			// res.json({ data: company })
			res.render("partners/detail.ejs", { company: company[0] });
		} catch (error) {
			res.json({ error: error });
		}
	}

	static add = async (req, res) => res.render("partners/store.ejs");

	static async create(req, res) {
		try {
			const companies = await Company.create(req.body);
			// res.json({ message: "company has been added!", data: companies });
			res.redirect("/partners");
		} catch (error) {
			res.json({ error: error });
		}
	}

	static edit = async (req, res) => {
		try {
			const company = await Company.findByPk(req.params.id);

			res.render("partners/update.ejs", { company });
		} catch (error) {
			res.send(error);
		}
	};

	static update = async (req, res) => {
		try {
			await Company.update(req.body, { where: { id: req.params.id } });

			res.redirect("/partners");
		} catch (error) {
			res.send(error);
		}
	};

	static delete = async (req, res) => {
		try {
			await Company.destroy({
				where: { id: req.params.id },
			});
			res.redirect("/partners");
		} catch (error) {
			res.json(error);
		}
	};
}

module.exports = CompanyController;