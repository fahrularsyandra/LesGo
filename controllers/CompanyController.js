const { Company, Course } = require('../models');
const Joi = require('joi');

class CompanyController {
    static async get(req, res) {
        try {
            const companies = await Company.findAll({
                include: [{
                    model: Course
                }]
            })
            res.json({ data: companies })
        } catch (error) {
            res.json({ error: error })
        }
    }

    static async getSpesificCompany(req, res) {
        try {
            const companies = await Company.findAll({
                where: {
                    id: req.params.id
                },
                include: [{
                    model: Course
                }]
            })
            res.json({ data: companies })
        } catch (error) {
            res.json({ error: error })
        }
    }

    static async create(req, res) {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                no_telp: Joi.number().required(),
                address: Joi.string().required()
            })
            const { error } = schema.validate(req.body)
            if (error) {
                return res.json({ message: error.details[0].message })
            }
            const companies = await Company.create(req.body)
            return res.json({ message: "company has been added!", data: companies })

        } catch (error) {
            res.json({ error: error })
        }
    }
}

module.exports = CompanyController