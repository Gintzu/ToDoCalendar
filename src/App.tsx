import styles from './App.module.css';
import { useState, useEffect } from 'react';
import { Button } from './components/Button/Button';
import { Calendar } from './components/Calendar/Calendar';
import { Header } from './components/Calendar/Header/Header';
import { Input } from './components/Input/Input';
import { USERS_STORAGE_KEY } from './utils/constants';
import { IUser, ITask } from './utils/interfaces';

function App() {
	const [users, setUsers] = useState<Array<IUser>>();
	const [name, setName] = useState('');
	const [currentUser, setCurrentUser] = useState<IUser | undefined>();
	//const [isOpenedForm, setIsOpenedForm] = useState(false)

	useEffect(() => {
		const rawData = localStorage.getItem(USERS_STORAGE_KEY) || '[]';
		const parsedData = JSON.parse(rawData);
		if (!parsedData) {
			return;
		}
		setUsers(parsedData);
	}, []);

	const createUser = (newUser: IUser): void => {
		const prevUsersList = users || [];
		const newUsersList = [...prevUsersList, newUser];
		localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(newUsersList));
		setUsers(newUsersList);
	};

	const handleRegistrationClick = () => {
		if (!name) return;
		const newUser = {
			id: String(Math.random()),
			name: name,
			busyDays: {},
		};
		createUser(newUser);
		setCurrentUser(newUser);
	};
	// создать, сохранить в стейте куррент юзер + обновить локал сторадж + обновить стейт в Календарь тсх который рендерит модалку.
	// чтобы в модалке сразу появлась новая таска
	// все то же самое для удаления и редактирования

	const addTask = (dayId: string, taskData: ITask) => {
		setCurrentUser({
			...currentUser,

			busyDays: {
				...prevUserData.busyDays,

				[dayId]: [prevUserData?.busyDays[dayId], taskData],
			},
		});
	};

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
						users.map((u) => {
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
