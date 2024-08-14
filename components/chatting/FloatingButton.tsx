import React from 'react';

import ChattingPop from './ChattingPop';

import { Popover, PopoverTrigger } from '@/components/ui/popover';

const FloatingButton = () => {
	return (
		<Popover>
			<PopoverTrigger className="block radix-state-open:hidden md:radix-state-open:block">
				<img src="/icons/chatting.svg" alt="채팅아이콘" />
			</PopoverTrigger>
			<ChattingPop />
		</Popover>
	);
};

export default FloatingButton;
