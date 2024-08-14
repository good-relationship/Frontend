'use client';
import Image from 'next/image';
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { PopoverClose } from '../ui/popover';

import {
	getHistoryMessageApi,
	sendMessageApi,
	subscribeToHistoryTopic,
	subscribeToMessageTopic,
} from '@/apis/chatting';
import { getWorkspaceInfo, getWorkspaceMembers } from '@/apis/workspace';
import { AutoSizeTextarea } from '@/components/AutoSizeTextarea';
import ChatContainer from '@/components/chatting/ChatContainer';
import { useAddMessage } from '@/hooks/addMessage';
import { useGetAccessToken } from '@/hooks/auth';
import { useWebsocket } from '@/lib/websocket/WebsocketProvider';
import { GetMessageContentDTO } from '@/models/chatting/response/getMessageContentDTO';
import { GetMessageHistoryDTO } from '@/models/chatting/response/getMessageHistoryDTO';

export default function Chatting() {
	const { messages, useAddMessageBeforeToList, useAddMessageToList } = useAddMessage();

	const client = useWebsocket();
	const scrollBarRef = useRef<HTMLDivElement>(null);

	const [ref, inView] = useInView();

	const [messageHistory, setMessageHistory] = useState<GetMessageHistoryDTO>({
		start: true,
		end: false,
		lastMsgId: 0,
	});
	const [inputMessage, setInputMessage] = useState('');
	const [userId, setUserId] = useState(0);
	const [getWorkspaceId, setGetWorkspaceId] = useState('');
	const [scrolled, setScrolled] = useState(false);
	const [prevScrollHeight, setPrevScrollHeight] = useState<number>(0);

	// 유저 id 가져오기
	const getUserId = async () => {
		const data = await getWorkspaceMembers();
		setUserId(data[0].userId);
	};

	// token 가져오기
	const getToken = async () => {
		const accessToken = await useGetAccessToken();
		return accessToken;
	};

	// workspaceId 가져오기
	const getInfoOfWorkspace = async () => {
		const data = await getWorkspaceInfo();
		setGetWorkspaceId(data.workspaceId);
		return data.workspaceId;
	};

	// 첫 마운트 시 workspaceId 가져오기
	useEffect(() => {
		const initializeClient = async () => {
			const accessToken = await getToken();
			const headers = {
				Authorization: `${accessToken}`,
			};
			const workspaceId = await getInfoOfWorkspace();
			initialClient(headers, workspaceId);
		};

		getUserId();
		initializeClient();

		return () => {
			if (client) {
				client.unsubscribe(`/topic/message/${getWorkspaceId}`);
				client.unsubscribe(`/user/queue/history`);
			}
		};
	}, []);

	const initialClient = (headers: { Authorization: string }, workspaceId: string) => {
		subscribeToMessageTopic(client, headers, workspaceId, (messageObj: GetMessageContentDTO) => {
			useAddMessageToList(
				messageObj.sender.senderName,
				messageObj.content,
				messageObj.sender.senderId,
				messageObj.sender.senderImage,
				messageObj.time,
				messageObj.messageId,
			);
		});

		subscribeToHistoryTopic(
			client,
			headers,
			(messageInfo: GetMessageHistoryDTO, message: GetMessageContentDTO[]) => {
				useAddMessageBeforeToList(message);
				setMessageHistory({
					start: messageInfo.start,
					end: messageInfo.end,
					lastMsgId: messageInfo.lastMsgId,
				});
			},
		);
		getHistoryMessage(0);
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

	useEffect(() => {
		const handleScroll = () => {
			const chatContainer = scrollBarRef.current;
			if (chatContainer) {
				if (chatContainer.scrollHeight > chatContainer.clientHeight) {
					// 스크롤이 발생한 경우
					setScrolled(true);
				} else {
					// 스크롤이 발생하지 않은 경우
					setScrolled(false);
				}
			}
		};

		const chatContainer = scrollBarRef.current;
		if (chatContainer) {
			chatContainer.addEventListener('scroll', handleScroll);

			return () => {
				chatContainer.removeEventListener('scroll', handleScroll);
			};
		}
	}, [scrollBarRef.current]);

	const scrollPosition = (prevScrollHeight: number) => {
		if (scrollBarRef.current) {
			scrollBarRef.current.scrollTop = scrollBarRef.current.scrollHeight - prevScrollHeight;
		}
	};

	const sendMessage = () => {
		const messageContent = inputMessage;
		if (messageContent && client && scrollBarRef.current) {
			sendMessageApi(client, messageContent, getWorkspaceId);
			setInputMessage('');
		}
	};

	useEffect(() => {
		scrollBarRef.current && scrollBarRef.current.scrollTo(0, scrollBarRef.current.scrollHeight);
	}, [messages]);

	const savePrevScrollHeight = useCallback(() => {
		if (scrollBarRef.current) {
			setPrevScrollHeight(scrollBarRef.current?.scrollHeight);
		}
		!messageHistory.end && scrollPosition(prevScrollHeight);
	}, [messageHistory.lastMsgId]);

	const getHistoryMessage = (msgId: number) => {
		if (client && !messageHistory.end) {
			getHistoryMessageApi(client, msgId);
			savePrevScrollHeight();
		}
	};

	useEffect(() => {
		scrollPosition(prevScrollHeight);
	}, [messageHistory.lastMsgId]);

	useEffect(() => {
		if (!messageHistory.end && inView) {
			getHistoryMessage(messageHistory.lastMsgId);
		}
	}, [inView]);

	return (
		<div className="h-full">
			<div className="h-full rounded-lg px-[26px] flex flex-col">
				<div className="flex flex-row justify-between items-center pt-4">
					<div className="flex-1 text-center">
						<p className="typo-SubHeader3">채팅</p>
					</div>
					<PopoverClose>
						<Image src="/icons/close.svg" alt="close chatting" width={15} height={15} />
					</PopoverClose>
				</div>

				<p className="h-10 grid place-items-center typo-Caption1">팀원들과 자유롭게 이야기를 나눠봐요.</p>

				<div className="flex-1 flex flex-col overflow-hidden">
					<div ref={scrollBarRef} className="flex-1 flex overflow-y-auto">
						<div id="chatContainer" className={`mb-2 mt-2 ${scrolled ? ' w-[95%]' : 'w-[100%]'}`}>
							<div ref={ref} />
							{messages.map((message, index) => (
								<ChatContainer
									key={index}
									text={message.content}
									sender={message.sender.senderName}
									date={message.time.slice(11, 16)}
									senderImg={message.sender.senderImage}
									type={message.sender.senderId == userId ? 'send' : 'receive'}
								/>
							))}
						</div>
						<div className="h-full" />
					</div>
					<div className="flex flex-row gap-[5px] justify-center items-center my-4">
						<AutoSizeTextarea
							id="messageID"
							onChange={handleText}
							className="w-full border-black border-[2px] break-words outline-none"
							placeholder="채팅을 입력해주세요."
							value={inputMessage}
							onKeyDown={handleKeyDown}
						/>
						<button type="button" onClick={() => sendMessage()}>
							<Image src="/icons/chattingBtn.svg" alt="전송버튼" width={40} height={40} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
