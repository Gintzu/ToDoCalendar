import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { ITask } from '../utils/interfaces';

const ToDoContext = createContext({} as IToDo);

interface IProps {
	children: React.ReactNode;
}

export const ToDoProvider = (props: IProps) => {
	const [tasks, setTasks] = useState<Array<ITask>>([]);

	useEffect(() => {
		const savedTasks = getFromLocalStorage();
		if (savedTasks.length) setTasks(savedTasks);
	}, []);

	useEffect(() => {
		setToLocalStorage(tasks);
	}, [tasks]);

	const addTask = useCallback((t: ITask) => {
		setTasks((prev) => [...prev, t]);
	}, []);

	const updateTask = useCallback((t: ITask, idx: number) => {
		setTasks((prev) => {
			const updatedList = [...prev];
			updatedList[idx] = t;
			return updatedList;
		});
	}, []);

	const deleteTask = useCallback((idx: number) => {
		setTasks((prev) => {
			const updatedList = [...prev];
			if (idx > -1) {
				updatedList.splice(idx, 1);
			}
			return updatedList;
		});
	}, []);

	const contextValue = useMemo(
		() => ({
			tasks,
			addTask,
			updateTask,
			deleteTask,
		}),
		[tasks, addTask, updateTask, deleteTask]
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
