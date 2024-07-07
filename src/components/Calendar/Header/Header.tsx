import { ReactNode } from 'react';
import styles from './Header.module.css';
import { IUser } from '../../../utils/interfaces';
import { Button } from '../../Button/Button';

interface IHeader {
	currentUser: IUser | undefined;
	onLogOut: () => void;
	children?: ReactNode;
}

export const Header = (props: IHeader) => {
	return (
		<div className={styles.container}>
			<span>TO-DO</span>
			{props.currentUser && (
				<div className={styles.user}>
					<span className={styles.userName}>
						{'Текущий пользователь: ' + props.currentUser?.name ||
							''}
					</span>

					<Button onClick={props.onLogOut}>Выйти</Button>
				</div>
			)}
		</div>
	);
};
