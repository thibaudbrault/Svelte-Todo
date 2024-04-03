import type { SelectMusic } from '$lib/db';
import {
	audio,
	currentTime,
	isLoading,
	isLooped,
	isPlaying,
	isShuffled,
	showPlayer,
	sliderValue,
	title,
	trackId,
} from '$lib/store';
import { get } from 'svelte/store';

export const scrollIntoView = (currentTrackId: number) => {
	const track = document.getElementById(`track-${currentTrackId}`);
	track?.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

export const loadTrack = (musics: SelectMusic[], length: number) => {
	isLoading.set(true);
	sliderValue.set(0);
	if (length > 0) {
		title.set(musics[get(trackId)]?.name);
		audio.update(($audio) => {
			$audio.src = musics[get(trackId)]?.url;
			$audio.load();
			if (get(isPlaying)) {
				$audio.play();
			}
			return $audio;
		});
		showPlayer.set(true);
	}
};

export const handlePlaying = (raf: number) => {
	sliderValue.set(get(audio).currentTime);
	currentTime.set(get(sliderValue));
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	raf = requestAnimationFrame(handlePlaying);
};

export const playPauseTrack = (raf: number) => {
	if (get(isPlaying)) {
		audio.update(($audio) => {
			$audio.pause();
			return $audio;
		});
		isPlaying.set(false);
		cancelAnimationFrame(raf);
	} else {
		audio.update(($audio) => {
			$audio.play();
			return $audio;
		});
		isPlaying.set(true);
		requestAnimationFrame(handlePlaying);
	}
};

export const prevTrack = (musics: SelectMusic[], length: number) => {
	currentTime.set(0);
	let currentTrackId = get(trackId);
	if (get(isShuffled)) {
		trackId.set(Math.floor(Math.random() * length));
	} else if (get(isLooped)) {
		trackId.set(get(trackId));
	} else {
		if (get(trackId) > 0) {
			trackId.set((currentTrackId -= 1));
			scrollIntoView(currentTrackId);
		} else {
			trackId.set(length - 1);
			scrollIntoView(currentTrackId);
		}
	}
	loadTrack(musics, length);
	switchTrack();
};

export const nextTrack = (musics: SelectMusic[], length: number) => {
	currentTime.set(0);
	let currentTrackId = get(trackId);
	if (get(isShuffled)) {
		trackId.set(Math.floor(Math.random() * length));
	} else if (get(isLooped)) {
		trackId.set(get(trackId));
	} else {
		if (get(trackId) < length - 1) {
			trackId.set((currentTrackId += 1));
			scrollIntoView(currentTrackId);
		} else {
			trackId.set(0);
			scrollIntoView(currentTrackId);
		}
	}
	loadTrack(musics, length);
	switchTrack();
};

export const switchTrack = () => {
	if (get(isPlaying)) {
		audio.update(($audio) => {
			$audio.play();
			return $audio;
		});
	}
};
