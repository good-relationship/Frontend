import { Content, DateTime, MessageId, SenderInfo } from '../entity/chatting';

export type GetMessageContentDTO = {
	sender: SenderInfo;
	time: DateTime;
	messageId: MessageId;
	content: Content;
};
