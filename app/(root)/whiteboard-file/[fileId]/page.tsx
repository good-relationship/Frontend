const WhiteboardFile = ({ params }: { params: { fileId: string } }) => {
	return <div>파일 번호 : {params.fileId}</div>;
};

export default WhiteboardFile;
