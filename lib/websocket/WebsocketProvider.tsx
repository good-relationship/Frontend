'use client';

import { Client } from '@stomp/stompjs';
import { createContext, ReactNode, useContext, useEffect } from 'react';

const WebsocketContext = createContext<Client | undefined>(undefined);

export const useWebsocket = () => {
	const context = useContext(WebsocketContext);
	if (context === undefined) {
		throw new Error('useWebsocket must be used within a WebsocketProvider');
	}

	return context;
};

const initializeWebsocket = (accessToken: string) => {
	const stompClient = new Client({
		brokerURL: `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`,
		connectHeaders: {
			Authorization: `Bearer ${accessToken}`,
		},
		reconnectDelay: 5000,
		heartbeatIncoming: 4000,
		heartbeatOutgoing: 4000,
		onStompError: (frame) => {
			// TODO: stomp 오류 처리
			console.error('Broker reported error: ' + frame.headers['message']);
			console.error('Additional details: ' + frame.body);
		},
	});

	stompClient.activate();
	return stompClient;
};

export const WebsocketProvider = ({ children, accessToken }: { children: ReactNode; accessToken: string }) => {
	const stompClient = initializeWebsocket(accessToken);

	useEffect(() => {
		return () => {
			if (stompClient && stompClient.connected) {
				stompClient.deactivate();
			}
		};
	}, []);

	return <WebsocketContext.Provider value={stompClient}>{children}</WebsocketContext.Provider>;
};
