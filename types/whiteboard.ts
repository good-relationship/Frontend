export type Point = {
	x: number;
	y: number;
};

export type Points = Point[];

export type Path = {
	type?: 'path';
	points: [x: number, y: number, pressure: number][];
	x: number;
	y: number;
	width?: number;
	height?: number;
	fill: string;
};

export type Layer = Path;

export type Mode = 'NONE' | 'PENCIL';
