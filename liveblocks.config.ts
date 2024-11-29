import { LiveList, LiveMap, LiveObject } from '@liveblocks/client';

import { Layer, Point } from '@/types/whiteboard';

declare global {
	interface Liveblocks {
		Presence: {
			cursor: Point | null;
			pencilDraft: [x: number, y: number, pressure: number][] | null;
			penColor: string;
		};
		Storage: {
			layers: LiveMap<string, LiveObject<Layer>> | null;
			layerOrderList: LiveList<string> | null;
		};
	}
}

export {};
