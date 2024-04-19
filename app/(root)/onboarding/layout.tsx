import { ReactNode } from 'react';

const OnboardingLayout = ({ children }: { children: ReactNode }) => {
	return <div className="h-full justify-center flex">{children}</div>;
};

export default OnboardingLayout;
