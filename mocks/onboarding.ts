import { GetUserWorkspaceInfoResponseDTO } from '@/models/onboarding/response/getWorkspaceUserInfoResponseDTO';

export const mockGetUserWorkspaceInfoData: GetUserWorkspaceInfoResponseDTO = {
	users: [
		{
			userId: 1,
			userName: '김코딩',
			email: 'abc@naver.com',
			userImage: 'https://via.placeholder.com/45',
		},
		{
			userId: 2,
			userName: '박디자인',
			email: 'abc@naver.com',
			userImage: 'https://via.placeholder.com/45',
		},
		{
			userId: 3,
			userName: '이테스터',
			email: 'abc@naver.com',
			userImage: 'https://via.placeholder.com/45',
		},
		{
			userId: 4,
			userName: '최마케터',
			email: 'abc@naver.com',
			userImage: 'https://via.placeholder.com/45',
		},
	],
};
