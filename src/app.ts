import mongoose from 'mongoose';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';

import { config } from 'dotenv';
config({ path: '.env' });

const isProduction = process.env.NODE_ENV === 'production';
const defaultAllowedOrigins = ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:4321', 'http://localhost:4322'];
const envOrigins = (process.env.ALLOWED_ORIGINS ?? '')
	.split(',')
	.map((origin) => origin.trim())
	.filter((origin) => origin.length > 0);
const allowedOrigins = envOrigins.length > 0 ? envOrigins : defaultAllowedOrigins;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI as string, {
	autoCreate: true,
	autoIndex: true
});

const app = express();

app.use(helmet());
app.use(
	cors({
		origin: allowedOrigins,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization']
	})
);
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
	res.json({
		message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
	});
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
