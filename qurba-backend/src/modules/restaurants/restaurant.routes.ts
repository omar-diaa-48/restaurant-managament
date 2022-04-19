import { Router } from "express";
import query from "../../middlewares/query.middleware";
import { Restaurant } from "../../models";
import RestaurantController from "./restaurant.controller";

const restaurantRouter: Router = Router();
const restaurantController: RestaurantController = new RestaurantController(Restaurant);

restaurantRouter.get('/nearest', restaurantController.findNearest)

restaurantRouter.get('/:id', restaurantController.findById)

restaurantRouter.route('/')
	.get(query, restaurantController.listAll)
	.post(restaurantController.addOne)

export default restaurantRouter;