'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface ProfileImageProps extends Omit<ImageProps, 'alt'> {
	size?: number;
}

const defaultProfileImage = '/icons/kan_circle.svg';

const ProfileImage = ({ size = 32, src, ...props }: ProfileImageProps) => {
	const [imagePath, setImagePath] = useState(src);

	return (
		<Image
			src={imagePath ? imagePath : defaultProfileImage}
			width={size}
			height={size}
			onError={() => setImagePath(defaultProfileImage)}
			className="rounded-full"
			alt="Profile Image"
			{...props}
		/>
	);
};

export default ProfileImage;
