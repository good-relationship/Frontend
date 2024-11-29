import React from 'react';

import CursorList from '@/components/canvas/multiplay/CursorList';
import DraftList from '@/components/canvas/multiplay/DraftList';

const Multiplayer = () => {
	return (
		<>
			<CursorList />
			<DraftList />
		</>
	);
};

export default Multiplayer;
