'use client';

import IconButton from '@/components/meeting/meetingRoom/IconButton';

const OpenDocumentButton = () => {
	const icon = 'pencil';
	const handleButtonClick = () => {
		console.log('문서 클릭');
	};

	return <IconButton icon={icon} onClick={handleButtonClick} message="기록하기" />;
};

export default OpenDocumentButton;
