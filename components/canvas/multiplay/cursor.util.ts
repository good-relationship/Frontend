import { Id } from '@/components/canvas/multiplay/cursor.type';
import { colors } from '@/constants/colors';

export const getCursorColor = (id: Id) => {
	const palletes = [colors['Purple-500'], colors['Purple-800'], colors['Red'], colors['Naver'], colors['Kakao']];

	return palletes[id % palletes.length];
};
