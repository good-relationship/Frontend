'use client';

type Props = {
	text: string;
	date: string;
	type: string;
};

const ChattingLog = ({ text, date, type }: Props) => {
	return (
		<div className="w-full h-full text-[12px] flex flex-col custom-shadow">
			{type == 'receive' ? (
				<>
					<div className="relative w-[calc(100%-20px)] whitespace-normal right-[-20px] bg-white flex items-center h-full rounded-[8px] p-[10px] after:absolute after:border-solid after:border-t-white after:border-t-[16px] after:border-l-transparent after:border-l-[25px] after:border-r-transparent after:border-r-[0px] after:border-b-transparent after:border-b-[0px] after:top-[calc(40%)] after:left-[-18px]">
						{text}
					</div>
					<div className="text-[8px] flex justify-start w-full mt-[2px]">{date}</div>
				</>
			) : (
				<>
					<div className="relative w-[calc(100%-20px)] whitespace-normal left-[0px] bg-white flex items-center h-full rounded-[8px] p-[10px] after:absolute after:border-solid after:border-t-[16px] after:border-l-transparent after:border-r-[25px] after:border-r-transparent after:border-b-transparent after:top-[calc(40%)] after:left-[220px] after:border-white">
						{text}
					</div>
					<div className="text-[8px] flex justify-end w-full mt-[2px]">{date}</div>
				</>
			)}
		</div>
	);
};
export default ChattingLog;
