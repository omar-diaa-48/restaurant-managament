import dotenv from "dotenv";
import express, { Request, Response } from "express";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!')
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
})