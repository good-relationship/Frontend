'use client';

import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import DocumentInput from './DocumentInput';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '../ui/popover';

import { createNewFile, deleteFolder, updateFolderName } from '@/apis/document';
import { useDocumentLists } from '@/hooks/documentInfo';
import { cn } from '@/lib/utils';
import { getFolders } from '@/stores/atoms/getFolders';

interface FolderInfoProps {
	folderId?: number;
	onFolderSelect: (folderId: number) => void;
}

const FolderInfo = ({ folderId, onFolderSelect }: FolderInfoProps) => {
	const folders = useRecoilValue(getFolders);

	const { fetchDocumentLists } = useDocumentLists();

	const targetFolder = folders.folderInfo.find((folder) => folderId === folder.folderId);

	const [isEdit, setIsEdit] = useState(false);
	const [newFolderName, setNewFolderName] = useState(targetFolder!.folderName);

	const updateFolderInfo = useCallback(async () => {
		if (newFolderName !== targetFolder!.folderName) {
			await updateFolderName({ folderName: newFolderName }, folderId);
			fetchDocumentLists();
		}
	}, [newFolderName, folderId, fetchDocumentLists, targetFolder]);

	const changeEdit = (editState: boolean) => {
		setIsEdit(editState);
	};

	const handleDeleteFolder = async () => {
		await deleteFolder(folderId);
		fetchDocumentLists();
	};

	const handleAddFile = async () => {
		await createNewFile({ folderId: folders.openFolderID, fileName: 'Untitled' });
		fetchDocumentLists();
	};

	const handleChange = useCallback((e: { target: { value: React.SetStateAction<string> } }) => {
		setNewFolderName(e.target.value);
	}, []);

	const handleSetFolders = () => {
		onFolderSelect(folderId!);
	};

	const isSelectedFolder = (folderId: number | undefined) => {
		return folderId === folders.openFolderID;
	};

	useEffect(() => {
		// newFolderName이 변경되면 updateFolderInfo 실행
		if (newFolderName !== targetFolder!.folderName) {
			if (!isEdit) {
				updateFolderInfo();
			}
		}
	}, [isEdit]);

	return (
		<div
			className={cn(
				'flex h-10 sm:w-[30vw] max-w-[300px] items-center pl-2 mr-6 hover:bg-Gray-100 hover:rounded-md my-2 cursor-pointer',
				isSelectedFolder(folderId) ? 'bg-Gray-100 rounded-md' : '',
			)}
		>
			<Image
				src={isSelectedFolder(folderId) ? '/icons/folder_open.svg' : '/icons/folder_close.svg'}
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
				<button
					className={cn(
						'pl-[15px] pt-1 typo-Body3 w-52 flex items-start',
						newFolderName == 'Untitled' ? 'text-gray-300 italic' : '',
					)}
					onClick={handleSetFolders}
				>
					{newFolderName}
				</button>
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
							<div
								className="w-full h-full p-3 hover:bg-gray-100 cursor-pointer rounded-b-xl"
								onClick={handleDeleteFolder}
							>
								삭제
							</div>
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
						onClick={handleAddFile}
					/>
				</div>
			</div>
		</div>
	);
};

export default FolderInfo;
