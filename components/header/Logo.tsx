import Image, { ImageProps } from 'next/image';

import { cn } from '@/lib/utils';

const Logo = ({ className, ...props }: Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'>) => {
	return (
		<Image
			{...props}
			src="/icons/kan_text_horizontal.svg"
			alt="조은사이 가로 로고"
			width="0"
			height="0"
			className={cn('w-[150px] h-auto', className)}
		/>
	);
};

export default Logo;
