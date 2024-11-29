'use client';

import { LiveObject } from '@liveblocks/client';
import { useSelf } from '@liveblocks/react';
import { useMutation } from '@liveblocks/react/suspense';
import { PointerEvent, useCallback, useState, WheelEvent } from 'react';

import Path from '@/components/canvas/Path';
import PathList from '@/components/canvas/PathList';
import { getPathFromPoints, getPoint } from '@/components/canvas/point.util';
import { Point } from '@/types/whiteboard';

const Canvas = () => {
	const pencilDraft = useSelf((me) => me.presence.pencilDraft);
	const [camera, setCamera] = useState<Point>({ x: 0, y: 0 });

	const startDrawing = useMutation(({ setMyPresence }, point: Point, pressure: number) => {
		setMyPresence({
			pencilDraft: [[point.x, point.y, pressure]],
			penColor: '#000000',
		});
	}, []);

	const draw = useMutation(({ self, setMyPresence }, point: Point, pressure: number) => {
		const { pencilDraft } = self.presence;

		setMyPresence({
			cursor: point,
			pencilDraft: pencilDraft ? [...pencilDraft, [point.x, point.y, pressure]] : [[point.x, point.y, pressure]],
		});
	}, []);

	const changeDraftIntoLayer = useMutation(({ storage, self, setMyPresence }) => {
		const liveLayers = storage.get('layers');
		const { pencilDraft } = self.presence;
		const id = Date.now().toString();

		if (pencilDraft == null) {
			setMyPresence({ pencilDraft: null });
			return;
		}

		liveLayers.set(id, new LiveObject(getPathFromPoints(pencilDraft)));
		const layerOrderList = storage.get('layerOrderList');
		layerOrderList.push(id);
		setMyPresence({ pencilDraft: null });
	}, []);

	const onPointerLeave = useMutation(({ setMyPresence }) => {
		setMyPresence({ cursor: null });
	}, []);

	const onWheel = useCallback((e: WheelEvent) => {
		setCamera((prev) => ({ x: prev.x - e.deltaX, y: prev.y - e.deltaY }));
	}, []);

	const onPointerDown = useCallback(
		(e: PointerEvent) => {
			const point = getPoint(e, camera);
			startDrawing(point, e.pressure);
		},
		[camera, startDrawing],
	);

	const onPointerMove = useMutation(
		({ setMyPresence }, e: PointerEvent) => {
			e.preventDefault();
			const point = getPoint(e, camera);
			draw(point, e.pressure);
			setMyPresence({ cursor: point });
		},
		[camera, draw],
	);

	const onPointerUp = useMutation(() => {
		changeDraftIntoLayer();
	}, [changeDraftIntoLayer]);

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
