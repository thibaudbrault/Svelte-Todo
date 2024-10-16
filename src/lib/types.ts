import type { Album, Author, Game, Music, Playlist } from './db';

export type MusicStore = Music & {
	authors: {
		author: Author;
	}[];
	playlists: {
		playlistId: Playlist['id'];
	}[];
};

export type AlbumsWithGames = Album & {
	games: Game;
};

export type PlaylistWithMusics = Playlist & {
	musics: {
		music: Music & {
			authors: {
				author: Author;
			}[];
			album: {
				cover: Album['cover'];
			};
		};
	}[];
};

export type ModifiedPlaylistWithMusics = Playlist & {
	musics: Music &
		{
			authors: {
				author: Author;
			}[];
			album: {
				cover: Album['cover'];
			};
		}[];
};

export type ScrollDir = 'prev' | 'next';
