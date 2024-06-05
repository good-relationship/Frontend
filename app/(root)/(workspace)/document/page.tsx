import DocumentHeader from "@/components/document/DocumentHeader";
import FileList from "@/components/document/FileList";
import FolderList from "@/components/document/FolderList";

const DocumentPage = () => {
	return (
	<div className="h-full flex flex-col">
		<DocumentHeader />
		<div className="flex flex-1 mt-[51px] gap-[80px]">
			<FolderList />
			<FileList />
		</div>
	</div>);
};

export default DocumentPage;