export const getFromLocalStorage = (key: string) => {
	const res = JSON.parse(localStorage.getItem(key) || '');
	if (res && typeof res === 'object') {
		return res;
	}
	return;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setToLocalStorage = (key: string, data: any) => {
	localStorage.setItem(key, JSON.stringify(data));
};
