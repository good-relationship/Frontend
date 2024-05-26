'use client';

type Props = {
	sender: string;
	senderImg: string;
};

const ChattingProfile = ({ sender, senderImg }: Props) => {
	return (
		<div className="flex flex-col justify-center items-center text-[13px]">
			<div className="rounded-full w-[46px] h-[46px] bg-gray-300">
				<img src={senderImg} alt="프로필 이미지" className="rounded-full w-[46px] h-[46px]" />
			</div>
			<div>{sender}</div>
		</div>
	);
};
export default ChattingProfile;
