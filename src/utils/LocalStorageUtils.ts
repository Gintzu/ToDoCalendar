import { LOCAL_STORAGE_KEY } from './constants';

export const getFromLocalStorage = () => {
	const rawData = localStorage.getItem(LOCAL_STORAGE_KEY);

	const res = JSON.parse(rawData || '{}');
	if (res && typeof res === 'object') {
		return res;
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setToLocalStorage = (data: any) => {
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};
