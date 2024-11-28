'use client';
import Image from 'next/image';

import { createNewFolder } from '@/apis/document';
import { useDocumentLists } from '@/hooks/documentInfo';

const DocumentHeader = () => {
	const { fetchDocumentLists } = useDocumentLists();

	const addFolder = async () => {
		await createNewFolder({ folderName: 'Untitled' });
		fetchDocumentLists();
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
