import { selector } from 'recoil';

import { selectedSchoolNameState } from '@/stores/atoms/selectedSchoolName';

export const isSelectedSchoolNameExistState = selector({
	key: 'isSelectedSchoolNameExistState',
	get: ({ get }) => {
		const selectedSchoolName = get(selectedSchoolNameState);
		return selectedSchoolName !== '';
	},
});
