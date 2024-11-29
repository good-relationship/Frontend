import { useOthersConnectionIds } from '@liveblocks/react/suspense';
import React from 'react';

import Cursor from '@/components/canvas/multiplay/Cursor';

const CursorList = () => {
	const ids = useOthersConnectionIds();

	return (
		<>
			{ids.map((id, index) => {
				return <Cursor key={id} id={id} index={index} />;
			})}
		</>
	);
};

export default CursorList;
