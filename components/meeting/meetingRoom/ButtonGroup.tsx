'use client';

import IconButton from '@/components/meeting/meetingRoom/IconButton';
import { IconId } from '@/types/icons';

const ButtonGroup = () => {
	type IconButtonConfig = {
		id: string;
		icon: IconId;
		onClick: () => void;
	};

	const iconButtonConfig: IconButtonConfig[] = [
		{
			id: 'camera',
			icon: 'webcam',
			onClick: () => console.log('카메라 클릭'),
		},
		{
			id: 'microphone',
			icon: 'microphone',
			onClick: () => console.log('마이크 클릭'),
		},
		{
			id: 'screen',
			icon: 'screen',
			onClick: () => console.log('화면 공유 클릭'),
		},
		{
			id: 'exit',
			icon: 'exit',
			onClick: () => console.log('나가기 클릭'),
		},
		{
			id: 'document',
			icon: 'pencil',
			onClick: () => console.log('문서 클릭'),
		},
		{
			id: 'whiteboard',
			icon: 'palette',
			onClick: () => console.log('화이트보드 클릭'),
		},
	];

	return (
		<section className="w-full flex justify-center gap-5">
			{iconButtonConfig.map((config) => {
				return <IconButton key={config.id} icon={config.icon} onClick={config.onClick} />;
			})}
		</section>
	);
};

export default ButtonGroup;
