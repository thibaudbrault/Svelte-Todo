export const format = (seconds: number): string => {
	if (isNaN(seconds)) return '0:00';

	const minutes: number = Math.floor(seconds / 60);
	seconds = Math.round(seconds % 60);
	if (seconds < 10)
		seconds = String(seconds).padStart(2, '0') as unknown as number;

	return `${minutes}:${seconds}`;
};
