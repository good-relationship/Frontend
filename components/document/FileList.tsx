import FileInfo from './FileInfo';

import { mockGetDocumentFileInfoData } from '@/mocks/documentFile';

const FileList = () => {
	const files = mockGetDocumentFileInfoData;

	return (
		<div className="h-full max-h-[70vh] flex">
			<div className="border-l-4 border-l-gray-300 mr-[5vw]" />
			<div className="overflow-y-auto overflow-x-hidden">
				{files.map((file) => {
					return <FileInfo fileName={file.fileName} fileId={file.fileId} />;
				})}
			</div>
		</div>
	);
};

export default FileList;
