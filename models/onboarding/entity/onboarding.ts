export type WorkspaceInfo = {
	schoolName: string;
	workspaceName: string;
};

export type WorkspaceUserInfo = {
	id: number;
	nickname: string;
	email: string;
	profileImage: string;
};

export type WorkspaceState = 'hasWorkSpace' | 'noSpace' | 'invited' | 'overflow';
