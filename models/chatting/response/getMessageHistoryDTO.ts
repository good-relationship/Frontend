import { IsEnd, LastMsgId } from "../entity/chatting"

export type GetMessageHistoryDTO = {
    end : IsEnd;
    lastMsgId : LastMsgId;
}