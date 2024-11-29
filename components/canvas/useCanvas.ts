import { LiveObject } from '@liveblocks/client';
import { useMutation } from '@liveblocks/react';
import { PointerEvent, useCallback, useState, WheelEvent } from 'react';

import { getPathFromPoints, getPoint } from '@/components/canvas/point.util';
import { Point } from '@/types/whiteboard';

export const useCanvas = () => {
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

	return { onPointerDown, onPointerMove, onPointerUp, onPointerLeave, onWheel, camera };
};
