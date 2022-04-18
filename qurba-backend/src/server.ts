import cors from "cors";
import express from "express";
import * as swaggerUi from 'swagger-ui-express';
import error from "./middlewares/error.middleware";

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