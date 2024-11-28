import { FileId, FileName, FolderId } from '@/models/document/entity/document';
import { CreateFileInfoDTO, CreateOnlyFileInfoDTO } from '@/models/document/request/createFileInfo';
import { CreateFolderInfoDTO } from '@/models/document/request/createFolderInfo';
import { PatchFileContentDTO } from '@/models/document/request/updateFileContentInfo';
import { fetcher } from '@/utils/fetcher';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
// 폴더 & 파일 정보 모두 불러옴
export const getAllFoldersAndFiles = async () => {
	const url = `${baseUrl}/docs/all`;
	const fetch = await fetcher(url, true);
	return fetch;
};

// 폴더 생성 ('+' 버튼 클릭 시, 'Untitled' 이름으로 일단 Post , 이후 Put으로 폴더명 변경)
export const createNewFolder = async ({ folderName }: CreateFolderInfoDTO) => {
	const url = `${baseUrl}/docs/folder`;
	const fetch = await fetcher(url, true, {
		method: 'POST',
		body: JSON.stringify({ folderName }),
	});
	return fetch;
};

// 폴더명 update
export const updateFolderName = async ({ folderName }: CreateFolderInfoDTO, folderId: FolderId) => {
	const url = `${baseUrl}/docs/folder/${folderId}`;
	const fetch = await fetcher(url, true, {
		method: 'PUT',
		body: JSON.stringify({ folderName }),
	});
	return fetch;
};

// 폴더 삭제
export const deleteFolder = async (folderId: FolderId) => {
	const url = `${baseUrl}/docs/folder/${folderId}`; // uri 수정
	await fetcher(url, true, {
		method: 'DELETE',
	});
};

// 파일 생성 ('+' 버튼 클릭 시, 'Untitled' 이름으로 일단 Post , 이후 Put으로 폴더명 변경) 수정 예정,,,
export const createNewFile = async ({ folderId, fileName }: CreateOnlyFileInfoDTO) => {
	const url = `${baseUrl}/docs/file`;
	const fetch = await fetcher(url, true, {
		method: 'POST',
		body: JSON.stringify({ fileName, folderId }),
	});
	return fetch;
};

// 파일명 수정(api 없음)
export const updateFileName = async (fileId: FileId, fileName: FileName) => {
	const url = `${baseUrl}/docs/file/name/${fileId}`;
	const fetch = await fetcher(url, true, {
		method: 'PATCH',
		body: JSON.stringify(fileName),
	});
	return fetch;
};

// 파일 삭제
export const deleteFile = async (fileId: FileId) => {
	const url = `${baseUrl}/docs/file/${fileId}`; // uri 수정
	await fetcher(url, true, {
		method: 'DELETE',
	});
};

// 문서 조회
export const getFileContent = async (fileId: FileId) => {
	const url = `${baseUrl}/docs/file/${fileId}`;
	const fetch = await fetcher(url, true);
	return fetch;
};

// 문서 수정
export const updateFileContent = async ({ fileId, fileName, folderId, content }: CreateFileInfoDTO) => {
	const url = `${baseUrl}/docs/file/${fileId}`;
	const fetch = await fetcher(url, true, {
		method: 'PUT',
		body: JSON.stringify({ fileName, folderId, content }),
	});
	return fetch;
};

// 문서 내용 수정
export const patchFileContent = async (fileId: FileId, { content }: PatchFileContentDTO) => {
	const url = `${baseUrl}/docs/file/${fileId}`;
	await fetcher(url, true, {
		method: 'PATCH',
		body: JSON.stringify({ content }),
	});
};
