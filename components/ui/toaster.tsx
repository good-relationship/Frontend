'use client';

import { Toast, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

export function Toaster() {
	const { toasts } = useToast();

	return (
		<ToastProvider duration={1000}>
			{toasts.map(function ({ id, title, action, ...props }) {
				return (
					<Toast key={id} {...props}>
						<div className="grid gap-1 w-full text-center">{title && <ToastTitle>{title}</ToastTitle>}</div>
						{action}
					</Toast>
				);
			})}
			<ToastViewport />
		</ToastProvider>
	);
}
