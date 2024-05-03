import LoggedInUser from '@/components/header/LoggedInUser';
import NotLoggedInUser from '@/components/header/NotLoggedInUser';
import { useAuth } from '@/hooks/auth';

const UserInfo = () => {
	const { useIsLoggedIn } = useAuth();
	return <section className="flex items-center">{useIsLoggedIn() ? <LoggedInUser /> : <NotLoggedInUser />}</section>;
};

export default UserInfo;
