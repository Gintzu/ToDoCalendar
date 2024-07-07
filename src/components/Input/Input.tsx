import styles from './Input.module.css';
import classnames from 'classnames';
import { InputHTMLAttributes } from 'react';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	isValid?: boolean;
}

export const Input = ({ className, isValid = true, ...props }: IInputProps) => {
	return (
		<input
			{...props}
			className={classnames(className, styles['input'], {
				[styles['invalid']]: !isValid,
			})}
		/>
	);
};
