import { Suspense } from 'react';

import FolderListSkeleton from './FolderListSkeleton';

import DocumentHeader from '@/components/document/DocumentHeader';
import FolderList from '@/components/document/FolderList';

const DocumentPage = () => {
	// 페이지 진입 시, 서버로부터 기록페이지의 데이터 get (파일명, 폴더명 리스트)

	return (
		<div className="h-full flex flex-col">
			<DocumentHeader />
			<div className="flex flex-1 mt-[40px]">
				<Suspense fallback={<FolderListSkeleton />}>
					<FolderList />
				</Suspense>
			</div>
		</div>
	);
};

export default DocumentPage;
