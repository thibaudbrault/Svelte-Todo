import { writable, type Writable } from 'svelte/store';
import type { MusicStore } from './types';

export const audio: Writable<HTMLAudioElement> = writable();
export const musics: Writable<MusicStore[]> = writable([]);
export const favoritesMusics: Writable<Set<string>> = writable(new Set());
export const favoritesAlbums: Writable<Set<string>> = writable(new Set());
export const authors: Writable<MusicStore['authors']> = writable([]);

export const trackId = writable(0);
export const currentTime = writable(0);
export const duration = writable(0);
export const length = writable(0);
export const sliderValue = writable(0);

export const title = writable('');
export const cover = writable('');

export const isPlaying = writable(false);
export const isLooped = writable(false);
export const isShuffled = writable(false);
export const isLoading = writable(true);
export const isPlayerOpen = writable(false);
export const isZen = writable(false);
