import React from 'react';

import ChattingPop from './ChattingPop';

import { Popover, PopoverTrigger } from '@/components/ui/popover';

const FloatingButton = () => {
	// const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	return (
		<Popover>
			<PopoverTrigger className="md:block md:radix-state-open:block hidden">
				<img src="/icons/chatting.svg" alt="채팅아이콘" />
			</PopoverTrigger>
			<ChattingPop />
		</Popover>
	);
};

export default FloatingButton;
