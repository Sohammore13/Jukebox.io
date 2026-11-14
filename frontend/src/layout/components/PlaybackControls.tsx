import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/stores/usePlayerStore";
import {
	Heart,
	ListMusic,
	Mic2,
	Pause,
	Play,
	Repeat,
	Repeat1,
	Shuffle,
	SkipBack,
	SkipForward,
	Volume1,
	Volume2,
	VolumeX,
	Radio,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AnimatedEqualizer from "@/components/AnimatedEqualizer";

const formatTime = (seconds: number) => {
	if (isNaN(seconds)) return "0:00";
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const PlaybackControls = () => {
	const { currentSong, isPlaying, togglePlay, playNext, playPrevious, queue } = usePlayerStore();

	const [volume, setVolume] = useState(75);
	const [prevVolume, setPrevVolume] = useState(75);
	const [isMuted, setIsMuted] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [isShuffle, setIsShuffle] = useState(false);
	const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off");
	const [isLiked, setIsLiked] = useState(false);
	const [showQueue, setShowQueue] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		audioRef.current = document.querySelector("audio");

		const audio = audioRef.current;
		if (!audio) return;

		const updateTime = () => setCurrentTime(audio.currentTime);
		const updateDuration = () => setDuration(audio.duration);

		audio.addEventListener("timeupdate", updateTime);
		audio.addEventListener("loadedmetadata", updateDuration);

		const handleEnded = () => {
			if (repeatMode === "one") {
				audio.currentTime = 0;
				audio.play();
			} else {
				playNext();
			}
		};

		audio.addEventListener("ended", handleEnded);

		return () => {
			audio.removeEventListener("timeupdate", updateTime);
			audio.removeEventListener("loadedmetadata", updateDuration);
			audio.removeEventListener("ended", handleEnded);
		};
	}, [currentSong, playNext, repeatMode]);

	const handleSeek = (value: number[]) => {
		if (audioRef.current) {
			audioRef.current.currentTime = value[0];
		}
	};

	const toggleMute = () => {
		if (!audioRef.current) return;
		if (isMuted) {
			audioRef.current.volume = prevVolume / 100;
			setVolume(prevVolume);
			setIsMuted(false);
		} else {
			setPrevVolume(volume);
			audioRef.current.volume = 0;
			setVolume(0);
			setIsMuted(true);
		}
	};

	const toggleRepeat = () => {
		if (repeatMode === "off") setRepeatMode("all");
		else if (repeatMode === "all") setRepeatMode("one");
		else setRepeatMode("off");
	};

	return (
		<footer className='relative h-22 sm:h-24 bg-[#0B0F1F]/90 backdrop-blur-2xl border-t border-[#9B5CFF]/20 px-4 sm:px-6 z-40 select-none shadow-[0_-10px_35px_rgba(155,92,255,0.12)]'>
			{/* Ambient Top Lighting Line */}
			<div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#9B5CFF]/50 to-transparent' />

			{/* Queue Drawer Popover */}
			{showQueue && (
				<div className='absolute bottom-full right-4 mb-3 w-80 max-h-96 rounded-2xl glass-panel border border-[#9B5CFF]/30 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl z-50 flex flex-col'>
					<div className='flex items-center justify-between pb-3 border-b border-white/10'>
						<div className='flex items-center gap-2 text-sm font-bold text-white'>
							<ListMusic className='size-4 text-[#32D9FF]' />
							<span>Playback Queue ({queue.length})</span>
						</div>
						<button
							onClick={() => setShowQueue(false)}
							className='text-xs text-[#94A3B8] hover:text-white'
						>
							Close
						</button>
					</div>

					<div className='overflow-y-auto max-h-72 space-y-1.5 pt-3 pr-1'>
						{queue.map((song, i) => (
							<div
								key={song._id + i}
								onClick={() => usePlayerStore.getState().setCurrentSong(song)}
								className={`p-2 rounded-xl flex items-center gap-3 transition-colors cursor-pointer ${
									currentSong?._id === song._id
										? "bg-[#9B5CFF]/20 border border-[#9B5CFF]/40 text-[#32D9FF]"
										: "hover:bg-white/5 text-white"
								}`}
							>
								<img
									src={song.imageUrl}
									alt={song.title}
									className='size-9 rounded-lg object-cover'
								/>
								<div className='flex-1 min-w-0'>
									<p className='text-xs font-semibold truncate'>{song.title}</p>
									<p className='text-[10px] text-[#94A3B8] truncate'>{song.artist}</p>
								</div>
								{currentSong?._id === song._id && isPlaying && (
									<AnimatedEqualizer size='sm' isPlaying={isPlaying} />
								)}
							</div>
						))}
					</div>
				</div>
			)}

			<div className='flex justify-between items-center h-full max-w-[1800px] mx-auto gap-4'>
				{/* 1. Currently Playing Song Column */}
				<div className='flex items-center gap-3.5 min-w-[200px] w-[30%]'>
					{currentSong ? (
						<>
							<div className='relative size-14 sm:size-15 shrink-0 rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.5)] border border-[#9B5CFF]/30 group'>
								<img
									src={currentSong.imageUrl}
									alt={currentSong.title}
									className='size-full object-cover group-hover:scale-105 transition-transform'
								/>
								{isPlaying && (
									<div className='absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/60 backdrop-blur-xs'>
										<AnimatedEqualizer size='sm' isPlaying={isPlaying} />
									</div>
								)}
							</div>

							<div className='flex-1 min-w-0'>
								<div className='font-bold text-sm text-white truncate hover:text-[#32D9FF] cursor-pointer transition-colors'>
									{currentSong.title}
								</div>
								<div className='text-xs text-[#94A3B8] truncate hover:underline cursor-pointer mt-0.5 flex items-center gap-1.5'>
									<span>{currentSong.artist}</span>
									<span className='size-1 rounded-full bg-[#9B5CFF]' />
									<span className='text-[10px] text-[#32D9FF] font-semibold uppercase'>Lossless</span>
								</div>
							</div>

							<button
								onClick={() => setIsLiked(!isLiked)}
								className={`size-8 rounded-full flex items-center justify-center transition-colors shrink-0 ${
									isLiked
										? "text-[#FF5CA8] drop-shadow-[0_0_8px_rgba(255,92,168,0.7)]"
										: "text-[#94A3B8] hover:text-white"
								}`}
							>
								<Heart className={`size-4 ${isLiked ? "fill-current" : ""}`} />
							</button>
						</>
					) : (
						<div className='flex items-center gap-3 text-xs text-[#94A3B8]'>
							<Radio className='size-4 text-[#9B5CFF] animate-pulse' />
							<span>Select an aurora track to stream</span>
						</div>
					)}
				</div>

				{/* 2. Main Player Controls & Progress Bar */}
				<div className='flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[44%]'>
					{/* Control Buttons */}
					<div className='flex items-center gap-3 sm:gap-5'>
						<button
							onClick={() => setIsShuffle(!isShuffle)}
							title='Shuffle'
							className={`p-2 rounded-full transition-all ${
								isShuffle
									? "text-[#32D9FF] drop-shadow-[0_0_8px_rgba(50,217,255,0.8)]"
									: "text-[#94A3B8] hover:text-white"
							}`}
						>
							<Shuffle className='size-4' />
						</button>

						<button
							onClick={playPrevious}
							disabled={!currentSong}
							title='Previous'
							className='p-2 rounded-full text-[#CBD5E1] hover:text-white disabled:opacity-40 hover:scale-110 active:scale-95 transition-all'
						>
							<SkipBack className='size-5 fill-current' />
						</button>

						{/* Primary Play/Pause Glowing Button */}
						<button
							onClick={togglePlay}
							disabled={!currentSong}
							title={isPlaying ? "Pause" : "Play"}
							className='size-11 sm:size-12 rounded-full bg-gradient-to-r from-[#9B5CFF] via-[#7B42FF] to-[#32D9FF] text-white flex items-center justify-center shadow-[0_0_20px_rgba(155,92,255,0.6)] hover:shadow-[0_0_30px_rgba(50,217,255,0.8)] hover:scale-108 active:scale-95 transition-all duration-300 disabled:opacity-40'
						>
							{isPlaying ? (
								<Pause className='size-5 fill-current' />
							) : (
								<Play className='size-5 fill-current ml-0.5' />
							)}
						</button>

						<button
							onClick={playNext}
							disabled={!currentSong}
							title='Next'
							className='p-2 rounded-full text-[#CBD5E1] hover:text-white disabled:opacity-40 hover:scale-110 active:scale-95 transition-all'
						>
							<SkipForward className='size-5 fill-current' />
						</button>

						<button
							onClick={toggleRepeat}
							title={`Repeat: ${repeatMode}`}
							className={`p-2 rounded-full transition-all ${
								repeatMode !== "off"
									? "text-[#FF5CA8] drop-shadow-[0_0_8px_rgba(255,92,168,0.8)]"
									: "text-[#94A3B8] hover:text-white"
							}`}
						>
							{repeatMode === "one" ? (
								<Repeat1 className='size-4' />
							) : (
								<Repeat className='size-4' />
							)}
						</button>
					</div>

					{/* Seekable Progress Bar */}
					<div className='flex items-center gap-3 w-full'>
						<span className='text-[11px] font-mono text-[#94A3B8] w-9 text-right'>
							{formatTime(currentTime)}
						</span>
						<Slider
							value={[currentTime]}
							max={duration || 100}
							step={1}
							className='w-full hover:cursor-grab active:cursor-grabbing'
							onValueChange={handleSeek}
						/>
						<span className='text-[11px] font-mono text-[#94A3B8] w-9'>
							{formatTime(duration)}
						</span>
					</div>
				</div>

				{/* 3. Volume & Utility Controls */}
				<div className='hidden sm:flex items-center gap-3 min-w-[200px] w-[30%] justify-end'>
					<button
						onClick={() => alert("Lyrics synchronizer connecting to Aurora lyrics service 🎙️")}
						title='Lyrics'
						className='p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors'
					>
						<Mic2 className='size-4' />
					</button>

					<button
						onClick={() => setShowQueue(!showQueue)}
						title='Queue'
						className={`p-2 rounded-xl transition-colors ${
							showQueue
								? "bg-[#9B5CFF]/20 text-[#32D9FF] border border-[#32D9FF]/40 shadow-[0_0_12px_rgba(50,217,255,0.3)]"
								: "text-[#94A3B8] hover:text-white hover:bg-white/5"
						}`}
					>
						<ListMusic className='size-4' />
					</button>

					{/* Volume Slider with Mute */}
					<div className='flex items-center gap-2 pl-2 border-l border-white/10'>
						<button
							onClick={toggleMute}
							title={isMuted ? "Unmute" : "Mute"}
							className='text-[#94A3B8] hover:text-white transition-colors'
						>
							{isMuted || volume === 0 ? (
								<VolumeX className='size-4 text-[#FF5CA8]' />
							) : volume < 50 ? (
								<Volume1 className='size-4' />
							) : (
								<Volume2 className='size-4 text-[#32D9FF]' />
							)}
						</button>

						<Slider
							value={[isMuted ? 0 : volume]}
							max={100}
							step={1}
							className='w-24 hover:cursor-grab active:cursor-grabbing'
							onValueChange={(val) => {
								setVolume(val[0]);
								setIsMuted(val[0] === 0);
								if (audioRef.current) {
									audioRef.current.volume = val[0] / 100;
								}
							}}
						/>
					</div>
				</div>
			</div>
		</footer>
	);
};
