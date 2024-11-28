import { GetFolderAndFileDTO } from '../response/getFolderAndFileInfo';

export type FolderId = number | undefined;
export type FolderName = string;

export type FileId = number;
export type FileName = string;

export type Content = string;

export type FileInfo = {
	fileId: FileId;
	fileName: FileName;
};

export type FolderInfo = {
	folderName: FolderName;
};

export type FolderStateDTO = {
	folderInfo: GetFolderAndFileDTO[];
	openFolderID: FolderId | undefined;
};
