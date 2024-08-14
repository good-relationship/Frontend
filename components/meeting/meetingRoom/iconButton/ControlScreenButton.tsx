'use client';

import { useState } from 'react';

import IconButton from '@/components/meeting/meetingRoom/IconButton';

const ContronScreenButton = () => {
	const [isScreenOn, setIsScreenOn] = useState(true);
	const icon = isScreenOn ? 'screen' : 'screen-off';
	const handleButtonClick = () => {
		setIsScreenOn((prev) => !prev);
	};

	return <IconButton icon={icon} onClick={handleButtonClick} />;
};

export default ContronScreenButton;
