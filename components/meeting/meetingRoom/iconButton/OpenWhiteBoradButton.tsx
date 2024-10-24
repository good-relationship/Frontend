'use client';

import IconButton from '@/components/meeting/meetingRoom/IconButton';

const OpenWhiteBoardButton = () => {
	const icon = 'palette';
	const handleButtonClick = () => {
		console.log('화이트보드 클릭');
	};

	return <IconButton icon={icon} onClick={handleButtonClick} message="화이트보드 열기" />;
};

export default OpenWhiteBoardButton;
