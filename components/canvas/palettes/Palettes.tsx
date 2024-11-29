import { useMutation, useSelf } from '@liveblocks/react/suspense';
import React, { useState } from 'react';

import Palette from '@/components/canvas/palettes/Palette';
import { PaletteColor } from '@/components/canvas/palettes/palette.type';
import { palettes } from '@/components/canvas/palettes/palettes.util';

const Palettes = () => {
	const penColor = useSelf((me) => me.presence.penColor);
	const [selectedColor, setSelectedColor] = useState<PaletteColor>(penColor);
	const onClick = useMutation(
		({ setMyPresence }, color: PaletteColor) => {
			setMyPresence({ penColor: color });
			setSelectedColor(color);
		},
		[setSelectedColor],
	);

	return (
		<div className="flex gap-3 bg-white px-10 py-5 shadow-md rounded-md">
			{palettes.map((color) => {
				return <Palette key={color} color={color} onClick={onClick} selectedColor={selectedColor} />;
			})}
		</div>
	);
};

export default Palettes;
