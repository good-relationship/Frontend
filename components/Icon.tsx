import { IconId } from '@/types/icons';

export type IconProps = {
	id: IconId;
	color?: string;
	size?: number;
	width?: number;
	height?: number;
};

const svgFile = '/icons/icons.svg';

const Icon = ({ id, color = 'none', size, width, height }: IconProps) => (
	<svg stroke={color} fill={color} width={size || width} height={size || height}>
		<use href={`${svgFile}#${id}`} />
	</svg>
);

export default Icon;
