import { Id } from '@/components/canvas/multiplay/cursor.type';
import { colors } from '@/constants/colors';

export const getCursorColor = (id: Id) => {
	const palettes = [colors['Purple-500'], colors['Purple-800'], colors['Red'], colors['Naver'], colors['Kakao']];

	return palettes[id % palettes.length];
};
