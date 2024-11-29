'use client';

import Draft from '@/components/canvas/Draft';
import Multiplayer from '@/components/canvas/multiplay/Multiplayer';
import Palettes from '@/components/canvas/palettes/Palettes';
import PathList from '@/components/canvas/PathList';
import { useCanvas } from '@/components/canvas/useCanvas';

const Canvas = () => {
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
					<Draft camera={camera} />
					<Multiplayer />
				</g>
			</svg>
			<div className="fixed bottom-4 left-1/2 -translate-x-1/2">
				<Palettes />
			</div>
		</div>
	);
};

export default Canvas;
