import express from "express";

// create a server class
class Server {
	public app: express.Application;

	constructor() {
		this.app = express();
	}
}

const { app } = new Server();

// export a single instance of the server
export default app;