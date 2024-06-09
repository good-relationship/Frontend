'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { joinMeeting } from '@/apis/meeting';
import Chip from '@/components/Chip';
import { Room } from '@/models/meeting/entity/meeting';

type MeetingItemProps = {
	room: Room;
};

const MeetingItem = ({ room }: MeetingItemProps) => {
	const router = useRouter();
	const { roomName, roomId, userInfoList } = room;

	const handleJoinMeeting = async () => {
		await joinMeeting({ roomId });
		router.push(`/workspace/meeting/${roomId}`);
	};

	return (
		<div
			className="w-[300px] bg-White rounded-3xl custom-shadow cursor-pointer flex flex-col items-center"
			onClick={handleJoinMeeting}
		>
			<Image src="/images/no_internet.png" width={300} height={300} alt="no_internet" />
			<div className="flex flex-col gap-4 mb-3">
				<h6 className="typo-SubHeader3 text-Gray-500 text-center">{roomName}</h6>
				<div className="flex gap-[10px]">
					{userInfoList.map((userInfo) => {
						return <Chip key={userInfo.userId} name={userInfo.userName} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default MeetingItem;
