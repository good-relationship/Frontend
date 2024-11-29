import { useStorage } from '@liveblocks/react';
import React from 'react';

import PathFromStorage from '@/components/canvas/PathFromStorage';

const PathList = () => {
	const layerOrderList = useStorage((root) => root.layerOrderList);
	return (
		<>
			{layerOrderList?.map((id) => {
				return <PathFromStorage key={id} id={id} />;
			})}
		</>
	);
};

export default PathList;
