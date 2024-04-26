type NavProps = {
	title: string;
	description?: string;
};

const Nav = ({ title, description }: NavProps) => {
	return (
		<nav className="flex flex-col gap-1 items-center">
			<div className="flex flex-col gap-[15px] items-center whitespace-pre-line text-center">
				<h1 className="typo-Header1 text-Gray-500">{title}</h1>
				<p className="typo-SubHeader3 text-Gray-400">{description}</p>
			</div>
		</nav>
	);
};

export default Nav;
