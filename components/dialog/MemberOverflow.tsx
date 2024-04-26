import Image from 'next/image';

const MemberOverflow = () => {
	return (
		<div className="flex flex-col gap-3 items-center">
			<Image src="/icons/no-poverty.svg" width={56} height={56} alt="group image" />
			<h1 className="typo-Header6 text-Gray-500">워크스페이스 인원 초과</h1>
			<p className="typo-SubHeader2 text-Gray-400 whitespace-pre-wrap text-center">
				{'워크스페이스 최대 인원이 4명으로 한정되어,\n더 이상의 참여가 불가능합니다.'}
			</p>
		</div>
	);
};

export default MemberOverflow;
