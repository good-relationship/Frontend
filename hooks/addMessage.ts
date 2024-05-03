import { useState } from "react";

import { GetMessageContentDTO } from "@/models/chatting/response/getMessageContentDTO";

export const addMessage = () => {
    const [messages, setMessages] = useState<GetMessageContentDTO[]>([]);

    const addMessageToList = (
        senderName: string,
        content: string,
        senderId: string,
        senderImage: string,
        date: string,
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
                date: date,
                messageId: messageId,
                content: content,
            },
        ]);
    };

    const addMessageBeforeToList = (
        newMessage : GetMessageContentDTO[]
    ) => {
        setMessages((prevMessages) => [
            ...newMessage,
            ...prevMessages,
        ]);
    };

    return {addMessageToList, addMessageBeforeToList, setMessages, messages}
}