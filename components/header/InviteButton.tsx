'use client';

import { useEffect, useState } from 'react';

import InviteUser from '@/components/dialog/InviteUser';
import CopyLinkButton from '@/components/header/CopyLinkButton';
import RoundedButton from '@/components/RoundedButton';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const InviteButton = () => {
	const [isOpen, setIsOpen] = useState(false);
	const closeDialog = () => setIsOpen(false);
	const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 640);

	useEffect(() => {
		const handleResize = () => {
			setIsWideScreen(window.innerWidth >= 640);
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<RoundedButton variant="Purple" size={isWideScreen ? 'Small' : 'Xsmall'}>
					+ {isWideScreen ? '초대하기' : ''}
				</RoundedButton>
			</DialogTrigger>
			<DialogContent className="max-w-[700px] items-center flex flex-col gap-[48px]">
				<InviteUser />
				<CopyLinkButton closeDialog={closeDialog} />
			</DialogContent>
		</Dialog>
	);
};

export default InviteButton;
