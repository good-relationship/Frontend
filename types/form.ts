import { FieldValues } from 'react-hook-form';

import { WorkspaceNameSchemaType } from '@/constants/form';

export type FormName = 'workspaceName';

export type SchemaType = WorkspaceNameSchemaType;
export interface FormType extends FieldValues {}
