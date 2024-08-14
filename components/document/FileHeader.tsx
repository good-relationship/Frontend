import Image from 'next/image';

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '../ui/popover';

const FileHeader = () => {
	return (
		<div className="flex gap-5 items-center">
			<div className="relative w-9 h-9 min-w-5 min-h-5">
				<Image src="/icons/documentFile.svg" fill alt="search icon" />
			</div>
			<p className="typo-SubHeader3 sm:typo-Header4">기록 &gt; folder1 &gt; file2</p>

			<div className="flex pt-1 pr-2">
				<Popover>
					<PopoverTrigger>
						<div className="relative sm:w-8 sm:h-8 min-w-5 min-h-5 rounded-md flex justify-center hover:bg-Gray-100">
							<Image
								src="/icons/folder_setting.svg"
								alt="document file setting"
								fill
								className="cursor-pointer"
							/>
						</div>
					</PopoverTrigger>
					<PopoverContent className="w-[120px] py-0">
						<PopoverClose asChild>
							<div className="w-full h-full border-b-2 p-3 hover:bg-gray-100 cursor-pointer rounded-t-xl">
								링크 공유
							</div>
						</PopoverClose>
						<PopoverClose asChild>
							<div className="w-full h-full p-3 hover:bg-gray-100 cursor-pointer rounded-b-xl">삭제</div>
						</PopoverClose>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
};

export default FileHeader;
