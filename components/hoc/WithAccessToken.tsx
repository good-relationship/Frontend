import { cookies } from 'next/headers';
import { FC, ReactNode } from 'react';

import { ACCESS_TOKEN } from '@/constants/storage';

interface RequiredProps {
	accessToken: string;
	children: ReactNode;
}

const WithAccessToken = (Component: FC<RequiredProps>) => {
	return async function WrappedComponent(props: Omit<RequiredProps, 'accessToken'>) {
		const cookieStore = cookies();
		const cookie = cookieStore.get(ACCESS_TOKEN)?.value || '';

		return <Component {...props} accessToken={cookie} />;
	};
};

export default WithAccessToken;
