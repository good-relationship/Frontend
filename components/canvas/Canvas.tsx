'use client';

import { LiveObject } from '@liveblocks/client';
import { useSelf } from '@liveblocks/react';
import { useMutation } from '@liveblocks/react/suspense';
import { PointerEvent } from 'react';

const Canvas = () => {
	const pencilDraft = useSelf((me) => me.presence.pencilDraft);

	const startDrawing = useMutation(({ setMyPresence }, e: PointerEvent) => {
		setMyPresence({
			pencilDraft: [[e.clientX, e.clientY, e.pressure]],
		});
	}, []);

	const draw = useMutation(({ self, setMyPresence }, e: PointerEvent) => {
		const { pencilDraft } = self.presence;
		setMyPresence({
			cursor: { x: e.clientX, y: e.clientY },
			pencilDraft: pencilDraft
				? [...pencilDraft, [e.clientX, e.clientY, e.pressure]]
				: [[e.clientX, e.clientY, e.pressure]],
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

		liveLayers.set(
			id,
			new LiveObject({
				type: 'path',
				points: pencilDraft,
			}),
		);
		const layerOrderList = storage.get('layerOrderList');
		layerOrderList.push(id);
		setMyPresence({ pencilDraft: null });
	}, []);

	const resetCursor = useMutation(({ setMyPresence }) => {
		setMyPresence({ cursor: null });
	}, []);

	const onPointerDown = (e: PointerEvent) => {
		startDrawing(e);
	};

	const onPointerMove = (e: PointerEvent) => {
		draw(e);
	};

	const onPointerLeave = () => {
		resetCursor();
	};

	const onPointerUp = () => {
		changeDraftIntoLayer();
	};

	const getPath = (points: number[][]) => {
		if (!points) {
			return '';
		}

		let path = '';
		for (let i = 0; i < points.length; i++) {
			if (i === 0) {
				path += `M${points[i][0]} ${points[i][1]}`;
			} else {
				path += `L${points[i][0]} ${points[i][1]}`;
			}
		}

		console.log('path', path);
		return path;
	};

	return (
		<div>
			<svg
				className="w-[80vw] h-[80vh] bg-gray-100"
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
				onPointerLeave={onPointerLeave}
			/>
			<g>{pencilDraft && <path d={getPath(pencilDraft || [])} fill="#000000" x={0} y={0} strokeWidth={1} />}</g>
		</div>
	);
};

export default Canvas;
