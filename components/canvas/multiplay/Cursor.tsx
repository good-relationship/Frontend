import { useOther } from '@liveblocks/react/suspense';
import React from 'react';

import { Id } from '@/components/canvas/multiplay/cursor.type';
import { getCursorColor } from '@/components/canvas/multiplay/cursor.util';

type CursorProps = {
	id: Id;
	index: number;
};

const Cursor = ({ id, index }: CursorProps) => {
	const cursor = useOther(id, (user) => user.presence.cursor);
	if (!cursor) {
		return null;
	}

	const { x, y } = cursor;
	return (
		<path
			style={{
				transform: `translateX(${x}px) translateY(${y}px)`,
			}}
			d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
			fill={getCursorColor(index)}
		/>
	);
};

export default Cursor;
