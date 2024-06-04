'use server';

import LoggedInUser from '@/components/header/LoggedInUser';
import NotLoggedInUser from '@/components/header/NotLoggedInUser';
import { useIsLoggedIn } from '@/hooks/auth';

const UserInfo = async () => {
	const isLoggedIn = await useIsLoggedIn();
	return <section className="flex items-center">{isLoggedIn ? <LoggedInUser /> : <NotLoggedInUser />}</section>;
};

export default UserInfo;
