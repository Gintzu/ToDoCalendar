import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { ITask } from '../utils/interfaces';
import { useUsers } from './userProvider';

const ToDoContext = createContext({} as IContext);

interface IProps {
	children: React.ReactNode;
}

interface IContext {
	addTask: (dayId: string, taskData: ITask) => void;
}

export const ToDoProvider = (props: IProps) => {
	const { setCurrentUser } = useUsers();
	const addTask = useCallback(
		(dayId: string, taskData: ITask) => {
			//@ts-expect-error
			setCurrentUser((prevUserData: IUser) => {
				const mergeTasks = () => {
					if (prevUserData.busyDays[dayId]) {
						return [...prevUserData.busyDays[dayId], taskData];
					}
					return [taskData];
				};
				return {
					...prevUserData,
					busyDays: {
						...prevUserData.busyDays,
						[dayId]: mergeTasks(),
					},
				};
			});
		},
		[setCurrentUser]
	);

	/**
	 * updateTask (dayId, taskId, newData) изменяет конкретную задачу в конкретном дне, setCurrentUser
	 * deleteTask - удаляет задачу
	 */

	// const updateTask = useCallback((t: TTask, idx: number) => {
	// 	setTasks((prev) => {
	// 		const updatedList = [...prev];
	// 		updatedList[idx] = t;
	// 		return updatedList;
	// 	});
	// }, []);

	// const deleteTask = useCallback((idx: number) => {
	// 	setTasks((prev) => {
	// 		const updatedList = [...prev];
	// 		if (idx > -1) {
	// 			updatedList.splice(idx, 1);
	// 		}
	// 		return updatedList;
	// 	});
	// }, []);

	const contextValue = useMemo(
		() => ({
			addTask,
			//updateTask,
			//deleteTask,
		}),
		[addTask] //updateTask, deleteTask]
	);

	return (
		<ToDoContext.Provider value={contextValue}>
			{props.children}
		</ToDoContext.Provider>
	);
};

export const useToDo = () => {
	return useContext(ToDoContext);
};
