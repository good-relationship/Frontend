'use client';

import { useEffect, useState } from 'react';

import FloatingButton from './FloatingButton';

import { useGetAccessToken } from '@/hooks/auth';

const FloatingInfo = () => {
	const [hasToken, setHasToken] = useState(false);

	const checkToken = () => {
		const accessToken = useGetAccessToken();
		setHasToken(!!accessToken);
	};

	useEffect(() => {
		checkToken();
	}, []);

	return <>{hasToken && <FloatingButton />}</>;
};
export default FloatingInfo;