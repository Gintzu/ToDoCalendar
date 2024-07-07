/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { createPortal } from 'react-dom';
import {
	DAYS_IN_MONTH,
	LEAP_YEAR_DAYS_IN_MONTH,
	MONTHS,
	WEEK_DAYS,
} from '../../utils/constants';
import { IUser, ITask } from '../../utils/interfaces';
import { Modal } from '../Modal/Modal';
import styles from './Calendar.module.css';

interface ICalendar {
	currentUser: IUser;
	addTask: (dayId: string, taskData: ITask) => void;
}

export const Calendar = (props: ICalendar) => {
	//const [calendarMatrix, setCalendarMatrix] = useState<any>([]);
	const [currentDayData, setCurrentDayData] = useState<any>();

	const {
		currentUser: { busyDays },
		addTask,
	} = props;

	const today = new Date();
	const currentMonth = today.getMonth();
	const currentYear = today.getFullYear();
	//const currentDate = today.getDate();

	function getFirstDayOfMonth(year: number, month: number) {
		return new Date(year, month, 1);
	}

	const firstDay = getFirstDayOfMonth(today.getFullYear(), today.getMonth());

	const firstWeekDay = firstDay.getDay();

	function isLeapYear(year: number) {
		return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	}

	const fillCurrentCalendarMatrix = (monthIndex: number, year: number) => {
		const monthLength = isLeapYear(year)
			? LEAP_YEAR_DAYS_IN_MONTH[monthIndex + 1]
			: DAYS_IN_MONTH[monthIndex + 1];
		const prevMonthLength = isLeapYear(year)
			? LEAP_YEAR_DAYS_IN_MONTH[monthIndex]
			: DAYS_IN_MONTH[monthIndex];
		// const nextMonthLength = isLeapYear(year) ? LEAP_YEAR_DAYS[monthIndex + 2] : DAYS[monthIndex + 2];
		const temp = [];

		for (let i = 0; i <= monthLength; i++) {
			const dayId = `${year}-${monthIndex + 1}-${i}`;

			const prevMonthDayId = `${year}-${monthIndex}-${
				prevMonthLength - (firstWeekDay - i)
			}`;
			// const nextMonthDayId = `${year}-${monthIndex}-${nextMonthLength - (firstWeekDay + i + 1)}`;
			if (i < firstWeekDay) {
				// Заполняем днями из предыдущего месяца
				temp[i] = {
					id: prevMonthDayId,
					tasks: busyDays[prevMonthDayId],
				};
				continue;
			}
			//	Заполняем днями из следующего месяца
			// if (i > monthLength) {
			// 	temp[i] = {
			// 		id: nextMonthDayId,
			// 		tasks: mockBusyDays[nextMonthDayId]
			// 	};
			// 	continue;
			// }
			// Заполняем днями из текущего месяца
			temp[i] = {
				id: dayId,
				tasks: busyDays[dayId],
			};
		}
		return temp;
	};

	const renderCalendarHeader = (dayName: string, pos: number) => {
		return <th key={pos}>{dayName}</th>;
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const renderCalendarBody = (day: any[]) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any

		const renderWeek = (day: any[]) => {
			//возвращает 7 td из матрицы (day[i])
			return day.map((element: any) => {
				return (
					<td>
						<div
							className={styles.day}
							onClick={() => setCurrentDayData(element)}
						>
							<div className={styles.alignRight}>
								<span>{element.id.split('-')[2]}</span>
							</div>
							{element.tasks && !!element.tasks.length && (
								<ul>
									{element.tasks
										.filter(Boolean)
										.map((task: ITask, index: number) => {
											if (index > 3) return;
											if (index === 3) {
												return (
													<li>
														+
														{element.tasks.length -
															index}
													</li>
												);
											}
											return <li>{task.title}</li>;
										})}
								</ul>
							)}
						</div>
					</td>
				);
			});
		};
		const wholeCalendar = [];
		for (let i = 0; i < day.length; i = i + 7) {
			const weekSlice = day.slice(i, i + 7);
			wholeCalendar.push(<tr>{renderWeek(weekSlice)}</tr>);
		}
		return wholeCalendar;
	};
	const [value, setValue] = useState<string>();

	return (
		<div
			className={styles.modalBackdrop}
			onClick={() => {
				if (currentDayData) setCurrentDayData(undefined);
			}}
		>
			<div onClick={(e) => e.stopPropagation()}>
				{!!currentDayData &&
					createPortal(
						<Modal onClose={() => setCurrentDayData(undefined)}>
							<div>
								{currentDayData.tasks &&
									!!currentDayData.tasks.length && (
										<>
											<ul>
												{currentDayData.tasks.map(
													(task: ITask) => {
														return (
															<li>
																{task.title}
															</li>
														);
													}
												)}
											</ul>
										</>
									)}
								<div>
									<input
										value={value}
										onChange={(e: any) =>
											setValue(e.target.value)
										}
									/>
									<button
										onClick={(e) => {
											e.stopPropagation();
											addTask(currentDayData.id, {
												id: `${value}+${Math.random()}`,
												title: value || 'Без названия',
												description: value || '',
												completed: false,
											});
										}}
									>
										{' '}
										Добавить таску
									</button>
								</div>
							</div>
							{/* <TaskForm /> */}
						</Modal>,
						document.body
					)}
			</div>
			<div className={styles.calendar}>
				<div className={styles.header}>
					<h2>{MONTHS[currentMonth]}</h2>
				</div>
				<table>
					<thead>{WEEK_DAYS.map(renderCalendarHeader)}</thead>
					<tbody>
						{renderCalendarBody(
							fillCurrentCalendarMatrix(currentMonth, currentYear)
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};
