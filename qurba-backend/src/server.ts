import cors from "cors";
import express from "express";

// create a server class
class Server {
	public app: express.Application;

	constructor() {
		this.app = express();

		this.configureMiddlewares();
	}

	private configureMiddlewares() {
		this.app.use(express.json())
		this.app.use(cors())
	}
}

const { app } = new Server();

// export a single instance of the server
export default app;