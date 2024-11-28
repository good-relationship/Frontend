import { PointerEvent } from 'react';

import { Path, Point } from '@/types/whiteboard';

export const getPathFromPoints = (points: number[][]): Path => {
	let left = Number.POSITIVE_INFINITY;
	let right = Number.NEGATIVE_INFINITY;
	let top = Number.POSITIVE_INFINITY;
	let bottom = Number.NEGATIVE_INFINITY;

	for (const [x, y] of points) {
		left = Math.min(left, x);
		right = Math.max(right, x);
		top = Math.min(top, y);
		bottom = Math.max(bottom, y);
	}

	return {
		type: 'path',
		x: left,
		y: top,
		width: right - left,
		height: bottom - top,
		fill: '#000000',
		points: points.map(([x, y, pressure]) => [x - left, y - top, pressure]),
	};
};

export const getPoint = (e: PointerEvent, camera: Point) => {
	return {
		x: Math.round(e.clientX) - camera.x,
		y: Math.round(e.clientY) - camera.y,
	};
};

export const getSvgPathFromStroke = (stroke: number[][]) => {
	if (!stroke.length) return '';

	const d = stroke.reduce(
		(acc, [x0, y0], i, arr) => {
			const [x1, y1] = arr[(i + 1) % arr.length];
			acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
			return acc;
		},
		['M', ...stroke[0], 'Q'],
	);

	d.push('Z');
	return d.join(' ');
};
