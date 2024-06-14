'use client';

import Editor from './editor';

import { fileEditorContents } from '@/mocks/fileEditor';

const FileContent = () => {
	const data = JSON.stringify(fileEditorContents);

	return (
		<div className="mt-8">
			{/* onChange에는 변화하는 document 넣기 (update) */}
			<Editor onChange={() => {}} initialContent={data} />
		</div>
	);
};

export default FileContent;
