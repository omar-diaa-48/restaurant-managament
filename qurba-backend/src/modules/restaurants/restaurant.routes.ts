import { Router } from "express";
import { Restaurant } from "../../models";
import RestaurantController from "./restaurant.controller";

const restaurantRouter: Router = Router();
const restaurantController: RestaurantController = new RestaurantController(Restaurant);

restaurantRouter.get('/:id', restaurantController.findById)
restaurantRouter.get('/', restaurantController.listAll)

export default restaurantRouter;