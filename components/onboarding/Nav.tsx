import Image from 'next/image';

type NavProps = {
	title: string;
	description?: string;
};

const Nav = ({ title, description }: NavProps) => {
	return (
		<nav className="flex flex-col gap-1 items-center">
			<Image src="/icons/kan_text_vertical.svg" width={50} height={50} alt="Kan Logo" />
			<div className="flex flex-col gap-[15px] items-center">
				<h1 className="typo-Header1 text-Gray-500">{title}</h1>
				<p className="typo-SubHeader3 text-Gray-400">{description}</p>
			</div>
		</nav>
	);
};

export default Nav;
