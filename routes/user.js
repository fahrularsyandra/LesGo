const { Router } = require("express");
const userRoute = Router();
const { UserController } = require("../controllers");

userRoute.get("/:partnerId/users/create", UserController.add);
userRoute.post("/:partnerId/users/create", UserController.create);
userRoute.get("/:partnerId/users/update/:userId", UserController.edit);
userRoute.post("/:partnerId/users/update/:userId", UserController.update);
userRoute.get("/:partnerId/users/delete/:userId", UserController.delete);

module.exports = userRoute;
