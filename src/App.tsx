import { SetStateAction, useState } from 'react';
import { Button } from './components/Button/Button';
import { Calendar } from './components/Calendar/Calendar';
import { Input } from './components/Input/Input';

import styles from './App.module.css';
import { useToDo } from './controllers/ToDoProvider';
import { Header } from './components/Calendar/Header/Header';
import { IUser } from './utils/interfaces';
import { useUsers } from './controllers/userProvider';

function App() {
	const [name, setName] = useState('');

	const { createUser, setCurrentUser, currentUser, users } = useUsers();
	const { addTask } = useToDo();

	const handleRegistrationClick = () => {
		if (!name) return;
		const newUser = {
			id: String(Math.random()),
			name: name,
			busyDays: {},
		};
		createUser(newUser);
		setCurrentUser(newUser);
		setName('');
	};

	// + создать, причем сохранить в стейте куррент юзер + обновить локал сторадж
	// обновить стейт в Календарь тсх, который рендерит модалку, чтобы в модалке сразу появлиось тоже новая таска
	// все то же самое для удаления и редактирования

	return (
		<div>
			<Header
				currentUser={currentUser}
				onLogOut={() => setCurrentUser(undefined)}
			/>
			{!currentUser && (
				<div className={styles.app_container}>
					<Input
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Button onClick={handleRegistrationClick}>
						Зарегистрироваться
					</Button>
					{!!users &&
						users.map((u: SetStateAction<IUser | undefined>) => {
							return (
								<Button
									key={u.id}
									onClick={() => setCurrentUser(u)}
								>
									{u.name}
								</Button>
							);
						})}
				</div>
			)}
			{!!currentUser && (
				<div className={styles.app_container}>
					<Calendar currentUser={currentUser} addTask={addTask} />
				</div>
			)}
		</div>
	);
}

export default App;
