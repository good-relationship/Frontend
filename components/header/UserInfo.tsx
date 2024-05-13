import LoggedInUser from '@/components/header/LoggedInUser';
import NotLoggedInUser from '@/components/header/NotLoggedInUser';
import { useIsLoggedIn } from '@/hooks/auth';

const UserInfo = () => {
	return <section className="flex items-center">{useIsLoggedIn() ? <LoggedInUser /> : <NotLoggedInUser />}</section>;
};

export default UserInfo;
