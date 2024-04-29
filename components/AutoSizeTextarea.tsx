import * as React from 'react';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';

import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaAutosizeProps{}

const AutoSizeTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, placeholder, ...props }, ref) => {
		return (
			<TextareaAutosize
				maxLength={250}
				className={cn(
					'resize-none flex h-[40px] w-60 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 ',
					className,
				)}
				placeholder={placeholder}
				ref={ref}
				{...props}
			/>
		);
	},
);
AutoSizeTextarea.displayName = 'AutoSizeTextarea';

export { AutoSizeTextarea };
