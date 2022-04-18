import { Router } from "express";
import { Cuisine } from "../../models";
import CuisineController from "./cuisine.controller";

const cuisineRouter: Router = Router();
const cuisineController: CuisineController = new CuisineController(Cuisine);

cuisineRouter.get('/:id', cuisineController.findById)
cuisineRouter.get('/', cuisineController.listAll)

export default cuisineRouter;