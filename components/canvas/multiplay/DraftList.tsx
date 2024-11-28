import { shallow, useOthersMapped } from '@liveblocks/react/suspense';
import React from 'react';

import Path from '@/components/canvas/Path';

const DraftList = () => {
	const drafts = useOthersMapped(
		(root) => ({
			pencilDraft: root.presence.pencilDraft,
			penColor: root.presence.penColor,
		}),
		shallow,
	);
	return (
		<>
			{drafts.map(([key, draft]) => {
				if (!draft.pencilDraft) {
					return null;
				}

				return <Path key={key} x={0} y={0} points={draft.pencilDraft} fill={draft.penColor} />;
			})}
		</>
	);
};

export default DraftList;
