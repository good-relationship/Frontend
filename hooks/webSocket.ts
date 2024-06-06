import { Client } from '@stomp/stompjs';

export const useCreateWebSocketClient = (headers: { Authorization: string }, onConnectCallback: () => void) => {
	const newClient = new Client({
		brokerURL: `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`,
		reconnectDelay: 5000,
		debug: (str) => console.log(str),
		onConnect: (frame) => {
			console.log('Connected: ' + frame);
			onConnectCallback(); // 연결됐을 때 실행할 콜백 함수
		},
		connectHeaders: headers,
		onStompError: (frame) => {
			console.error(frame);
		},
	});
	return newClient;
};
