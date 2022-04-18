import dotenv from "dotenv";
import mongoose from "mongoose";
import app from './server';

dotenv.config();
const PORT = process.env.PORT;

mongoose.connect(process.env.DB_URL!, () => {
	console.log("MongoDB connected");
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
})