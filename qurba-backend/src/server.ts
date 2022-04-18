import cors from "cors";
import express from "express";
import * as swaggerUi from 'swagger-ui-express';
import error from "./middlewares/error.middleware";
import appHealthRouter from "./modules/app-health/app-health.routes";
import restaurantRouter from "./modules/restaurants/restaurant.routes";

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
		this.app.use('/restaurants', restaurantRouter);

		// use if the route is not found
		this.app.use('*', (req, res) => {
			res.status(404).json({
				message: 'API_NOT_FOUND',
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