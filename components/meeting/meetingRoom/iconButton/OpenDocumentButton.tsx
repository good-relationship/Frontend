'use client';

import Link from 'next/link';

import IconButton from '@/components/meeting/meetingRoom/IconButton';

const OpenDocumentButton = () => {
	const icon = 'pencil';
	const link = `${process.env.NEXT_PUBLIC_URL}/workspace/document`;

	return (
		<Link href={link} target="_blank">
			<IconButton icon={icon} message="기록하기" />;
		</Link>
	);
};

export default OpenDocumentButton;
