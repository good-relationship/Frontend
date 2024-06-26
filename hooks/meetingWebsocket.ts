import { IMessage } from '@stomp/stompjs';

import { useWebsocket } from '@/lib/websocket/WebsocketProvider';
import { IceDto, SdpDto } from '@/models/meeting/entity/meeting';

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
