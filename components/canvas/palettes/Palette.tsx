import React from 'react';

import { PaletteColor } from '@/components/canvas/palettes/palette.type';
import { cn } from '@/lib/utils';

type PaletteProps = {
	onClick: (color: PaletteColor) => void;
	color: PaletteColor;
	selectedColor: PaletteColor;
};

const Palette = ({ onClick, color, selectedColor }: PaletteProps) => {
	const isSelectedColor = color === selectedColor;
	const handleClick = () => {
		onClick(color);
	};

	return (
		<button
			onClick={handleClick}
			className={cn(
				isSelectedColor ? 'bg-Gray-300' : 'bg-transparent',
				'w-10 h-10 flex justify-center items-center rounded-full',
			)}
		>
			<div className="w-5 h-5 rounded-full" style={{ backgroundColor: color }} />
		</button>
	);
};

export default Palette;
