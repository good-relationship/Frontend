import getStroke from 'perfect-freehand';
import React from 'react';

import { strokeConfig } from '@/components/canvas/canvas.config';
import { getSvgPathFromStroke } from '@/components/canvas/point.util';
import { Path as PathProps } from '@/types/whiteboard';

const Path = ({ points, x, y }: PathProps) => {
	const getPath = (points: number[][]) => getSvgPathFromStroke(getStroke(points, strokeConfig));

	return (
		<path
			d={getPath(points)}
			fill="#000000"
			x={0}
			y={0}
			strokeWidth={1}
			style={{
				transform: `translate(${x}px, ${y}px)`,
			}}
		/>
	);
};

export default Path;
