import { Content, DateTime, MessageId, SenderInfo } from "../entity/chatting"

export type GetMessageContentDTO = {
    sender : SenderInfo;
    date : DateTime;
    messageId : MessageId;
    content : Content;
}