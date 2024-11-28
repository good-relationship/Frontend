import { atom } from 'recoil';

import { FolderStateDTO } from '@/models/document/entity/document';

export const getFolders = atom<FolderStateDTO>({
	key: 'getFolders',
	default: {
		folderInfo: [],
		openFolderID: undefined,
	},
});
