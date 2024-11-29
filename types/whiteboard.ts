export type Point = {
	x: number;
	y: number;
};

export type Path = {
	type: 'path';
	points: [x: number, y: number, pressure: number][];
};

export type Layer = Path;
