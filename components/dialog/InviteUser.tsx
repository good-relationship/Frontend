import Image from 'next/image';

const InviteUser = () => {
	return (
		<div className="flex flex-col items-center gap-[15px]">
			<Image src="/images/search_user.png" width={220} height={220} alt="Search user" />
			<div className="flex flex-col gap-3 items-center">
				<h6 className="typo-Header6 text-Gray-500">사용자 추가</h6>
				<p className="text-Gray-400">링크를 복사해서 사용자를 초대해주세요!</p>
			</div>
		</div>
	);
};

export default InviteUser;
