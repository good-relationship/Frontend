'use client';
import Image from 'next/image';

import { mockGetDocumenFoldertInfoData } from '@/mocks/documentFolder';

const DocumentHeader = () => {
	const folders = mockGetDocumenFoldertInfoData;

	const addFolder = () => {
		[...folders, { folderName: 'Untitled', isOpen: false }];
		console.log('Add!');
	};

	return (
		<div className="w-full typo-Header4 flex gap-3">
			<div>기록</div>
			<Image
				src="/icons/add_folder.svg"
				alt="add folder button"
				width={32}
				height={32}
				className="cursor-pointer"
				onClick={addFolder}
			/>
		</div>
	);
};

export default DocumentHeader;
