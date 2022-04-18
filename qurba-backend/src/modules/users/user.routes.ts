import { Router } from "express";
import { User } from "../../models";
import UserController from "./user.controller";

const userRouter: Router = Router();
const userController: UserController = new UserController(User);

userRouter.post('/', userController.addOne)

export default userRouter;