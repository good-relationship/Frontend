import localFont from 'next/font/local';

export const pretendard = localFont({
	src: [
		{
			path: '../app/fonts/Pretendard-Regular.woff',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../app/fonts/Pretendard-Bold.woff',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../app/fonts/Pretendard-Medium.woff',
			weight: '500',
			style: 'normal',
		},
	],
	variable: '--font-pretendard',
});
