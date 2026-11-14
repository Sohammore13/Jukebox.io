import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const prevSongRef = useRef<string | null>(null);

	const { currentSong, isPlaying, playNext, repeatMode, togglePlay, playPrevious } = usePlayerStore();

	// handle play/pause logic
	useEffect(() => {
		if (!audioRef.current) return;
		if (isPlaying) {
			audioRef.current.play().catch((err) => {
				console.warn("Audio playback interrupted or blocked:", err.message);
			});
		} else {
			audioRef.current.pause();
		}
	}, [isPlaying]);

	// handle song ends - ONLY location where ended event is handled!
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const handleEnded = () => {
			if (repeatMode === "one") {
				audio.currentTime = 0;
				audio.play().catch(() => {});
			} else {
				playNext();
			}
		};

		audio.addEventListener("ended", handleEnded);
		return () => audio.removeEventListener("ended", handleEnded);
	}, [playNext, repeatMode]);

	// handle song changes
	useEffect(() => {
		if (!audioRef.current || !currentSong) return;

		const audio = audioRef.current;
		const isSongChange = prevSongRef.current !== currentSong.audioUrl;

		if (isSongChange) {
			audio.src = currentSong.audioUrl;
			audio.currentTime = 0;
			prevSongRef.current = currentSong.audioUrl;

			if (isPlaying) {
				audio.play().catch((err) => {
					console.warn("Audio autoplay blocked or interrupted:", err.message);
				});
			}
		}
	}, [currentSong, isPlaying]);

	// Browser Media Session API integration
	useEffect(() => {
		if (!("mediaSession" in navigator) || !currentSong) return;

		navigator.mediaSession.metadata = new MediaMetadata({
			title: currentSong.title,
			artist: currentSong.artist,
			artwork: [
				{
					src: currentSong.imageUrl,
					sizes: "512x512",
					type: "image/jpeg",
				},
			],
		});

		navigator.mediaSession.setActionHandler("play", () => {
			if (!isPlaying) togglePlay();
		});
		navigator.mediaSession.setActionHandler("pause", () => {
			if (isPlaying) togglePlay();
		});
		navigator.mediaSession.setActionHandler("nexttrack", () => {
			playNext();
		});
		navigator.mediaSession.setActionHandler("previoustrack", () => {
			playPrevious();
		});
	}, [currentSong, isPlaying, togglePlay, playNext, playPrevious]);

	return <audio ref={audioRef} />;
};

export default AudioPlayer;
