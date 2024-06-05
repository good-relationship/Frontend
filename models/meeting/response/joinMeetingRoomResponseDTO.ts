import { Room } from '@/models/meeting/entity/meeting';
import { UserInfo } from '@/models/user/entity/user';

export type JoinMeetingRoomResponseDTO = Room & {
	userInfoList: UserInfo[];
};
