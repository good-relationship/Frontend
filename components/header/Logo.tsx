import Image, { ImageProps } from 'next/image';

import { cn } from '@/lib/utils';

const Logo = ({ className, ...props }: Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'>) => {
	return (
		<div className="flex items-center gap-2">
			<Image
				{...props}
				src="/icons/kan.svg"
				alt="조은사이 가로 로고"
				width="0"
				height="0"
				className={cn('w-[60px] h-auto', className)}
			/>
			{/* <h6 className="text-Purple-200 typo-Header5">조은사이</h6> */}
		</div>
	);
};

export default Logo;
