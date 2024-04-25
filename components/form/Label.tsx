import { ReactNode } from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
	children: ReactNode;
}

const Label = ({ children, ...props }: LabelProps) => {
	return (
		<label className="typo-Body1 text-Gray-400" {...props}>
			{children}
		</label>
	);
};

export default Label;
