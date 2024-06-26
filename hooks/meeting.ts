import { IMessage } from '@stomp/stompjs';
import { useContext } from 'react';

import { MeetingContext } from '@/lib/websocket/MeetingProvider';
import { useWebsocket } from '@/lib/websocket/WebsocketProvider';
import { IceDto, SdpDto } from '@/models/meeting/entity/meeting';
import { VideoInfo } from '@/types/video';

export const useMeeting = () => {
	const context = useContext(MeetingContext);
	if (context === undefined) {
		throw new Error('useMeeting must be used within a MeetingProvider');
	}
	return context;
};

export const useLocalStream = () => {
	const { localStreamRef } = useMeeting();

	const getLocalStream = async () => {
		return await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
	};
	const setLocalStream = (stream: MediaStream) => {
		localStreamRef.current = stream;
	};
	const addStreamTracksToPeer = (peerConnection: RTCPeerConnection) => {
		if (!localStreamRef.current) {
			return;
		}

		localStreamRef.current.getTracks().forEach((track) => {
			if (!localStreamRef.current) {
				return;
			}
			peerConnection.addTrack(track, localStreamRef.current);
		});
	};

	return { localStreamRef: localStreamRef, setLocalStream, getLocalStream, addStreamTracksToPeer };
};

export const usePeerConnections = () => {
	const { peerConnectionsRef } = useMeeting();
	return { peerConnectionsRef: peerConnectionsRef };
};

export const useVideoInfoList = () => {
	const { videoInfoList, setVideoInfoList } = useMeeting();
	const addUniqueVideo = (video: VideoInfo) => {
		setVideoInfoList((prev) => {
			return prev.filter((info) => info.userId !== video.userId).concat(video);
		});
	};

	return { videoInfoList, setVideoInfoList, addUniqueVideo };
};

export const useMeetingWebsocket = () => {
	const stompClient = useWebsocket();

	const subscribeOffer = (meetingId: string, handleSubscribeOffer: (message: IMessage) => void) => {
		stompClient.subscribe(`/user/queue/offer/${meetingId}`, handleSubscribeOffer);
	};

	const subscribeAnswer = (meetingId: string, handleSubscribeAnswer: (message: IMessage) => void) => {
		stompClient.subscribe(`/user/queue/answer/${meetingId}`, handleSubscribeAnswer);
	};

	const subscribeIce = (meetingId: string, handleSubscribeIce: (message: IMessage) => void) => {
		stompClient.subscribe(`/user/queue/ice/${meetingId}`, handleSubscribeIce);
	};

	const subscribeUserList = (meetingId: string, handleSubscribeUserList: (message: IMessage) => void) => {
		stompClient.subscribe(`/topic/meetingRoom/${meetingId}/users`, handleSubscribeUserList);
	};

	const publishOffer = (sdpDto: SdpDto, meetingId: string) => {
		stompClient.publish({
			destination: `/app/offer/${meetingId}`,
			body: JSON.stringify(sdpDto),
		});
	};

	const publishAnswer = (answer: SdpDto, meetingId: string) => {
		stompClient.publish({
			destination: `/app/answer/${meetingId}`,
			body: JSON.stringify(answer),
		});
	};

	const publishIce = (iceDto: IceDto, meetingId: string) => {
		stompClient.publish({
			destination: `/app/ice/${meetingId}`,
			body: JSON.stringify(iceDto),
		});
	};

	const unsubscribeOffer = (meetingId: string) => {
		stompClient.unsubscribe(`/user/queue/offer/${meetingId}`);
	};

	const unsubscribeAnswer = (meetingId: string) => {
		stompClient.unsubscribe(`/user/queue/answer/${meetingId}`);
	};

	const unsubscribeIce = (meetingId: string) => {
		stompClient.unsubscribe(`/user/queue/ice/${meetingId}`);
	};

	const unsubscribeUserList = (meetingId: string) => {
		stompClient.unsubscribe(`/topic/meetingRoom/${meetingId}/users`);
	};

	return {
		subscribeOffer,
		subscribeAnswer,
		subscribeIce,
		subscribeUserList,
		publishOffer,
		publishAnswer,
		publishIce,
		unsubscribeOffer,
		unsubscribeAnswer,
		unsubscribeIce,
		unsubscribeUserList,
	};
};
