'use client';

import { Client } from '@stomp/stompjs';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useGetAccessToken } from '@/hooks/auth';

const WebsocketContext = createContext<Client>({} as Client);

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

export const WebsocketProvider = ({ children }: { children: ReactNode }) => {
	const [stompClient, setStompClient] = useState<Client>();
	useEffect(() => {
		const initialize = async () => {
			try {
				const access = await useGetAccessToken();

				const client = new Client({
					brokerURL: `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`,
					connectHeaders: {
						Authorization: `${access}`,
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

				setStompClient(client);
				client.activate();
			} catch (e) {
				console.error(e);
			}
		};

		initialize();

		return () => {
			if (stompClient && stompClient.connected) {
				stompClient.deactivate();
			}
		};
	}, []);

	if (!stompClient) {
		return null;
	}

	return <WebsocketContext.Provider value={stompClient}>{children}</WebsocketContext.Provider>;
};
