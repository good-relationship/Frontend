type ChipProps = {
	name: string;
};

const Chip = ({ name }: ChipProps) => {
	return <p className="bg-Gray-100 text-Gray-400 typo-Caption2 rounded-lg px-[10px] py-[6px]">{name}</p>;
};

export default Chip;
