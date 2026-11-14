import { create } from "zustand";
import { Song } from "@/types";
import { useChatStore } from "./useChatStore";

interface PlayerStore {
	currentSong: Song | null;
	isPlaying: boolean;
	queue: Song[];
	currentIndex: number;
	isShuffle: boolean;
	repeatMode: "off" | "all" | "one";

	initializeQueue: (songs: Song[]) => void;
	playAlbum: (songs: Song[], startIndex?: number) => void;
	setCurrentSong: (song: Song | null) => void;
	togglePlay: () => void;
	toggleShuffle: () => void;
	toggleRepeat: () => void;
	playNext: () => void;
	playPrevious: () => void;
}

const syncActivity = (activity: string) => {
	try {
		const socket = useChatStore.getState().socket;
		if (socket?.auth?.userId) {
			socket.emit("update_activity", {
				userId: socket.auth.userId,
				activity,
			});
		}
	} catch (err) {
		console.warn("Could not sync activity with chat socket", err);
	}
};

export const usePlayerStore = create<PlayerStore>((set, get) => ({
	currentSong: null,
	isPlaying: false,
	queue: [],
	currentIndex: -1,
	isShuffle: false,
	repeatMode: "off",

	toggleShuffle: () => {
		set((state) => ({ isShuffle: !state.isShuffle }));
	},

	toggleRepeat: () => {
		set((state) => {
			if (state.repeatMode === "off") return { repeatMode: "all" };
			if (state.repeatMode === "all") return { repeatMode: "one" };
			return { repeatMode: "off" };
		});
	},

	initializeQueue: (songs: Song[]) => {
		if (songs.length === 0) return;
		set({
			queue: songs,
			currentSong: get().currentSong || songs[0],
			currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
		});
	},

	playAlbum: (songs: Song[], startIndex = 0) => {
		if (songs.length === 0) return;

		const song = songs[startIndex];
		syncActivity(`Playing ${song.title} by ${song.artist}`);

		set({
			queue: songs,
			currentSong: song,
			currentIndex: startIndex,
			isPlaying: true,
		});
	},

	setCurrentSong: (song: Song | null) => {
		if (!song) return;

		syncActivity(`Playing ${song.title} by ${song.artist}`);

		const currentQueue = get().queue;
		let songIndex = currentQueue.findIndex((s) => s._id === song._id);
		let updatedQueue = currentQueue;

		if (songIndex === -1) {
			updatedQueue = [...currentQueue, song];
			songIndex = updatedQueue.length - 1;
		}

		set({
			queue: updatedQueue,
			currentSong: song,
			isPlaying: true,
			currentIndex: songIndex,
		});
	},

	togglePlay: () => {
		const willStartPlaying = !get().isPlaying;
		const currentSong = get().currentSong;

		syncActivity(
			willStartPlaying && currentSong ? `Playing ${currentSong.title} by ${currentSong.artist}` : "Idle"
		);

		set({
			isPlaying: willStartPlaying,
		});
	},

	playNext: () => {
		const { currentIndex, queue, isShuffle, repeatMode, currentSong } = get();
		if (queue.length === 0) {
			set({ isPlaying: false });
			return;
		}

		// Single song repeat handled directly
		if (repeatMode === "one" && currentSong) {
			set({ isPlaying: true });
			return;
		}

		// Shuffle mode
		if (isShuffle && queue.length > 1) {
			let randomIndex = Math.floor(Math.random() * queue.length);
			if (randomIndex === currentIndex) {
				randomIndex = (randomIndex + 1) % queue.length;
			}
			const nextSong = queue[randomIndex];
			syncActivity(`Playing ${nextSong.title} by ${nextSong.artist}`);
			set({
				currentSong: nextSong,
				currentIndex: randomIndex,
				isPlaying: true,
			});
			return;
		}

		const nextIndex = currentIndex + 1;

		if (nextIndex < queue.length) {
			const nextSong = queue[nextIndex];
			syncActivity(`Playing ${nextSong.title} by ${nextSong.artist}`);
			set({
				currentSong: nextSong,
				currentIndex: nextIndex,
				isPlaying: true,
			});
		} else if (repeatMode === "all") {
			// Loop back to beginning
			const firstSong = queue[0];
			syncActivity(`Playing ${firstSong.title} by ${firstSong.artist}`);
			set({
				currentSong: firstSong,
				currentIndex: 0,
				isPlaying: true,
			});
		} else {
			// No more songs
			set({ isPlaying: false });
			syncActivity("Idle");
		}
	},

	playPrevious: () => {
		const { currentIndex, queue, repeatMode } = get();
		if (queue.length === 0) return;

		const prevIndex = currentIndex - 1;

		if (prevIndex >= 0) {
			const prevSong = queue[prevIndex];
			syncActivity(`Playing ${prevSong.title} by ${prevSong.artist}`);
			set({
				currentSong: prevSong,
				currentIndex: prevIndex,
				isPlaying: true,
			});
		} else if (repeatMode === "all") {
			const lastIndex = queue.length - 1;
			const lastSong = queue[lastIndex];
			syncActivity(`Playing ${lastSong.title} by ${lastSong.artist}`);
			set({
				currentSong: lastSong,
				currentIndex: lastIndex,
				isPlaying: true,
			});
		} else {
			set({ isPlaying: false });
			syncActivity("Idle");
		}
	},
}));
