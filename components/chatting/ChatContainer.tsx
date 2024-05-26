'use client';

import ChattingLog from './ChattingLog';
import ChattingProfile from './ChattingProfile';

type Props = {
	text: string;
	sender: string;
	date: string;
	senderImg: string;
	type: string;
};

const ChatContainer = ({ text, sender, date, senderImg, type }: Props) => {
	return (
		<div className="flex flex-row items-center gap-[12px] h-wrap font-Pretendard font-bold mb-3">
			{type == 'receive' ? (
				<>
					<ChattingProfile sender={sender} senderImg={senderImg} />
					<ChattingLog text={text} date={date} type={type} />
				</>
			) : (
				<>
					<ChattingLog text={text} date={date} type={type} />
					<ChattingProfile sender={sender} senderImg={senderImg} />
				</>
			)}
		</div>
	);
};
export default ChatContainer;
