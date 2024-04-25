'use client';

type Props = {
	text: string;
	sender: string;
	date: string;
	senderImg: string;
};

const ReceiveChat = ({ text, sender, date, senderImg }: Props) => {
	return (
		<div className="flex flex-row items-center gap-[12px] h-wrap font-Pretendard font-bold mb-3">
			<div className="flex flex-col justify-center items-center text-[13px]">
				<div className="rounded-full w-[46px] h-[46px] bg-gray-300">
					<img src={senderImg} alt="프로필 이미지" className="rounded-full w-[46px] h-[46px]" />
				</div>
				<div>{sender}</div>
			</div>
			<div className="w-full h-full text-[12px] flex flex-col drop-shadow-[0_4px_40px_rgba(0,0,0,0.15)] ">
				{/* <div className="flex items-center min-h-[43px] border-solid border-2"> */}
				<div className="relative w-[calc(100%-20px)] whitespace-normal right-[-20px] bg-white flex items-center h-full rounded-[8px] p-[10px] after:absolute after:border-solid after:border-t-white after:border-t-[16px] after:border-l-transparent after:border-l-[25px] after:border-r-transparent after:border-r-[0px] after:border-b-transparent after:border-b-[0px] after:top-[calc(40%)] after:left-[-18px]">
					{text}
				</div>
				<div className="text-[8px] flex justify-end w-full mt-[2px]">{date}</div>
			</div>
		</div>
	);
};
export default ReceiveChat;
