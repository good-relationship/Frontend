export type WorkspaceInfo = {
	schoolName: string;
	workspaceName: string;
};

export type WorkspaceUserInfo = {
	userId: number;
	userName: string;
	email: string;
	userImage: string;
};

export type WorkspaceState = 'hasWorkSpace' | 'noSpace' | 'invited' | 'overflow';
