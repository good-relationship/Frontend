import LoggedInUser from '@/components/header/LoggedInUser';
import NotLoggedInUser from '@/components/header/NotLoggedInUser';

const UserInfo = () => {
	// TODO: 선택하는 로그인 라이브러리에 따라 로그인 여부 구현
	const isLogin = false;
	return <section className="flex items-center">{isLogin ? <LoggedInUser /> : <NotLoggedInUser />}</section>;
};

export default UserInfo;
