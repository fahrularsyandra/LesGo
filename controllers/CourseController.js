const { Course } = require('../models');
const Joi = require('joi');

class CourseController {
    static async get(req, res) {
        try {
            const courses = await Course.findAll()
            res.json({ data: courses })
        } catch (error) {
            res.json({ error: error })
        }
    }
    static async getSpesificCompany(req, res) {
        try {
            const courses = await Course.findAll({
                where: {
                    company_id: req.params.id
                }
            })
            res.json({ data: courses })
        } catch (error) {
            res.json({ error: error })
        }
    }

    static async create(req, res) {
        try {
            // return res.json({ data: req.body })
            const schema = Joi.object({
                name: Joi.string().required(),
                price: Joi.number().required(),
                duration: Joi.number().required(),
                company_id: Joi.number().required()
            })
            const { error } = schema.validate(req.body)
            if (error) {
                return res.json({ message: error.details[0].message })
            }
            const courses = await Course.create(req.body)
            res.json({ message: "Course has been added!", data: courses })
        } catch (error) {
            res.json({ error: error })
        }
    }
}

module.exports = CourseController