import Link from 'next/link';

import ProfileImage from '@/components/ProfileImage';
import RoundedButton from '@/components/RoundedButton';

export default function Home() {
	return (
		<main className="min-h-screen">
			<RoundedButton size="Small" variant="Purple">
				라이트
			</RoundedButton>
			<RoundedButton size="Small" variant="Black">
				라이트
			</RoundedButton>
			<RoundedButton size="Medium">라이트</RoundedButton>
			<RoundedButton size="Medium" variant="Outline">
				라이트
			</RoundedButton>
			<RoundedButton size="Large" variant="Purple">
				라이트
			</RoundedButton>
			<RoundedButton size="Large" variant="Disabled">
				라이트
			</RoundedButton>
			<RoundedButton size="Large" variant="Outline-Disabled">
				라이트
			</RoundedButton>
			<Link href="/setting">세팅으로 가기</Link>
			<ProfileImage size={32} src="/icons/kan_circle.svg" />
		</main>
	);
}
