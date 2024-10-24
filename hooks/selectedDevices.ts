import { useRecoilState } from 'recoil';

import { selectedDevicesState } from '@/stores/atoms/selectedDevices';

export const useSelectedDevices = () => {
	const [selectedDevices, setSelectedDevices] = useRecoilState(selectedDevicesState);

	const getConstraints = () => {
		return selectedDevices.constraints;
	};

	const getSpeaker = () => {
		return selectedDevices.audioOutput;
	};

	return { selectedDevices, setSelectedDevices, getConstraints, getSpeaker };
};
