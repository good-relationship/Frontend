import FileInfo from './FileInfo';

import { mockGetDocumentFileInfoData } from '@/mocks/documentFile';

interface fileDocument {
	folderId?: string;
}

const FileList = ({ folderId }: fileDocument) => {
	const files = mockGetDocumentFileInfoData;

	return (
		<div className={`${folderId ? 'block' : 'hidden'} sm:block w-full`}>
			<div className="h-[60vh] flex overflow-y-auto">
				<div className="sm:border-l-4 border-l-gray-300 mr-[5vw] h-full" />
				<div className="overflow-y-auto overflow-x-hidden w-full sm:max-w-[320px]">
					{files
						.filter((file) => file.folderId === folderId)
						.map((file) => (
							<FileInfo
								key={file.fileId}
								folderId={file.folderId}
								fileName={file.fileName}
								fileId={file.fileId}
							/>
						))}
				</div>
			</div>
		</div>
	);
};

export default FileList;
