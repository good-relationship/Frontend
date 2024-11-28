import FileContentClient from './FileContentClient';

import { getWorkspaceInfo } from '@/apis/workspace';

interface FileContentProps {
	fileId: number;
}

const FileContent = async ({ fileId }: FileContentProps) => {
	const { workspaceId } = await getWorkspaceInfo();
	const liveBlockApi = process.env.NEXT_PUBLIC_LIVEBLOCKS_KEY;

	if (!liveBlockApi) {
		throw new Error('LIVEBLOCKS_KEY is not set');
	}

	return <FileContentClient fileId={fileId} workspaceId={workspaceId} liveBlockApi={liveBlockApi} />;
};

export default FileContent;
