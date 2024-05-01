import { ReactNode, Suspense } from 'react';

import FallbackLoadingPage from '@/components/loading/FallbackLoadingPage';

const OnboardingLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="h-full justify-center flex">
			<Suspense fallback={FallbackLoadingPage()}>{children}</Suspense>
		</div>
	);
};

export default OnboardingLayout;
