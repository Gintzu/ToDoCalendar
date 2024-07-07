export interface IUser {
	id: string;
	name: string;
	busyDays: IBusyDays;
}

export interface IBusyDays {
	[key: string]: Array<ITask>;
}

// export interface ITaskList {
//     date: Date
//     tasks: Array<ITask>
// }

export interface ITask {
	id: string;
	title: string;
	description: string;
	completed: boolean;
}
