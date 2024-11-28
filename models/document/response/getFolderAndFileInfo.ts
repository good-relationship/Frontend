import { FileInfo, FolderId, FolderName } from '../entity/document';

export type GetFolderAndFileDTO = {
	folderId: FolderId;
	folderName: FolderName;
	files: FileInfo[];
};
