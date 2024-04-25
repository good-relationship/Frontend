import Nav from '@/components/onboarding/Nav';

const CreateProgressNav = () => {
	const navInfo = {
		title: '워크스페이스 생성',
		description:
			'조은 사이는 캡스톤 디자인 협업을 지원하기 위한 서비스입니다.\n 워크스페이스 생성을 위한 정보를 입력해주세요.',
	};

	return <Nav title={navInfo.title} description={navInfo.description} />;
};

export default CreateProgressNav;
