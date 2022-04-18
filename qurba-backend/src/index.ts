import dotenv from "dotenv";
import mongoose from "mongoose";
import app from './server';

dotenv.config();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL!)
mongoose.connection.on('connected', () => console.log('MongoDB Connected'));
mongoose.connection.on('error', () => console.log('MongoDB failed to connect'))

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
})