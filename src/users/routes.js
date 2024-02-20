const { Router } = require("express");
const userRouter = Router();

const { hashPass, comparePass } = require("../middleware/auth");

const { signupUser, getAllUsers, login } = require("./controllers");

userRouter.post("/users/signup", hashPass, signupUser);

userRouter.post("/users/login", comparePass, login);

userRouter.get("/users/getAllUsers", getAllUsers);

module.exports = userRouter;
