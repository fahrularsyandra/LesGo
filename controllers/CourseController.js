const { Course } = require('../models');

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
            const courses = await Course.create(req.body)
            res.json({ message: "Course has been added!", data: courses })
        } catch (error) {
            res.json({ error: error })
        }
    }
}

module.exports = CourseController