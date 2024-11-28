import getStroke from 'perfect-freehand';
import React from 'react';

import { strokeConfig } from '@/components/canvas/canvas.config';
import { getSvgPathFromStroke } from '@/components/canvas/point.util';

type PathProps = {
	pencilDraft: number[][];
	camera: { x: number; y: number };
};

const Path = ({ pencilDraft, camera }: PathProps) => {
	const getPath = (points: number[][]) => getSvgPathFromStroke(getStroke(points, strokeConfig));

	return (
		<path
			d={getPath(pencilDraft)}
			fill="#000000"
			x={0}
			y={0}
			strokeWidth={1}
			style={{
				transform: `translate(${camera.x}px, ${camera.y}px)`,
			}}
		/>
	);
};

export default Path;
