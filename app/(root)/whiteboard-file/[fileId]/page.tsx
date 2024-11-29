import { Room } from '@/app/(root)/whiteboard-file/Room';
import Canvas from '@/components/canvas/Canvas';

const WhiteboardFile = ({ params }: { params: { fileId: string } }) => {
	return (
		<div className="h-full">
			<Room roomId={params.fileId}>
				<Canvas />
			</Room>
		</div>
	);
};

export default WhiteboardFile;
