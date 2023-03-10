const { Company, Course, User } = require("../models");
const Joi = require('joi');

class CompanyController {
    static async get(req, res) {
        try {
            const companies = await Company.findAll({
                include: [{
                    model: Course,
                }, ],
                order: [
                    ["id", "asc"]
                ],
            });
            // res.json({ data: companies })
            res.render("partners/index.ejs", { companies });
        } catch (error) {
            res.render("error/errorPage.ejs", { message: error.message });
        }
    }

    static async getSpesificCompany(req, res) {
        try {
            const company = await Company.findAll({
                where: {
                    id: req.params.id,
                },
                include: [{
                    model: Course,
                }, ],
            });

            const users = await User.findAll({
                include: [{
                        model: Company,
                        where: { id: +req.params.id },
                    },
                    Course,
                ],
                order: [
                    ["id", "asc"]
                ],
            });
            // res.json({ data: company })
            res.render("partners/detail.ejs", { company: company[0], users });
        } catch (error) {
            res.render("error/errorPage.ejs", { message: error.message });
        }
    }

    static add = async(req, res) => res.render("partners/store.ejs");

    static async create(req, res) {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                no_telp: Joi.number().required(),
                address: Joi.string().required()
            })
            const { error } = schema.validate(req.body)
            if (error) {
                res.render("error/errorPage.ejs", { message: error.details[0].message });
            }
            const companies = await Company.create(req.body);
            res.redirect("/partners");
        } catch (error) {
            res.render("error/errorPage.ejs", { message: error.message });
        }
    }

    static edit = async(req, res) => {
        try {
            const company = await Company.findByPk(req.params.id);

            res.render("partners/update.ejs", { company });
        } catch (error) {
            res.render("error/errorPage.ejs", { message: error.message });
        }
    };

    static update = async(req, res) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                no_telp: Joi.number().required(),
                address: Joi.string().required()
            })
            const { error } = schema.validate(req.body)
            if (error) {
                res.render("error/errorPage.ejs", { message: error.details[0].message });
            }
            await Company.update(req.body, { where: { id: req.params.id } });

            res.redirect("/partners");
        } catch (error) {
            res.render("error/errorPage.ejs", { message: error.message });
        }
    };

    static delete = async(req, res) => {
        try {
            await Company.destroy({
                where: { id: req.params.id },
            });
            res.redirect("/partners");
        } catch (error) {
            res.render("error/errorPage.ejs", { message: error.message });
        }
    };
}

module.exports = CompanyController;