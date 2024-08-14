import { useMeeting } from '@/hooks/meeting';

export const usePeerConnections = () => {
	const { peerConnectionsRef } = useMeeting();
	return { peerConnectionsRef: peerConnectionsRef };
};
