'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import DocumentInput from './DocumentInput';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '../ui/popover';

import { cn } from '@/lib/utils';
import { GetDocumentFolderInfoDTO } from '@/models/document/getDocumentFolderInfoDTO';

const FolderInfo = ({ folderId, folderName, isOpen }: GetDocumentFolderInfoDTO) => {
	const [isEdit, setIsEdit] = useState(false);
	const [newFolderName, setNewFolderName] = useState(folderName);

	const changeEdit = (editState: boolean) => {
		setIsEdit(editState);
	};

	const handleChange = (e: { target: { value: React.SetStateAction<string> } }) => {
		setNewFolderName(e.target.value);
	};

	return (
		<div
			className={cn(
				'flex h-10 sm:w-[30vw] max-w-[300px] items-center px-2 hover:bg-Gray-100 hover:rounded-md my-2 cursor-pointer',
				isOpen ? 'bg-Gray-100 rounded-md' : '',
			)}
		>
			<Image
				src={isOpen ? '/icons/folder_open.svg' : '/icons/folder_close.svg'}
				alt="open folder"
				width={28}
				height={28}
			/>

			{isEdit ? (
				<DocumentInput
					className="w-52 typo-Body3"
					value={newFolderName}
					onChange={handleChange}
					isEdit={isEdit}
					changeEdit={changeEdit}
				/>
			) : (
				<Link
					href={`/workspace/document/${folderId}`}
					className={cn(
						'pl-[10px] pt-1 typo-Body3 w-52',
						newFolderName == 'Untitled' ? 'text-gray-300 italic' : '',
					)}
				>
					{newFolderName}
				</Link>
			)}

			<div className="flex justify-end pt-1">
				<Popover>
					<PopoverTrigger>
						<div className="w-6 h-6 rounded-md flex justify-center hover:bg-Gray-200">
							<Image
								src="/icons/folder_setting.svg"
								alt="folder setting"
								width={3}
								height={18}
								className="cursor-pointer"
							/>
						</div>
					</PopoverTrigger>
					<PopoverContent className="py-0 w-[120px]">
						<PopoverClose asChild>
							<div
								className="w-full h-full border-b-2 p-3 hover:bg-gray-100 cursor-pointer rounded-t-xl"
								onClick={() => changeEdit(true)}
							>
								폴더명 수정
							</div>
						</PopoverClose>
						<PopoverClose asChild>
							<div className="w-full h-full p-3 hover:bg-gray-100 cursor-pointer rounded-b-xl">삭제</div>
						</PopoverClose>
					</PopoverContent>
				</Popover>
				<div className="w-6 h-6 rounded-md flex justify-center hover:bg-Gray-200">
					<Image
						src="/icons/add_file.svg"
						alt="add folder"
						width={16}
						height={16}
						className="cursor-pointer"
					/>
				</div>
			</div>
		</div>
	);
};

export default FolderInfo;
