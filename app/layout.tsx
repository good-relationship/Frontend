import React from 'react';

import './globals.css';

import type { Metadata } from 'next';

import Header from '@/components/header/Header';
import { Toaster } from '@/components/ui/toaster';
import RecoilRootProvider from '@/lib/recoil/RecoilRootProvider';
import { pretendard } from '@/utils/fonts';

export const metadata: Metadata = {
	title: '캡스톤 디자인 맞춤 서비스 | 조은사이',
	description: '캡스톤 디자인 프로젝트를 진행하기 위한 기능들을 통합 제공하는 서비스입니다',
	icons: {
		icon: '/kan_circle.svg',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${pretendard.variable} font-pretendard w-full flex justify-center min-h-screen`}>
				<RecoilRootProvider>
					<Header variant="user-info" />
					<div className="w-full max-w-[1440px] flex-1 max-h-[calc(100vh-60px)] absolute top-[60px] h-full overflow-auto">
						{children}
					</div>
					<Toaster />
				</RecoilRootProvider>
			</body>
		</html>
	);
}
