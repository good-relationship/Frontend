import { FieldValues } from 'react-hook-form';

import { MeetingNameSchemaType, WorkspaceNameSchemaType } from '@/constants/form';

export type FormName = 'workspaceName' | 'meetingName';

export type SchemaType = WorkspaceNameSchemaType | MeetingNameSchemaType;
export interface FormType extends FieldValues {}
