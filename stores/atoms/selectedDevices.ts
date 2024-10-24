import { atom } from 'recoil';

type SelectedDevicesStateType = {
	constraints: MediaStreamConstraints;
	audioOutput: string;
};

export const selectedDevicesState = atom<SelectedDevicesStateType>({
	key: 'selectedDevices',
	default: {
		constraints: {
			audio: true,
			video: true,
		},
		audioOutput: '',
	},
});
