import { Button } from '../Button/Button';
import styles from './Modal.module.css';
import { ReactNode } from 'react';

interface IModalProps {
	onClose: () => void;
	children: ReactNode;
}

export const Modal = ({ onClose, children }: IModalProps) => {
	return (
		<div>
			<div className={styles.modal}>
				<Button onClick={onClose}>Закрыть</Button>
				{children}
			</div>
		</div>
	);
};
