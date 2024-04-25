import * as z from 'zod';

export const workspaceNameSchema = z.object({
	workspaceName: z.string().min(1, '필수 입력 사항입니다.').max(10, '10자 이내로 입력해주세요'),
});

export type WorkspaceNameSchemaType = typeof workspaceNameSchema;
