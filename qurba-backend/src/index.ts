import dotenv from "dotenv";
import app from './server';

dotenv.config();
const PORT = process.env.PORT;

if (!PORT) {
	console.error(`Server PORT is not defined`);
	process.exit(0)
}

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
})