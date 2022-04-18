import { Router } from "express";
import { User } from "../../models";
import UserController from "./user.controller";

const userRouter: Router = Router();
const userController: UserController = new UserController(User);

userRouter.post('/', userController.addOne)

userRouter.route('/:id/restaurants')
	.post(userController.addRestaurant)
	.delete(userController.removeRestaurant)

export default userRouter;