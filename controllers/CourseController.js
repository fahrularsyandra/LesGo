const { Course, Company } = require("../models");
const Joi = require('joi');

class CourseController {
    static async get(req, res) {
        try {
            const courses = await Course.findAll({
                include: [Company],
                order: [
                    ["id", "asc"]
                ],
            });
            res.render("courses/index.ejs", { courses });
        } catch (error) {
            res.render("error/errorPage.ejs", { message: error.message });
        }
    }

    static add = async(req, res) => {
        try {
            const companies = await Company.findAll();

            res.render("courses/store.ejs", { companies });
        } catch (error) {
            res.render("error/errorPage.ejs", { message: error.message });
        }
    };

    static async create(req, res) {
        try {
            // res.json(req.body);
            const schema = Joi.object({
                name: Joi.string().required(),
                company_id: Joi.number().required(),
                price: Joi.number().required(),
                duration: Joi.number().required()
            })
            const { error } = schema.validate(req.body)
            if (error) {
                res.render("error/errorPage.ejs", { message: error.details[0].message });
            }
            const courses = await Course.create(req.body);
            res.redirect("/courses");
        } catch (error) {
            res.render("error/errorPage.ejs", { message: error.message });
        }
    }

    static edit = async(req, res) => {
        try {
            const course = await Course.findByPk(req.params.id);
            const companies = await Company.findAll();
            // res.json(course.company_id);
            res.render("courses/update.ejs", { course, companies });
        } catch (error) {
            res.render("error/errorPage.ejs", { message: error.message });
        }
    };

    static update = async(req, res) => {
        try {
            await Course.update(req.body, {
                where: { id: req.params.id },
            });
            res.redirect("/courses");
        } catch (error) {
            res.render("error/errorPage.ejs", { message: error.message });
        }
    };

    static delete = async(req, res) => {
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