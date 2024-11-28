import FileContent from '@/components/document/FileContent';
import FileHeader from '@/components/document/FileHeader';

const FilePage = ({ params }: { params: { fileId: number } }) => {
	const { fileId } = params;
	return (
		<>
			<FileHeader fileId={fileId} />
			<FileContent fileId={fileId} />
		</>
	);
};

export default FilePage;
