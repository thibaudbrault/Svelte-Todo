import { writable, type Writable } from 'svelte/store';

export const audio: Writable<HTMLAudioElement> = writable();
export const index = writable(0);
export const currentTime = writable(0);
export const albumLength = writable(0);
export const title = writable('');
export const isPlaying = writable(false);
