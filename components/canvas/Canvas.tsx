'use client';

import { useSelf } from '@liveblocks/react';

import Path from '@/components/canvas/Path';
import PathList from '@/components/canvas/PathList';
import { useCanvas } from '@/components/canvas/useCanvas';

const Canvas = () => {
	const pencilDraft = useSelf((me) => me.presence.pencilDraft);
	const { onPointerDown, onPointerMove, onPointerUp, onPointerLeave, onWheel, camera } = useCanvas();

	return (
		<div className="touch-none h-full">
			<svg
				className="w-full h-full bg-gray-100"
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
				onPointerLeave={onPointerLeave}
				onWheel={onWheel}
			>
				<g
					style={{
						transform: `translate(${camera.x}px, ${camera.y}px)`,
					}}
				>
					<PathList />
					{pencilDraft && (
						<Path
							type="path"
							points={pencilDraft}
							x={camera.x}
							y={camera.y}
							width={0}
							height={0}
							fill="#000000"
						/>
					)}
				</g>
			</svg>
		</div>
	);
};

export default Canvas;
