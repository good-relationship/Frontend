import { useSelf } from '@liveblocks/react';
import React from 'react';

import Path from '@/components/canvas/Path';
import { colors } from '@/constants/colors';
import { Point } from '@/types/whiteboard';

type DraftProps = {
	camera: Point;
};

const Draft = ({ camera }: DraftProps) => {
	const pencilDraft = useSelf((me) => me.presence.pencilDraft);
	const penColor = useSelf((me) => me.presence.penColor);

	if (!pencilDraft) {
		return null;
	}

	return (
		<Path
			type="path"
			points={pencilDraft}
			x={camera.x}
			y={camera.y}
			width={0}
			height={0}
			fill={penColor || colors['Purple-500']}
		/>
	);
};

export default Draft;
