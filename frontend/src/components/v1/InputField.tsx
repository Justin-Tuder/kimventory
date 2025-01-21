import React, { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';
import { ReactNode, useEffect, useState, useRef } from 'react';

interface InputFieldProps {
	id: string;
	autoComplete: string;
	label: ReactNode;
	type: string;
	focus: boolean;
	placeholder: string;
	required: boolean;
	helperText: ReactNode;
	invalid: boolean;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<Partial<InputFieldProps>> = ({
	id = `input-${Math.random().toString(36).substring(2, 9)}`,
	autoComplete = 'on',
	label = '',
	type = 'text',
	focus = false,
	placeholder = '',
	required = false,
	helperText = null,
	invalid = false,
	onChange = () => {},
}: Partial<InputFieldProps>) => {
	const [requiredInputFocus, setRequiredInputFocus] = useState(false);
	const requiredInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (requiredInputRef.current && focus) {
			requiredInputRef.current.focus();
		}
	}, []);

	return (
		<Form.Group className="mt-3">
			{label && (
				<Form.Label htmlFor={id}>
					{label} {required && <span className="text-danger">*</span>}
				</Form.Label>
			)}
			<Form.Control
				id={id}
				type={type}
				ref={requiredInputRef}
				autoComplete={autoComplete}
				aria-describedby={id + '-note'}
				aria-invalid={invalid}
				placeholder={placeholder}
				onChange={onChange}
				onFocus={() => setRequiredInputFocus(true)}
				onBlur={() => setRequiredInputFocus(false)}
				required={required}
			/>
			{helperText && (
				<Form.Text
					id={id + '-note'}
					className={
						requiredInputFocus
							? 'text-muted ps-2'
							: 'visually-hidden'
					}
				>
					{helperText}
				</Form.Text>
			)}
		</Form.Group>
	);
};

export default InputField;
