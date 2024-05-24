import { Client } from '@stomp/stompjs';
import { MutableRefObject } from 'react';

import { GetMessageContentDTO } from '@/models/chatting/response/getMessageContentDTO';
import { GetMessageHistoryDTO } from '@/models/chatting/response/getMessageHistoryDTO';

export const subscribeToMessageTopic = (
	client: Client,
	headers: { Authorization: string },
	workspaceId: string,
	onMessageReceivedCallback: (arg0: GetMessageContentDTO) => void,
) => {
	client?.subscribe(
		`/topic/message/${workspaceId}`,
		(message) => {
			const messageObj = JSON.parse(message.body).body;
			onMessageReceivedCallback(messageObj);
		},
		headers,
	);
};

export const subscribeToHistoryTopic = (
	client: Client,
	headers: { Authorization: string },
	onHistoryReceivedCallback: (arg0: GetMessageHistoryDTO, arg1: GetMessageContentDTO[]) => void,
) => {
	client?.subscribe(
		`/user/queue/history`,
		(history) => {
			const messageObj = JSON.parse(history.body).body;
			const message = messageObj.messages;
			const messageInfo = messageObj;
			onHistoryReceivedCallback(messageInfo, message);
		},
		headers,
	);
};

export const sendMessageApi = (
	client: MutableRefObject<Client | null>,
	messageContent: string,
	getWorkspaceId: string,
) => {
	client.current?.publish({
		destination: `/app/message/${getWorkspaceId}`,
		body: JSON.stringify({
			content: messageContent,
		}),
	});
};

export const getHistoryMessageApi = (client: MutableRefObject<Client | null>, msgId: number) => {
	client.current?.publish({
		destination: `/app/history`,
		body: JSON.stringify({
			lastMsgId: msgId,
		}),
	});
};
