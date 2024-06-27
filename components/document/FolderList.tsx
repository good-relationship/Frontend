import FolderInfo from './FolderInfo';

import { mockGetDocumenFoldertInfoData } from '@/mocks/documentFolder';

interface folderInfoData {
	folderId?: string;
}

const FolderList = ({ folderId }: folderInfoData) => {
	const folders = mockGetDocumenFoldertInfoData;

	return (
		<div className={`${folderId ? 'hidden' : 'block'} sm:block h-full max-h-[480px]`}>
			{folders.map((folder) => {
				return <FolderInfo folderId={folder.folderId} folderName={folder.folderName} isOpen={folder.isOpen} />;
			})}
		</div>
	);
};

export default FolderList;
