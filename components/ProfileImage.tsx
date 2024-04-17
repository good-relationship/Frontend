'use client';

import Image from 'next/image';
import { useState } from 'react';

type ProfileImageProps = {
	size?: number;
	src?: string;
};

const defaultProfileImage = '/icons/kan_circle.svg';

const ProfileImage = ({ size = 32, src }: ProfileImageProps) => {
	const [imagePath, setImagePath] = useState(src);

	return (
		<Image
			src={imagePath ? imagePath : defaultProfileImage}
			width={size}
			height={size}
			alt="Profile Image"
			onError={() => setImagePath(defaultProfileImage)}
			className="rounded-full"
		/>
	);
};

export default ProfileImage;
