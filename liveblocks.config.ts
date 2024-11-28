import { LiveList, LiveMap, LiveObject } from '@liveblocks/client';

import { Layer, Point } from '@/types/whiteboard';

declare global {
	interface Liveblocks {
		Presence: {
			cursor: Point | null;
			pencilDraft: [x: number, y: number, pressure: number][] | null;
		};
		Storage: {
			layers: LiveMap<string, LiveObject<Layer>>;
			layerOrderList: LiveList<string>;
		};
	}
}

export {};
