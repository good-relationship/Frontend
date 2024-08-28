import { GetDocumentFolderInfoDTO } from '@/models/document/getDocumentFolderInfoDTO';

export const mockGetDocumenFoldertInfoData: GetDocumentFolderInfoDTO[] = [
	{
		folderId: 1,
		folderName: 'folder1',
		isOpen: true,
	},
	{
		folderId: 2,
		folderName: 'folder2',
		isOpen: false,
	},
	{
		folderId: 3,
		folderName: 'Untitled',
		isOpen: false,
	},
];
