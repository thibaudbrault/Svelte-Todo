export const debounce = (callback: () => void, wait = 300) => {
	let timeout: ReturnType<typeof setTimeout>;

	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => callback(...args), wait);
	};
};
