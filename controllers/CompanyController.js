const { Company, Course } = require('../models');

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
            const companies = await Company.create(req.body)
            res.json({ message: "company has been added!", data: companies })
        } catch (error) {
            res.json({ error: error })
        }
    }
}

module.exports = CompanyController