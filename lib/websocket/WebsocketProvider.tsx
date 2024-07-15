'use client';

import { Client } from '@stomp/stompjs';
import { createContext, ReactNode, useContext, useEffect, useRef } from 'react';

const WebsocketContext = createContext<Client | undefined>(undefined);

export const useWebsocket = () => {
	const context = useContext(WebsocketContext);
	if (context === undefined) {
		throw new Error('useWebsocket must be used within a WebsocketProvider');
	}

	if (!context.connected || !context.active) {
		context.activate();
	}

	return context;
};

const initializeWebsocket = (accessToken: string) => {
	const stompClient = new Client({
		brokerURL: `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`,
		connectHeaders: {
			Authorization: `${accessToken}`,
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
	const stompClient = useRef<Client>(initializeWebsocket(accessToken));

	useEffect(() => {
		if (!stompClient.current || !stompClient.current.connected) {
			stompClient.current = initializeWebsocket(accessToken);
		}

		return () => {
			if (stompClient.current && stompClient.current.connected) {
				stompClient.current.deactivate();
			}
		};
	}, []);

	return <WebsocketContext.Provider value={stompClient.current}>{children}</WebsocketContext.Provider>;
};
