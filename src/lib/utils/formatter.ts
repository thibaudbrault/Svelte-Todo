import type { SelectMusic } from '$lib/db';

export const format = (seconds: number): string => {
	if (isNaN(seconds)) return '0:00';

	const minutes: number = Math.floor(seconds / 60);
	seconds = Math.round(seconds % 60);
	if (seconds < 10)
		seconds = String(seconds).padStart(2, '0') as unknown as number;
	return `${minutes}:${seconds}`;
};

export const calculateTotalDuration = (musics: SelectMusic[]) => {
	let totalDurationSeconds = 0;
	for (const track of musics) {
		totalDurationSeconds += track.duration;
	}
	return totalDurationSeconds;
};

export const formatTotalDuration = (totalSeconds: number) => {
	const totalHours = Math.floor(totalSeconds / 3600);
	const remainingSeconds = totalSeconds % 3600;
	let totalMinutes = Math.floor(remainingSeconds / 60);
	if (totalMinutes < 10)
		totalMinutes = String(totalMinutes).padStart(2, '0') as unknown as number;
	if (totalHours === 0) {
		return `${totalMinutes} minutes`;
	} else {
		return `${totalHours}h ${totalMinutes}`;
	}
};

export const renameFileWithExtension = (fileName: string, newName: string) => {
	const splitFileName = fileName.split('.');
	const extension = splitFileName.pop();
	const newFileName = newName + '.' + extension;
	return newFileName;
};
