'use client';
import { Client } from '@stomp/stompjs';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

import { AutoSizeTextarea } from '@/components/AutoSizeTextarea';
import ChatContainer from '@/components/chatting/ChatContainer';

export default function Page() {
	type inputMessages = {
		length: number;
		inputMessage: string;
	};

	type publishMessage = {
		sender: {
			senderName: string;
			senderImage: string;
			senderId: string;
		};
		date: string;
		messageId: string;
		content: string;
	};

	const [inputMessage, setInputMessage] = useState<inputMessages>({
		inputMessage: '',
		length: 0,
	});

	const client = useRef<Client | null>(null);
	const [messages, setMessages] = useState<publishMessage[]>([]);

	const SENDER_ID = 'jieun';

	// const headers = {
	// 	'Authorization' : "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZXMiOiJVU0VSIiwiZXhwIjoxNzE0NDcxNDY3fQ.totzNZbsQlEbASuDhoz5Jv6X43E0csS4dBhQXf3ko14"
	// }

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

	const sendMessage = () => {
		const messageContent = inputMessage.inputMessage;

		if (messageContent && client.current) {
			client.current.publish({
				destination: '/app/message',
				body: JSON.stringify({
					content: messageContent,
					senderId: SENDER_ID,
					roomId: 'WorkspaceId',
				}),
			});
			setInputMessage({
				inputMessage: '',
				length: 0,
			});
		}
	};
	const disconnect = () => {
		client.current?.deactivate();
	};

	const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputMessage({ ...inputMessage, inputMessage: e.target.value });
	};

	return (
		<div className="h-[670px]">
			<div className="border-solid border-2 border-black w-[360px] h-[670px] rounded-lg  px-[26px]">
				<div className="h-12 grid place-items-center typo-SubHeader3 mt-2">채팅</div>
				<div className="h-12 grid place-items-center typo-Caption1">
					팀원들과 자유롭게 이야기를 나눠봐요.
				</div>

				<div className="h-[560px] flex flex-col">
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
							className="w-full border-black border-[3px]"
							placeholder='채팅을 입력해주세요.'
							value={inputMessage.inputMessage}
							// onKeyDown={}
						/>
						<button type="button" onClick={() => sendMessage()}>
							<Image src="/icons/chattingBtn.svg" alt="전송버튼" width={40} height={40} />
						</button>
					</div>
				</div>
			</div>
			<button id="disconnect" className="border-2 border-black p-5 m-[20px]" onClick={disconnect}>
				해제
			</button>
		</div>
	);
}
