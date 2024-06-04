import Chatting from './Chatting';

import { PopoverContent } from '@/components/ui/popover';

const ChattingPop = () => {
	return (
		<PopoverContent align="end" className="w-[25vw] min-w-[370px] py-0 z-0 text-black">
			<Chatting />
		</PopoverContent>
	);
};

export default ChattingPop;
