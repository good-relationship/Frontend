import * as React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

// eslint-disable-next-line import/extensions
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
	({ className, style, ...props }, ref) => {
		return (
			<TextareaAutosize
				maxLength={250}
				className={cn(
					'resize-none flex h-[40px] w-60 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 ',
					className,
				)}
				placeholder="채팅을 입력해주세요."
				ref={ref}
				{...props}
			/>
		);
	},
);
Textarea.displayName = 'Textarea';

export { Textarea };
