import { IsEnd, IsStart, LastMsgId } from "../entity/chatting"

export type GetMessageHistoryDTO = {
    start: IsStart;
    end : IsEnd;
    lastMsgId : LastMsgId;
}