import Image from 'next/image';

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '../ui/popover';

const FileHeader = () => {
	return (
		<div className="flex gap-5 items-center">
			<Image src="/icons/documentFile.svg" width={36} height={36} alt="search icon" />
			<p className="typo-Header4">기록 &gt; folder1 &gt; file2</p>

			<div className="flex pt-1 pr-2">
				<Popover>
					<PopoverTrigger>
						<div className="w-10 h-10 rounded-md flex justify-center hover:bg-Gray-100">
							<Image
								src="/icons/folder_setting.svg"
								alt="document file setting"
								width={6}
								height={36}
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
