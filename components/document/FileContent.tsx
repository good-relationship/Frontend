'use client';

import Editor from './editor';

const FileContent = () => {
	return (
		<>
			<div className="mt-14 typo-Header5 text-gray-200">내용을 입력하세요.</div>
			<Editor onChange={() => {}} />
		</>
	);
};

export default FileContent;
