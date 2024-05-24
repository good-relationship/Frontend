import { useState } from "react";

import { GetMessageContentDTO } from "@/models/chatting/response/getMessageContentDTO";
import { GetMessageHistoryDTO } from "@/models/chatting/response/getMessageHistoryDTO";

export const useAddMessage = () => {
    const [messages, setMessages] = useState<GetMessageContentDTO[]>([]);
	const [messageHistory, setMessageHistory] = useState<GetMessageHistoryDTO>({start:true, end: false, lastMsgId : 0});


    const useAddMessageToList = (
        senderName: string,
        content: string,
        senderId: number,
        senderImage: string,
        time: string,
        messageId: string,
    ) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                sender: {
                    senderName: senderName,
                    senderImage: senderImage,
                    senderId: senderId,
                },
                time: time,
                messageId: messageId,
                content: content,
            },
        ]);
        return messages;
    };

    const useAddMessageBeforeToList = (newMessage: GetMessageContentDTO[] | null) => {
        if (newMessage !== null) {
            setMessages((prevMessages) => [
                ...newMessage,
                ...prevMessages,
            ]);
        }
        return messages;
    };

    const useMessageHistoryState = (historyState : GetMessageHistoryDTO) => {
        setMessageHistory(historyState)
        return messageHistory;
    }
    

    return {useAddMessageToList, useAddMessageBeforeToList, useMessageHistoryState, messages, messageHistory}
}