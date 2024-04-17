import { writable, type Writable } from 'svelte/store';

export const audio: Writable<HTMLAudioElement> = writable();

export const trackId = writable(0);
export const currentTime = writable(0);
export const duration = writable(0);
export const sliderValue = writable(0);

export const title = writable('');

export const isPlaying = writable(false);
export const isLooped = writable(false);
export const isShuffled = writable(false);
export const isLoading = writable(true);
export const isDrawerOpen = writable(false);
