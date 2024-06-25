import { UserId, UserName } from '@/models/user/entity/user';

export type VideoInfo = {
	userId: UserId;
	userName: UserName;
	stream: MediaStream;
	isOwner: boolean;
};

export type VideoInfoList = VideoInfo[];
