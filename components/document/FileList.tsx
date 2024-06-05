import FileInfo from './FileInfo';

import { mockGetDocumentFileInfoData } from '@/mocks/documentFile';

const FileList = () => {
	const files = mockGetDocumentFileInfoData;

	return (
		<div className="h-full max-h-[480px] flex">
			<div className="border-l-4 border-l-gray-300 mr-16" />
			<div className="overflow-y-auto">
				{files.map((file) => {
					return <FileInfo fileName={file.fileName} fileId={file.fileId} />;
				})}
			</div>
		</div>
	);
};

export default FileList;
