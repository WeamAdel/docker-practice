import express from 'express';
import mongoose from 'mongoose';
import eventsRoutes from './routes/events';
import cors from 'cors';

const app = express();
const port = 9000;

const MONGODB_URI = process.env.MONGODB_URI as string;

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
		process.exit(1);
	});

// Middleware
app.use(express.json());

// CORS
app.use(
	cors({
		origin: process.env.HOST_URL,
		credentials: true,
	})
);

app.use('/events', eventsRoutes);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);

	setInterval(() => {
		console.log('Still working... | Version: 3.0.0');
	}, 10000);
});
