import { UserId, UserInfo } from '@/models/user/entity/user';

export type RoomId = string;
export type RoomName = string;
export type UserCount = number;

export type Room = {
	roomId: RoomId;
	roomName: RoomName;
	userCount: UserCount;
	userInfoList: UserInfo[];
};

export type RoomList = Room[];

export type SessionDescription = RTCSessionDescriptionInit;

export type SdpDto = {
	userId: UserId;
	sessionDescription: SessionDescription;
};

export type IceDto = {
	userId: UserId;
	candidate: RTCIceCandidateInit['candidate'];
	sdpMid: RTCIceCandidateInit['sdpMid'];
	sdpMLineIndex: RTCIceCandidateInit['sdpMLineIndex'];
};
