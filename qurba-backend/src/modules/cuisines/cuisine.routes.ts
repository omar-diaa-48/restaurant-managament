import { Router } from "express";
import query from "../../middlewares/query.middleware";
import { Cuisine } from "../../models";
import CuisineController from "./cuisine.controller";

const cuisineRouter: Router = Router();
const cuisineController: CuisineController = new CuisineController(Cuisine);

cuisineRouter.get('/:id', cuisineController.findById)
cuisineRouter.get('/', query, cuisineController.listAll)

export default cuisineRouter;