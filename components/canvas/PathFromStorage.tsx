import { useStorage } from '@liveblocks/react';
import React from 'react';

import Path from '@/components/canvas/Path';

type PathFromStorageProps = {
	id: string;
};

const PathFromStorage = ({ id }: PathFromStorageProps) => {
	const path = useStorage((root) => root.layers.get(id));

	if (!path) {
		return null;
	}

	return <Path key={id} {...path} />;
};

export default PathFromStorage;
