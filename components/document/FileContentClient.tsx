'use client';

import { LiveblocksProvider, RoomProvider } from '@liveblocks/react';

import Editor from './editor';

import { initialLiveBlocksData } from '@/components/canvas/canvas.config';

interface FileContentClientProps {
	fileId: number;
	workspaceId: string;
	liveBlockApi: string;
}

const FileContentClient = ({ fileId, workspaceId, liveBlockApi }: FileContentClientProps) => {
	return (
		<div className="mt-8">
			<LiveblocksProvider publicApiKey={liveBlockApi}>
				<RoomProvider id={`${workspaceId}-${fileId}`} {...initialLiveBlocksData}>
					<Editor />
				</RoomProvider>
			</LiveblocksProvider>
		</div>
	);
};

export default FileContentClient;
