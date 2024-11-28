import { Content, FileId, FileName } from '../entity/document';

export type GetFileContentInfoDTO = {
	fileId: FileId;
	fileName: FileName;
	content: Content;
};
