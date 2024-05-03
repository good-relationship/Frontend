'use client';
import { Client } from '@stomp/stompjs';
import Image from 'next/image';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

import { getWorkspaceInfo } from "@/apis/workspace";
import { AutoSizeTextarea } from '@/components/AutoSizeTextarea';
import ChatContainer from '@/components/chatting/ChatContainer';
import { addMessage } from '@/hooks/addMessage';
import { useAuth } from '@/hooks/auth';
import { GetMessageHistoryDTO } from '@/models/chatting/response/getMessageHistoryDTO';

export default function Page() {
	const {addMessageToList, addMessageBeforeToList, messages} = addMessage();
	
	const client = useRef<Client | null>(null);
	const [messages, setMessages] = useState<publishMessage[]>([]);

	const SENDER_ID = 'jieun';


	const initialClient = () => {
		const newClient = new Client({
			webSocketFactory: () => new SockJS('/ws-chat'),
			reconnectDelay: 5000,
			debug: (str) => console.log(str),
			onConnect: (frame) => {
				console.log('Connected: ' + frame);
	
				newClient.subscribe('/topic/message', (message: { body: string }) => {
					const messageObj = JSON.parse(message.body);
					addMessageToList(
						messageObj.sender.senderName,
						messageObj.content,
						messageObj.sender.senderId,
						messageObj.sender.senderImage,
						messageObj.time.slice(11, 16),
						messageObj.messageID,
					);
				});
			// }, headers);
			},
			onStompError: (frame) => {
				console.error(frame);
			},
		});
		return newClient;
	}; 

	// 첫 마운트 시에 소켓 연결 초기화
	useEffect(() => {
		if (!client.current) {
			client.current = initialClient();
			client.current.activate();
		}
	}, []);

	const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputMessage(e.target.value);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && inputMessage.trim() != '' && !e.shiftKey && e.nativeEvent.isComposing == false) {
			e.preventDefault();
			sendMessage();
        }
	};

	const sendMessage = () => {
		const messageContent = inputMessage;

		if (messageContent && client.current) {
			client.current.publish({
				destination: '/app/message',
				body: JSON.stringify({
					content: messageContent,
					senderId: SENDER_ID,
					roomId: 'WorkspaceId',
				}),
			});
			setInputMessage('');
		}
	};

	// const disconnect = () => {
	// 	client.current?.deactivate();
	// };


	return (
		<div>
			<div className="h-full">
				<div className="h-full rounded-lg px-[26px]">
				{/* <div className="border-solid border-2 border-black w-[360px] h-full rounded-lg px-[26px]"> */}
					<div className="grid place-items-center typo-SubHeader3 pt-4">채팅</div>
					<div className="h-10 grid place-items-center typo-Caption1">
						팀원들과 자유롭게 이야기를 나눠봐요.
					</div>

					<div className="h-[58vh] flex flex-col">
                        <div className="h-full overflow-y-auto mb-2 mt-2">
                            {messages.map((message, index) =>
                                    <ChatContainer
                                        key={index}
                                        text={message.content}
                                        sender={message.sender.senderId}
                                        date={message.date}
                                        senderImg={message.sender.senderImage}
                                        type={message.sender.senderId == SENDER_ID ? 'send' :'receive'}
                                    />
                                )
                            }
                        </div>
						<div className="flex flex-row gap-[5px] justify-center items-center py-4">
							<AutoSizeTextarea
								id="messageID"
								onChange={handleText}
								className="w-full border-black border-[2px]"
								placeholder='채팅을 입력해주세요.'
								value={inputMessage}
								onKeyDown={handleKeyDown}
							/>
							<button type="button" onClick={() => sendMessage()}>
								<Image src="/icons/chattingBtn.svg" alt="전송버튼" width={40} height={40} />
							</button>
						</div>
					</div>
				</div>
				{/* <button id="disconnect" className="border-2 border-black p-5 m-[20px]" onClick={disconnect}>
					해제
				</button> */}
			</div>
			<div className="fixed bottom-0 right-10 p-4">
			</div>
		</div>
	);
}
