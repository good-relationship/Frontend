import FolderInfo from './FolderInfo';

import { mockGetDocumenFoldertInfoData } from '@/mocks/documentFolder';

const FolderList = () => {
	const folders = mockGetDocumenFoldertInfoData;

	return (
		<div className="h-full max-h-[480px]">
			{folders.map((folder) => {
				return <FolderInfo folderName={folder.folderName} isOpen={folder.isOpen} />;
			})}
		</div>
	);
};

export default FolderList;
