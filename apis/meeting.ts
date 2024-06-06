import { API_URLS } from '@/constants/url';
import { CreateMeetingRoomRequestDTO } from '@/models/meeting/request/createMeetingRoomRequestDTO';
import { JoinMeetingRoomRequestDTO } from '@/models/meeting/request/joinMeetingRoomRequestDTO';
import { fetcher } from '@/utils/fetcher';
import { getApiUrl } from '@/utils/url';

export const getMeetingRoomList = async () => {
	const url = getApiUrl(API_URLS.GET_MEET_ROOM_LIST)()();
	await fetcher(url, true);
};

export const createMeeting = async ({ roomName }: CreateMeetingRoomRequestDTO) => {
	const url = getApiUrl(API_URLS.CREATE_MEET_ROOM)()();
	const fetch = await fetcher(url, true, {
		method: 'POST',
		body: JSON.stringify({ roomName }),
	});
	return fetch;
};

export const joinMeeting = async ({ roomId }: JoinMeetingRoomRequestDTO) => {
	const url = getApiUrl(API_URLS.JOIN_MEET_ROOM)(roomId)();
	return await fetcher(url, true, {
		method: 'POST',
	});
};

export const leaveMeeting = async () => {
	const url = getApiUrl(API_URLS.LEAVE_MEET_ROOM)()();
	await fetcher(url, true, {
		method: 'POST',
	});
};
