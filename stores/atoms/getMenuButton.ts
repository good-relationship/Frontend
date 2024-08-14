import { atom } from 'recoil';

type GetMenuButtonStateType = {
	isOpen: boolean;
};

export const getMenuButtonState = atom<GetMenuButtonStateType>({
	key: 'getMenuButtonState',
	default: { isOpen: false },
});
