'use clinet';

type DeviceButtonProps = {
	onClick: () => void;
	label: string;
	isSelcted: boolean;
};

const DeviceButton = ({ onClick, label, isSelcted }: DeviceButtonProps) => {
	return (
		<button onClick={onClick}>
			{label}
			{isSelcted && <span>✅</span>}
		</button>
	);
};

export default DeviceButton;
