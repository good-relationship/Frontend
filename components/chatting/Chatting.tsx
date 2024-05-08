'use client';
import { Client } from '@stomp/stompjs';
import Image from 'next/image';
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import {useInView} from 'react-intersection-observer';

import { getWorkspaceInfo, getWorkspaceMembers } from "@/apis/workspace";
import { AutoSizeTextarea } from '@/components/AutoSizeTextarea';
import ChatContainer from '@/components/chatting/ChatContainer';
import { addMessage } from '@/hooks/addMessage';
import { useAuth } from '@/hooks/auth';
import { GetMessageHistoryDTO } from '@/models/chatting/response/getMessageHistoryDTO';


export default function Page() {
	const {addMessageToList, addMessageBeforeToList, messages} = addMessage();
	
	const client = useRef<Client | null>(null);
	const [messageHistory, setMessageHistory] = useState<GetMessageHistoryDTO>({start:true, end: false, lastMsgId : 0});
	const [inputMessage, setInputMessage] = useState('');
	const [userId, setUserId] = useState(0);
	const [getWorkspaceId, setGetWorkspaceId] = useState('');
	const [prevScrollHeight, setPrevScrollHeight] = useState<number>(0);

	const [ref, inView] = useInView();
	const scrollBarRef = useRef<HTMLDivElement>(null);

	// 유저 id 가져오기
	const getUserId = async () => {
		const data = await getWorkspaceMembers();
		setUserId(data[0].userId);
	}

	// token 가져오기
	const { useGetAccessToken } = useAuth();
	const accessToken = useGetAccessToken();
	const headers = {
		'Authorization' : `${accessToken}`
	}

	// workspaceId 가져오기
	const getInfoOfWorkspace = async () => {	
		const data = await getWorkspaceInfo();
		setGetWorkspaceId(data.workspaceId);
		return data.workspaceId;
	}
		
	// 첫 마운트 시 workspaceId 가져오기
	useEffect(() => {
		getUserId();
		getInfoOfWorkspace().then(workspaceId => {
			client.current = initialClient(workspaceId);
			client.current.activate();
		})

		return () => {
            if (client.current) {
                client.current.deactivate();
            }
        };
	}, []);

	const subscribeToMessageTopic = (newClient: Client, workspaceId: string) => {
		newClient.subscribe(`/topic/message/${workspaceId}`, (message) => {
			const messageObj = JSON.parse(message.body).body;
			addMessageToList(
				messageObj.sender.senderName,
				messageObj.content,
				messageObj.sender.senderId,
				messageObj.sender.senderImage,
				messageObj.time,
				messageObj.messageId,
			);
		}, headers);
	};
	
	const subscribeToHistoryTopic = (newClient: Client) => {
		newClient.subscribe(`/user/topic/history`, (history) => {
			console.log('subscribe to history topic');
			const messageObj = JSON.parse(history.body).body;
			console.log(messageObj);
			addMessageBeforeToList(messageObj.messages);
			setMessageHistory({
				start: messageObj.start,
				end: messageObj.end,
				lastMsgId: messageObj.lastMsgId
			});
		}, headers);
	};
	
	const initialClient = (workspaceId : string) => {
		const newClient = new Client({
			brokerURL: 'ws://localhost:8080/ws-chat',
			reconnectDelay: 5000,
			debug: (str) => console.log(str),
			onConnect: (frame) => {
				console.log('Connected: ' + frame);
				getHistoryMessage(0); // 소켓 연결 초기화 이후에 과거 기록 10개 요청
				subscribeToMessageTopic(newClient, workspaceId);
				subscribeToHistoryTopic(newClient);
			},
			connectHeaders: headers,
			onStompError: (frame) => {
				console.error(frame);
			},
		});
		return newClient;
	};

	const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputMessage(e.target.value);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && inputMessage.trim() != '' && !e.shiftKey && e.nativeEvent.isComposing == false) {
			e.preventDefault();
			sendMessage();
        }
	};

	const scrollToBottom = () => {
		const chatContainer = document.getElementById('chatContainer');
		if (chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	};

	const scrollFixPosition = () => {
		if (scrollBarRef.current) {
			scrollBarRef.current.scrollTop = scrollBarRef.current.scrollHeight - prevScrollHeight;
			console.log(scrollBarRef.current.scrollTop);
		}
	};

	const sendMessage = () => {
		const messageContent = inputMessage;
		if (messageContent && client.current) {
			client.current.publish({
				destination: `/app/message/${getWorkspaceId}`,
				body: JSON.stringify({
					content: messageContent,
				}),
			});
			setInputMessage('');
		}
	};

	const savePrevScrollHeight = useCallback(() => {
		if (scrollBarRef.current) {
			setPrevScrollHeight(scrollBarRef.current?.scrollHeight);
		}
		}, [messageHistory.lastMsgId]);
	
	const getHistoryMessage = (msgId : number) => {
		if (client.current && messageHistory.end == false) {
			client.current.publish({
				destination: `/app/history`,
				body: JSON.stringify({
						lastMsgId : msgId
				}),
			});
			savePrevScrollHeight();
		}
	}

	useEffect(()=>{
		if (!messageHistory.end && inView) {
			getHistoryMessage(messageHistory.lastMsgId);
			scrollFixPosition();
		}

		console.log(inView);
		console.log(prevScrollHeight);
		console.log(scrollBarRef.current?.scrollTop);
		console.log(scrollBarRef.current?.scrollHeight);
		console.log(scrollBarRef.current?.clientHeight);

	},[inView])

	// useEffect(() => {
	// 	if (!messageHistory.end && inView) {
	// 		getHistoryMessage(messageHistory.lastMsgId);
	// 		// if (scrollPosition == 0) {
	// 		// 	console.log('here')
	// 		// 	scrollToBottom();
	// 		// } else {
	// 		// 	scrollFixPosition();
	// 		// }
	// 		scrollFixPosition();
	// 		console.log(scrollBarRef.current?.scrollTop)
	// 		console.log(scrollBarRef.current?.scrollHeight);
	// 		console.log(scrollBarRef.current?.clientHeight);
	// 	}
	// 	// return () => {
	// 	// 	if (!messageHistory.end && inView) {
	// 	// 		handleFetchMessageMore();
	// 	// 	}
	// 	// }
	// }, [inView])


	return (
		<div>
			<div className="h-full">
				<div className="h-full rounded-lg px-[26px]">
					<div className="grid place-items-center typo-SubHeader3 pt-4">채팅</div>
					<div className="h-10 grid place-items-center typo-Caption1">
						팀원들과 자유롭게 이야기를 나눠봐요.
					</div>

					<div className="h-[58vh] flex flex-col">
                        <div id = 'chatContainer' ref={scrollBarRef} className="h-full overflow-y-auto mb-2 mt-2">
							<div ref={ref} />
                            {messages.map((message, index) =>
                                    <ChatContainer
                                        key={index}
                                        text={message.content}
                                        sender={message.sender.senderName}
                                        date={message.time.slice(11, 16)}
                                        senderImg={message.sender.senderImage}
                                        type={message.sender.senderId == userId ? 'send' :'receive'}
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
				{/* <button onClick={() => getHistoryMessage(messageHistory.lastMsgId)}>과거기록</button> */}
			</div>
			<div className="fixed bottom-0 right-10 p-4">
			</div>
		</div>
	);
}