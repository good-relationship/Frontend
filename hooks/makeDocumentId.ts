import { getUserRoomInfo } from '@/apis/user';

export const useMakeDocumentId = () => {
	const getWorkSpaceId = async () => {
		const res = await getUserRoomInfo();
		return res.roomId;
	};

	return { getWorkSpaceId };
};
