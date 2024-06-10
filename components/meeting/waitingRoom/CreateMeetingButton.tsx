'use client';

import { useState } from 'react';

import CreateMeeting from '@/components/dialog/CreateMeeting';
import RoundedButton from '@/components/RoundedButton';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const CreateMeetingButton = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<RoundedButton variant="Outline" size="Small">
					새 회의 생성
				</RoundedButton>
			</DialogTrigger>
			<DialogContent className="max-w-[700px] items-center flex flex-col gap-[48px]">
				<CreateMeeting />
			</DialogContent>
		</Dialog>
	);
};

export default CreateMeetingButton;
