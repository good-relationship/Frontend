'use client';

import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import FileList from './FileList';
import FolderInfo from './FolderInfo';

import { useDocumentLists } from '@/hooks/documentInfo';
import { FolderId } from '@/models/document/entity/document';
import { getFolders } from '@/stores/atoms/getFolders';

const FolderList = () => {
	const { fetchDocumentLists } = useDocumentLists();

	const [folders, setFolders] = useRecoilState(getFolders);

	// db에 저장되어 있는 파일 및 폴더들 받아와서 getFolders에 저장
	useEffect(() => {
		fetchDocumentLists();

		const intervalId = setInterval(fetchDocumentLists, 5000); // 폴링 주기(다른 사용자가 추가할 수도 있으니까)
		return () => clearInterval(intervalId);
	}, []);

	const handleFolderState = (selectedFolderId: FolderId) => {
		setFolders((prev) => ({ ...prev, openFolderID: selectedFolderId }));
	};

	return (
		<div className="flex gap-[5vw] w-full">
			<div className={`sm:block h-full max-h-[480px] overflow-y-auto overflow-x-hidden min-w-[350px]`}>
				{folders.folderInfo.map((folder) => {
					return <FolderInfo folderId={folder.folderId} onFolderSelect={handleFolderState} />;
				})}
			</div>
			<FileList folderId={folders.openFolderID} />
		</div>
	);
};

export default FolderList;
