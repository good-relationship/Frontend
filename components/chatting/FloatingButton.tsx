import ChattingPop from './ChattingPop';

import { Popover, PopoverTrigger } from '@/components/ui/popover';

const FloatingButton = () => {
	return (
		<Popover>
			<PopoverTrigger>
				<div>
					<img src="/icons/chatting.svg" alt="채팅아이콘" />
				</div>
			</PopoverTrigger>
			<ChattingPop />
		</Popover>
	);
};
export default FloatingButton;
