import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

import {
	getFromLocalStorage,
	setToLocalStorage,
} from '../utils/LocalStorageUtils';
import { IBusyDays, IUser } from '../App';

const ToDoUserContext = createContext({} as IUserContext);

interface IProps {
	children: React.ReactNode;
}

interface IUserContext {
	currentUser: IUser;
	users: Array<IUser>;
	setCurrentUser: (newUser: IUser) => void;
	createUser: (newUser: IUser) => void;
}

// const appData = {
// 	users: [{
// 		id:
// 		name:
// 	}]
// };

export const UserProvider = (props: IProps) => {
	const [users, setUsers] = useState<Array<IUser>>([]);
	const [currentUser, setCurrentUser] = useState<IUser | undefined>();

	function getSavedData() {
		const appData = getFromLocalStorage();
		if (appData && appData.users && appData.users.length)
			setUsers(appData.users);
	}

	useEffect(getSavedData, []);

	useEffect(() => {
		setToLocalStorage({
			users: users,
		});
	}, [users]);

	const createUser = useCallback(
		(newUser: IUser): void => {
			const prevUsersList = users || [];
			const newUsersList = [...prevUsersList, newUser];
			setUsers(newUsersList);
		},
		[users]
	);

	const contextValue = useMemo(
		() => ({
			currentUser,
			users,
			setCurrentUser,
			createUser,
		}),
		[currentUser, setCurrentUser, createUser, users]
	);

	return (
		<ToDoUserContext.Provider value={contextValue}>
			{props.children}
		</ToDoUserContext.Provider>
	);
};

export const useUsers = () => {
	return useContext(ToDoUserContext);
};
