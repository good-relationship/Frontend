import { Content, FileId, FileInfo, FileName, FolderId } from '../entity/document';

export type CreateOnlyFileInfoDTO = {
	folderId: FolderId;
	fileName: FileName;
};

export type CreateFileInfoDTO = FileInfo & {
	folderId: FolderId;
	content: Content;
};

export type SelectFileInfoDTO = {
	folderId?: FolderId;
	fileId: FileId;
	fileName: FileName;
};
