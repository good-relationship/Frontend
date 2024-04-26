import { SchoolName } from '@/models/search/entity/search';

export type SearchSchoolNameResponseDTO = {
	schools: SchoolName[];
	count: number;
};
