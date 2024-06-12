'use client';

import Editor from './editor';

const FileContent = () => {
	const temp = [
		{
			type: 'paragraph',
			content: 'Hello, world!',
		},
		{
			type: 'image',
			src: 'image.jpg',
		},
	];

	const data = JSON.stringify(temp);

	return (
		<div className="mt-8">
			{/* onChange에는 변화하는 document 넣기 (update) */}
			<Editor onChange={() => {}} initialContent={data} />
		</div>
	);
};

export default FileContent;
