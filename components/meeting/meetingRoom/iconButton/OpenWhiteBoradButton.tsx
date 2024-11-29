import Link from 'next/link';

import { getUserRoomInfo } from '@/apis/user';
import IconButton from '@/components/meeting/meetingRoom/IconButton';

const OpenWhiteBoardButton = async () => {
	const icon = 'palette';
	const roomId = (await getUserRoomInfo()).roomId;
	const link = `${process.env.NEXT_PUBLIC_URL}/whiteboard-file/${roomId}`;

	return (
		<Link href={link} target="_blank">
			<IconButton icon={icon} message="화이트보드 열기" />
		</Link>
	);
};

export default OpenWhiteBoardButton;
