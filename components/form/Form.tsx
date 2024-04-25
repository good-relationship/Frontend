import { zodResolver } from '@hookform/resolvers/zod';
import React, { ReactNode } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import CustomInput from '@/components/form/CustomInput';
import Helpertext from '@/components/form/Helpertext';
import Label from '@/components/form/Label';
import { FormType, SchemaType } from '@/types/form';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
	children: ReactNode;
	onSubmit: SubmitHandler<FormType>;
	schema: SchemaType;
}

const Form = ({ children, schema, onSubmit, ...props }: FormProps) => {
	const methods = useForm<FormType>({
		resolver: zodResolver(schema),
		mode: 'onChange',
	});

	const { handleSubmit } = methods;

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)} {...props}>
				{children}
			</form>
		</FormProvider>
	);
};

Form.Label = Label;
Form.HelperText = Helpertext;
Form.Input = CustomInput;

export default Form;
