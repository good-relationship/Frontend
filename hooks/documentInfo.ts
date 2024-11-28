import { useRecoilState } from 'recoil';

import { getAllFoldersAndFiles } from '@/apis/document';
import { getFolders } from '@/stores/atoms/getFolders';

export const useDocumentLists = () => {
	const [, setFolders] = useRecoilState(getFolders);

	// 폴더와 파일 정보를 가져오는 로직
	const fetchDocumentLists = async () => {
		try {
			const folderInfo = await getAllFoldersAndFiles();
			if (folderInfo) {
				setFolders((prev) => ({ ...prev, folderInfo: folderInfo }));
			} else {
				console.error('Failed to fetch folder info');
			}
		} catch (error) {
			console.error('Error fetching document lists:', error);
		}
	};

	return { fetchDocumentLists };
};
