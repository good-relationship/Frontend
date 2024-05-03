export type WorkspaceInfo = {
	spaceState: string;
	workspaceId : string;
	workspaceName: string;
};

export type WorkspaceUserInfo = {
	id: number;
	nickname: string;
	profileImage: string;
	email: string;
};

export type InviteCode = {
	inviteCode: string;
}