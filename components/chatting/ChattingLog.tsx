'use client';

type Props = {
	text: string;
	date: string;
	type: string;
};

const ChattingLog = ({ text, date, type }: Props) => {
	return (
			<div className="w-full h-full text-[12px] flex flex-col custom-shadow">
                {
                    type == 'receive' ? 
                    (
                        <>
                            <div className="relative w-[calc(100%-20px)] whitespace-normal bg-white flex items-center h-full rounded-[8px] p-[10px]">
                                {text}
                            </div>
                            <div className="text-[8px] flex justify-start w-full mt-1">{date}</div> 
                        </>

                    ):(
                        <div className="flex flex-col items-end">
                            <div className="relative w-[calc(100%-20px)] whitespace-normal bg-white flex items-center h-full rounded-[8px] p-[10px]">
                                {text}
                            </div>
                            <div className="text-[8px] flex justify-end w-full mt-1">{date}</div>
                        </div>
                    )
                }
			</div>
	);
};
export default ChattingLog;
