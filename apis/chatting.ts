import { Client } from "@stomp/stompjs";
import { MutableRefObject } from "react";

// import { useAddMessage } from "@/hooks/addMessage";

// export const subscribeToMessageTopic = (newClient: Client, workspaceId: string, headers: {Authorization: string;}) => {
//     newClient.subscribe(`/topic/message/${workspaceId}`, (message) => {
//         const messageObj = JSON.parse(message.body).body;
//         console.log(messageObj);
//     }, headers);
// };

export const subscribeToHistoryTopic = (newClient: Client, headers: {Authorization: string;}) => {
    newClient.subscribe(`/user/topic/history`, (history) => {
        console.log('subscribe to history topic');
        const messageObj = JSON.parse(history.body).body;
        console.log(messageObj);
        // useAddMessageBeforeToList(messageObj.messages);
        // useMessageHistoryState({
        //     start: messageObj.start,
        //     end: messageObj.end,
        //     lastMsgId: messageObj.lastMsgId
        // });
    }, headers);
};

export const sendMessageApi = (client: MutableRefObject<Client | null>, messageContent:string, getWorkspaceId:string) => {
    client.current?.publish({
        destination: `/app/message/${getWorkspaceId}`,
        body: JSON.stringify({
            content: messageContent,
        }),
    });
}

export const getHistoryMessageApi = (client: MutableRefObject<Client | null>, msgId:number) => {
    client.current?.publish({
        destination: `/app/history`,
        body: JSON.stringify({
                lastMsgId : msgId
        }),
    });
}