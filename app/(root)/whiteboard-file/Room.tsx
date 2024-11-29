'use client';

import { LiveList, LiveMap, LiveObject } from '@liveblocks/client';
import { ClientSideSuspense, LiveblocksProvider, RoomProvider } from '@liveblocks/react/suspense';
import { ReactNode } from 'react';

import { Layer } from '@/types/whiteboard';

export function Room({ children, roomId }: { children: ReactNode; roomId: string }) {
	return (
		<LiveblocksProvider publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_API || ''}>
			<RoomProvider
				id={roomId}
				initialStorage={{
					layers: new LiveMap<string, LiveObject<Layer>>(),
					layerOrderList: new LiveList([]),
				}}
				initialPresence={{
					cursor: null,
					pencilDraft: null,
				}}
			>
				<ClientSideSuspense fallback={<div>Loading…</div>}>{children}</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	);
}
