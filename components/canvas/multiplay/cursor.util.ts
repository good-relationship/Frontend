import { Id } from '@/components/canvas/multiplay/cursor.type';
import { palettes } from '@/components/canvas/palettes/palettes.util';

export const getCursorColor = (id: Id) => {
	return palettes[id % palettes.length];
};
