import { UserId } from '@/models/user/entity/user';

export type Room = {
	roomName: string;
	roomId: string;
	userCount: number;
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
