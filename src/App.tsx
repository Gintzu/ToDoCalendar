import { useState, useEffect } from 'react';
import './App.module.css';
import { Button } from './components/Button/Button';
import { USERS_STORAGE_KEY } from './utils/constants';
import { IUser } from './utils/interfaces';
import { Header } from './components/Calendar/Header/Header';

function App() {
	const [users, setUsers] = useState<Array<IUser>>();
	const [name, setName] = useState('');
	const [currentUser, setCurrentUser] = useState<IUser | undefined>();

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

	if (!users || !users.length) {
		return (
			<div className="appContainer">
				<input value={name} onChange={(e) => setName(e.target.value)} />
				<Button onClick={handleRegistrationClick}>Регистрация</Button>
			</div>
		);
	}
	if (currentUser) {
		return (
			<div>
				<Header
					currentUser={currentUser}
					onLogOut={() => setCurrentUser(undefined)}
				/>
				<Button onClick={() => setCurrentUser(undefined)}>Выход</Button>
			</div>
		);
	}

	// return (
	// 	<>
	// 		<div>Calendar_app</div>
	// 		<div className="appContainer">Текущий пользователь: name</div>
	// 	</>
	// );
}

export default App;
