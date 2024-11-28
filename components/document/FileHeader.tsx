'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '../ui/popover';

import { deleteFile, getFileContent } from '@/apis/document';

interface FileHeaderProps {
	fileId: number;
}

const FileHeader = ({ fileId }: FileHeaderProps) => {
	const [currentFileInfo, setCurrentFileInfo] = useState({ fileId: undefined, fileName: undefined, content: '' });

	useEffect(() => {
		const getCurrentFileInfo = async () => {
			const res = await getFileContent(fileId);
			setCurrentFileInfo(res);
		};

		getCurrentFileInfo();
	}, []);

	const router = useRouter();

	const handleDeleteFile = async () => {
		await deleteFile(fileId);

		router.push('/workspace/document');
	};

	return (
		<div className="flex gap-5 items-center">
			<div className="relative w-9 h-9 min-w-5 min-h-5">
				<Image
					src="/icons/documentFile.svg"
					fill
					alt="search icon"
					onClick={() => {
						router.back();
					}}
					style={{ cursor: 'pointer' }}
				/>
			</div>
			{/* <p className="typo-SubHeader3 sm:typo-Header4">기록 &gt; 폴더명 &gt; {currentFileInfo.fileName}</p> */}
			<p className="typo-SubHeader3 sm:typo-Header4">{currentFileInfo.fileName}</p>

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
						{/* <PopoverClose asChild>
							<div className="w-full h-full border-b-2 p-3 hover:bg-gray-100 cursor-pointer rounded-t-xl">
								링크 공유
							</div>
						</PopoverClose> */}
						<PopoverClose asChild>
							<div
								className="w-full h-full p-3 hover:bg-gray-100 cursor-pointer rounded-b-xl"
								onClick={handleDeleteFile}
							>
								삭제
							</div>
						</PopoverClose>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
};

export default FileHeader;
