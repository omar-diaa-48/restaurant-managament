import { Router } from "express";
import { User } from "../../models";
import UserController from "./user.controller";

const userRouter: Router = Router();
const userController: UserController = new UserController(User);

userRouter.post('/', userController.addOne)

userRouter.post('/:id/restaurants', userController.addRestaurant)

userRouter.delete('/:id/restaurants/:restaurantId', userController.removeRestaurant)

export default userRouter;