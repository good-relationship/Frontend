import FileContent from '@/components/document/FileContent';
import FileHeader from '@/components/document/FileHeader';

const FilePage = ({ params }: { params: { fileId: string } }) => {
	const { fileId } = params;
	return (
		<>
			<div>파일 번호 : {fileId}</div>
			{<FileHeader />}
			<FileContent />
		</>
	);
};

export default FilePage;
