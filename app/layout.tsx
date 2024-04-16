import React from 'react';

import './globals.css';

import Header from '@/components/header/Header';
import { pretendard } from '@/utils/fonts';

import type { Metadata } from 'next';

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
			<body className={`${pretendard.variable} font-pretendard w-full flex justify-center`}>
				<Header variant="user-info" />
				<div className="w-full max-w-[1440px] min-h-[calc(screen - 60px)] top-[60px] absolute">{children}</div>
			</body>
		</html>
	);
}
