const { User, Company, Course, UserCourse } = require("../models");
const Joi = require('joi');


class UserController {
    static add = async(req, res) => {
        try {
            const company = await Company.findByPk(req.params.partnerId, {
                include: [Course],
                order: [
                    ["id", "asc"]
                ],
            });
            res.render("users/store.ejs", { company });
        } catch (error) {
            res.render("error/errorPage.ejs", { message: error.message });
        }
    };

    static create = async(req, res) => {
        try {
            const { name, age, gender, address, course_id: courses } = req.body;
            const partnerId = +req.params.partnerId;
            const schema = Joi.object({
							name: Joi.string().required(),
							age: Joi.number().required().greater(0),
							course_id: Joi.string().required(),
							address: Joi.string().required(),
							gender: Joi.string().required(),
						});
            const { error } = schema.validate(req.body)
            if (error) {
                res.render("error/errorPage.ejs", { message: error.details[0].message });
            }
            const user = await User.create({
                name,
                age,
                address,
                gender,
            });

            switch ((typeof courses).toUpperCase()) {
                case "OBJECT":
                    const userCourses = courses.map((id) => {
                        return UserCourse.create({
                            user_id: user.id,
                            company_id: partnerId,
                            course_id: id,
                        });
                    });
                    await Promise.all(userCourses);
                    break;
                default:
                    await UserCourse.create({
                        user_id: user.id,
                        company_id: partnerId,
                        course_id: courses,
                    });
                    break;
            }

            res.redirect(`/partners/${partnerId}#main`);
        } catch (error) {
            res.render("error/errorPage.ejs", { message: error.message });
        }
    };

    static edit = async(req, res) => {
        try {
            const company = await Company.findByPk(req.params.partnerId, {
                include: [Course],
            });
            const user = await User.findOne({
                where: { id: req.params.userId },
                include: [{
                        model: Company,
                        where: { id: req.params.partnerId },
                    },
                    {
                        model: Course,
                    },
                ],
            });

            // res.json(user);
            res.render("users/update.ejs", {
                company,
                user,
                courseId: user.Courses.map((course) => course.id),
            });
        } catch (error) {
            res.render("error/errorPage.ejs", { message: error.message });
        }
    };

    static update = async(req, res) => {
        try {
            const getUser = await User.findByPk(req.params.userId);
            const { name, age, gender, address, course_id: courses } = req.body;
            const partnerId = +req.params.partnerId;
            const schema = Joi.object({
							name: Joi.string().required(),
							age: Joi.number().required().greater(0),
							address: Joi.string().required(),
							course_id: Joi.string().required(),
							gender: Joi.string().required(),
						});
            const { error } = schema.validate(req.body)
            if (error) {
                res.render("error/errorPage.ejs", { message: error.details[0].message });
            }

            const user = await getUser.update({
                name,
                age,
                address,
                gender,
            });

            switch ((typeof courses).toUpperCase()) {
                case "OBJECT":
                    const userCourses = courses.map((id) => {
                        return UserCourse.create({
                            user_id: user.id,
                            company_id: partnerId,
                            course_id: id,
                        });
                    });
                    await UserCourse.destroy({ where: { user_id: req.params.userId } });
                    await Promise.all(userCourses);
                    break;
                default:
                    await UserCourse.destroy({ where: { user_id: req.params.userId } });
                    await UserCourse.create({
                        user_id: user.id,
                        company_id: partnerId,
                        course_id: courses,
                    });
                    break;
            }

            res.redirect(`/partners/${partnerId}#main`);
        } catch (error) {
            res.render("error/errorPage.ejs", { message: error.message });
        }
    };

    static delete = async(req, res) => {
        try {
            await User.destroy({
                where: { id: req.params.userId },
            });
            res.redirect(`/partners/${req.params.partnerId}#main`);
        } catch (error) {
            res.render("error/errorPage.ejs", { message: error.message });
        }
    };
}

module.exports = UserController;