import styles from './Button.module.css';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

export const Button = ({ children, ...props }: IButtonProps) => {
	return (
		<button className={styles.button} {...props}>
			{children}
		</button>
	);
};
