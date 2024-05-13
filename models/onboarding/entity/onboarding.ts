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

export type WorkspaceState = 'HAS_WORKSPACE' | 'NO_SPACE' | 'INVITED' | 'OVERFLOW';
