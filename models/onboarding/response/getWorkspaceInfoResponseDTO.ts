import { WorkspaceState } from '@/models/onboarding/entity/onboarding';

export type GetUserWorkspaceInfoResponseDTO = {
	spaceState: WorkspaceState;
	workspaceId: string;
	workspaceName: string;
};
