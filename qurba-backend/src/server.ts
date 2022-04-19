import cors from "cors";
import express from "express";
import * as swaggerUi from 'swagger-ui-express';
import error from "./middlewares/error.middleware";
// routers
import appHealthRouter from "./modules/app-health/app-health.routes";
import cuisineRouter from "./modules/cuisines/cuisine.routes";
import restaurantRouter from "./modules/restaurants/restaurant.routes";
import userRouter from "./modules/users/user.routes";


const swaggerDocument = require('./swagger.json');

// create a server class
class Server {
	public app: express.Application;

	constructor() {
		this.app = express();

		this.configureMiddlewares();
		this.mountRoutes();
	}

	private configureMiddlewares() {
		//parse all requests middleware
		this.app.use(express.json())
		//parse requests that looks into content type
		this.app.use(express.urlencoded({ extended: true }));
		//allow cors
		this.app.use(cors())
		//use public folder for any static files
		this.app.use(express.static('public'))
	}

	private mountRoutes(): void {
		//use api-docs for swagger documentation of APIs
		this.app.use(
			'/api-docs',
			swaggerUi.serve,
			swaggerUi.setup(swaggerDocument, {
				swaggerOptions: {
					persistAuthorization: true
				}
			})
		);

		this.app.use('/', appHealthRouter);
		this.app.use('/users', userRouter);
		this.app.use('/restaurants', restaurantRouter);
		this.app.use('/cuisines', cuisineRouter);

		// use if the route is not found
		this.app.use('*', (req, res) => {
			res.status(404).json({
				message: 'API Not Found',
				code: 404
			});
		});

		// use to handle application errors
		this.app.use(error);
	}
}

const { app } = new Server();

// export a single instance of the server
export default app;