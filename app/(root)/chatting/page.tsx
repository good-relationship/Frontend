/* eslint-disable import/extensions */
'use client';
import { Client } from '@stomp/stompjs';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

import ReceiveChat from '@/components/ui/chatting/ReceiveChat';
import SendChat from '@/components/ui/chatting/SendChat';
import { Textarea } from '@/components/ui/textarea';

export default function Page() {
	type inputMessages = {
		length: unknown;
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
		length: undefined,
	});

	const client = useRef<Client | null>(null);
	const [messages, setMessages] = useState<publishMessage[]>([]);

	const SENDER_ID = 'jieun';

	const initialClient = () => {
		const newClient = new Client({
			webSocketFactory: () => new SockJS('/ws-chat'),
			reconnectDelay: 5000,
			debug: (str) => console.log(str),

			onConnect: () => {
				newClient.subscribe('/topic/message', (message: { body: string }) => {
					const messageObj = JSON.parse(message.body);
					addMessageToList(
						messageObj.content,
						messageObj.sender.senderId,
						messageObj.sender.senderImage,
						messageObj.time.slice(11, 16),
						messageObj.messageID,
					);
					console.log(messageObj);
				});
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
			console.log('연결 안됨');
			client.current = initialClient();
			client.current.activate();
		}
		console.log('연결됨');
	}, []);

	const addMessageToList = (
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
					senderName: senderId,
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
			console.log(messageContent);
			client.current.publish({
				destination: '/app/message',
				body: JSON.stringify({
					content: messageContent,
					senderId: SENDER_ID,
					roomId: 'Room1',
				}),
			});
			setInputMessage({
				inputMessage: '',
				length: undefined,
			});
		}
	};
	const disconnect = () => {
		client.current?.deactivate();
	};

	// eslint-disable-next-line no-undef
	const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputMessage({ ...inputMessage, inputMessage: e.target.value });
	};

	return (
		<div className="h-[670px]">
			<div className="border-solid border-2 border-black w-[360px] h-[670px] rounded-lg  pl-[26px] pr-[26px]">
				<div className="h-12 text-lg grid place-items-center font-Pretendard font-bold mt-2">채팅</div>
				<div className="h-12 text-sm grid place-items-center font-Pretendard font-bold">
					팀원들과 자유롭게 이야기를 나눠봐요.
				</div>

				<div className="h-[560px] flex flex-col">
					<div className="h-full overflow-y-auto mb-2 mt-2">
						{/* <div className="border-2 grow"> */}
						{messages.map((message, index) =>
							message.sender.senderId == SENDER_ID ? (
								<SendChat
									key={index}
									text={message.content}
									sender={message.sender.senderId}
									date={message.date}
									senderImg={message.sender.senderImage}
								/>
							) : (
								<ReceiveChat
									key={index}
									text={message.content}
									sender={message.sender.senderId}
									date={message.date}
									senderImg={message.sender.senderImage}
								/>
							),
						)}
					</div>
					<div className="flex flex-row gap-[5px] justify-center items-center py-4">
						<Textarea
							id="messageID"
							onChange={handleText}
							className="w-full border-black border-[3px]"
							value={inputMessage.inputMessage}
						/>
						<button type="button" onClick={() => sendMessage()}>
							<Image src="../../icons/chattingBtn.svg" alt="전송버튼" width={40} height={40} />
						</button>
					</div>
				</div>
			</div>
			{/* <button id="connect" className='border-2 border-black p-[20px] m-[20px]' onClick={connect}>연결</button> */}
			<button id="disconnect" className="border-2 border-black p-[20px] m-[20px]" onClick={disconnect}>
				해제
			</button>
		</div>
	);
}
