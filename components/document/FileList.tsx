import { useRecoilValue } from 'recoil';

import FileInfo from './FileInfo';

import { getFolders } from '@/stores/atoms/getFolders';

interface fileDocument {
	folderId?: number;
}

const FileList = ({ folderId }: fileDocument) => {
	const folders = useRecoilValue(getFolders);

	return (
		<div className={`${folderId ? 'block' : 'hidden'} sm:block w-full sm:border-l-4 border-l-gray-300 pl-[5vw]`}>
			<div className="h-[60vh] flex overflow-y-auto">
				<div className="overflow-y-auto overflow-x-hidden w-full sm:max-w-[320px]">
					{folders.folderInfo.some((folder) => folder.folderId === folderId) ? (
						folders.folderInfo
							.filter((folder) => folder.folderId === folderId)
							.map((folder) =>
								folder.files.length > 0 ? (
									folder.files.map((file) => (
										<FileInfo
											key={file.fileId}
											// folderId={folder.folderId}
											fileName={file.fileName}
											fileId={file.fileId}
										/>
									))
								) : (
									<p>해당 폴더는 비어있습니다.</p>
								),
							)
					) : (
						<p>해당 폴더는 비어있습니다.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default FileList;
