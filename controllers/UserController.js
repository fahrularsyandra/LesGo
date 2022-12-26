const { User } = require('../models');
const Joi = require('joi');

class UserController {
    static async get(req, res) {
        try {
            const users = await User.findOne()
            const company = users.createCompany(1)
            return res.json({ data: company })
        } catch (err) {
            res.json({ error: err })
        }
    }

    static async getSpesificUser(req, res) {
        try {
            const users = await User.findAll({
                where: {
                    id: req.params.id
                },
                include: [{
                    model: Course
                }]
            })
            res.json({ data: users })
        } catch (error) {
            res.json({ error: error })
        }
    }

    static async create(req, res) {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                age: Joi.number().required(),
                address: Joi.string().required(),
                gender: Joi.string().required()
            })
            const { error } = schema.validate(req.body)
            if (error) {
                return res.json({ message: error.details[0].message })
            }
            const users = await User.create(req.body)
            return res.json({ message: "User has been added!", data: users })

        } catch (error) {
            res.json({ error: error })
        }
    }
}

module.exports = UserController