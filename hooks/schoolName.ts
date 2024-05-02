import { useRecoilState } from 'recoil';

import { selectedSchoolNameState } from '@/stores/atoms/selectedSchoolName';

export const useSelectedSchoolName = () => {
	const [selectedSchoolName, setSelectedSchoolName] = useRecoilState(selectedSchoolNameState);

	const setSchoolName = (schoolName: string) => {
		setSelectedSchoolName(schoolName);
	};

	const isSelected = (schoolName: string) => selectedSchoolName === schoolName;

	const removeSelectedSchoolName = () => {
		setSelectedSchoolName('');
	};

	return { setSchoolName, isSelected, removeSelectedSchoolName };
};
