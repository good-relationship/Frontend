import { AuthorizationCode, InviteCode, LoginProvider } from '@/models/auth/entity/auth';

export type LoginRequestDTO = {
	loginProvider: LoginProvider;
	code: AuthorizationCode;
	inviteCode?: InviteCode;
};
