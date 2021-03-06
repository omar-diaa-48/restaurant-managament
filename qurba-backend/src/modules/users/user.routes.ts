import { Router } from "express";
import { User } from "../../models";
import UserController from "./user.controller";

const userRouter: Router = Router();
const userController: UserController = new UserController(User);

userRouter.route('/')
	.get(userController.listAll)
	.post(userController.addOne)

userRouter.get('/:id', userController.findById)

userRouter.post('/:id/restaurants', userController.addRestaurant)

userRouter.delete('/:id/restaurants/:restaurantId', userController.removeRestaurant)

export default userRouter;