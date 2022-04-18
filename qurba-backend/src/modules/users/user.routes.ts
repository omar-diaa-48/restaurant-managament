import { Router } from "express";
import UserController from "./user.controller";

const userRouter: Router = Router();
const userController: UserController = new UserController();