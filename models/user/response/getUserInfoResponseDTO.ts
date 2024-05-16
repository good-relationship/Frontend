import { Email, UserId, UserImage, UserName } from '@/models/user/entity/user';

export type GetUserInfoResponseDTO = {
	userId: UserId;
	userName: UserName;
	email: Email;
	userImage: UserImage;
};
