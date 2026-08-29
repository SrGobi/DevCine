import { model, Schema, HydratedDocument } from 'mongoose';

export class Links {
	'1080p': Array<string>;
	'4k': Array<string>;
}

export interface Movie {
	_id: string;
	title: string;
	img: string;
	genre: string;
	year: number;
	links: Links;
}

// Definir el esquema de la película
export const moviesSchema = new Schema({
	_id: String,
	title: String,
	img: String,
	genre: String,
	year: Number,
	links: { type: Object, default: new Links(), required: true }
});

// Tipo hidratado (documento real devuelto por Mongoose)
export type MovieDocument = HydratedDocument<Movie>;

// Definir el modelo de la película
export const Movies = model<Movie>('Movies', moviesSchema);
