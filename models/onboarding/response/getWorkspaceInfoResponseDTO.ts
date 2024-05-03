import { WorkspaceState } from '@/models/onboarding/entity/onboarding';

export type GetWorkspaceInfoResponseDTO = {
	spaceState: WorkspaceState;
	workspaceId: string;
	workspaceName: string;
};
