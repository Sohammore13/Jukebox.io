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
	ChevronUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AnimatedEqualizer from "@/components/AnimatedEqualizer";
import toast from "react-hot-toast";

const formatTime = (seconds: number) => {
	if (isNaN(seconds)) return "0:00";
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const PlaybackControls = () => {
	const {
		currentSong,
		isPlaying,
		togglePlay,
		playNext,
		playPrevious,
		queue,
		isShuffle,
		repeatMode,
		toggleShuffle,
		toggleRepeat,
	} = usePlayerStore();

	const [volume, setVolume] = useState(75);
	const [prevVolume, setPrevVolume] = useState(75);
	const [isMuted, setIsMuted] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
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

		return () => {
			audio.removeEventListener("timeupdate", updateTime);
			audio.removeEventListener("loadedmetadata", updateDuration);
		};
	}, [currentSong]);

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

	// Progress percentage for visual feedback
	const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

	return (
		<footer className='relative theme-player backdrop-blur-2xl border-t border-[#9B5CFF]/20 z-40 select-none transition-colors duration-300'>
			{/* Slim Progress Bar at very top of player */}
			<div className='h-0.5 w-full bg-white/5'>
				<div
					className='h-full bg-gradient-to-r from-[#9B5CFF] via-[#7B42FF] to-[#32D9FF] transition-all duration-300'
					style={{ width: `${progressPct}%` }}
				/>
			</div>

			{/* Ambient Top Lighting Line */}
			<div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#9B5CFF]/40 to-transparent' />

			{/* Queue Drawer Popover */}
			{showQueue && (
				<div className='absolute bottom-full right-4 mb-3 w-80 max-h-[420px] rounded-2xl glass-panel border border-[#9B5CFF]/30 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl z-50 flex flex-col'>
					<div className='flex items-center justify-between pb-3 border-b border-white/8'>
						<div className='flex items-center gap-2 text-sm font-bold text-white'>
							<ListMusic className='size-4 text-[#32D9FF]' />
							<span>Queue</span>
							<span className='px-1.5 py-0.5 rounded-full bg-[#9B5CFF]/20 text-[#9B5CFF] text-[10px] font-bold border border-[#9B5CFF]/30'>
								{queue.length}
							</span>
						</div>
						<button
							onClick={() => setShowQueue(false)}
							className='size-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors'
						>
							<ChevronUp className='size-3.5' />
						</button>
					</div>

					<div className='overflow-y-auto max-h-72 space-y-1 pt-3 pr-0.5'>
						{queue.map((song, i) => (
							<div
								key={song._id + i}
								onClick={() => usePlayerStore.getState().setCurrentSong(song)}
								className={`p-2 rounded-xl flex items-center gap-3 transition-all cursor-pointer ${
									currentSong?._id === song._id
										? "bg-[#9B5CFF]/20 border border-[#9B5CFF]/40 text-[#32D9FF]"
										: "hover:bg-white/5 text-white border border-transparent hover:border-white/5"
								}`}
							>
								<div className='relative size-9 shrink-0'>
									<img
										src={song.imageUrl}
										alt={song.title}
										className='size-full rounded-lg object-cover'
									/>
									{currentSong?._id === song._id && isPlaying && (
										<div className='absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center'>
											<AnimatedEqualizer size='sm' isPlaying={isPlaying} />
										</div>
									)}
								</div>
								<div className='flex-1 min-w-0'>
									<p className='text-xs font-semibold truncate'>{song.title}</p>
									<p className='text-[10px] text-[#94A3B8] truncate'>{song.artist}</p>
								</div>
								{currentSong?._id === song._id && (
									<div className='shrink-0'>
										{isPlaying ? (
											<AnimatedEqualizer size='sm' isPlaying={isPlaying} />
										) : (
											<div className='size-1.5 rounded-full bg-[#9B5CFF]' />
										)}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			)}

			{/* Main Player Row */}
			<div className='flex justify-between items-center px-4 sm:px-6 py-3 sm:py-3.5 max-w-[1800px] mx-auto gap-4'>
				{/* 1. Currently Playing Song */}
				<div className='flex items-center gap-3 min-w-[180px] w-[28%]'>
					{currentSong ? (
						<>
							<div className='relative size-13 sm:size-14 shrink-0 rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.5)] border border-[#9B5CFF]/30 group cursor-pointer'>
								<img
									src={currentSong.imageUrl}
									alt={currentSong.title}
									className='size-full object-cover group-hover:scale-105 transition-transform duration-500'
								/>
								{isPlaying && (
									<div className='absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-xs'>
										<AnimatedEqualizer size='sm' isPlaying={isPlaying} />
									</div>
								)}
							</div>

							<div className='flex-1 min-w-0'>
								<div className='font-bold text-sm text-[var(--text-1)] truncate hover:text-[var(--accent-cyan)] cursor-pointer transition-colors leading-tight'>
									{currentSong.title}
								</div>
								<div className='text-xs text-[var(--text-3)] truncate hover:underline cursor-pointer mt-0.5 flex items-center gap-1.5'>
									<span>{currentSong.artist}</span>
									<span className='size-0.5 rounded-full bg-[var(--accent-purple)] shrink-0' />
									<span className='text-[10px] text-[var(--accent-cyan)] font-bold uppercase tracking-wider shrink-0'>
										Lossless
									</span>
								</div>
							</div>

							<button
								onClick={() => setIsLiked(!isLiked)}
								title={isLiked ? "Remove from Liked" : "Add to Liked"}
								className={`size-7 rounded-full flex items-center justify-center transition-all shrink-0 ${
									isLiked
										? "text-[var(--accent-pink)] drop-shadow-[0_0_8px_rgba(190,24,93,0.45)] scale-110"
										: "text-[var(--text-3)] hover:text-[var(--text-1)] hover:scale-110"
								}`}
							>
								<Heart className={`size-3.5 ${isLiked ? "fill-current" : ""}`} />
							</button>
						</>
					) : (
						<div className='flex items-center gap-2.5 text-xs text-[var(--text-3)]'>
							<div className='size-10 rounded-xl bg-[#9B5CFF]/10 border border-[#9B5CFF]/20 flex items-center justify-center'>
								<Radio className='size-4 text-[var(--accent-purple)] animate-pulse' />
							</div>
							<span className='hidden sm:block'>Select a track to stream</span>
						</div>
					)}
				</div>

				{/* 2. Main Player Controls & Progress Bar */}
				<div className='flex flex-col items-center gap-1.5 flex-1 max-w-full sm:max-w-[44%]'>
					{/* Control Buttons */}
					<div className='flex items-center gap-2.5 sm:gap-4'>
						<button
							onClick={toggleShuffle}
							title={isShuffle ? "Shuffle On" : "Shuffle Off"}
							className={`p-2 rounded-full transition-all ${
								isShuffle
									? "text-[var(--accent-cyan)] drop-shadow-[0_0_8px_rgba(50,217,255,0.5)]"
									: "text-[var(--text-3)] hover:text-[var(--text-1)]"
							}`}
						>
							<Shuffle className='size-4' />
						</button>

						<button
							onClick={playPrevious}
							disabled={!currentSong}
							title='Previous'
							className='p-2 rounded-full text-[var(--text-2)] hover:text-[var(--text-1)] disabled:opacity-30 hover:scale-110 active:scale-95 transition-all'
						>
							<SkipBack className='size-5 fill-current' />
						</button>

						{/* Primary Play/Pause Glowing Button */}
						<button
							onClick={togglePlay}
							disabled={!currentSong}
							title={isPlaying ? "Pause" : "Play"}
							className='size-11 sm:size-12 rounded-full bg-gradient-to-r from-[#9B5CFF] via-[#7B42FF] to-[#32D9FF] text-white flex items-center justify-center shadow-[0_0_20px_rgba(155,92,255,0.6)] hover:shadow-[0_0_30px_rgba(50,217,255,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-30'
							style={{ color: "#ffffff" }}
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
							className='p-2 rounded-full text-[var(--text-2)] hover:text-[var(--text-1)] disabled:opacity-30 hover:scale-110 active:scale-95 transition-all'
						>
							<SkipForward className='size-5 fill-current' />
						</button>

						<button
							onClick={toggleRepeat}
							title={`Repeat: ${repeatMode}`}
							className={`p-2 rounded-full transition-all ${
								repeatMode !== "off"
									? "text-[var(--accent-pink)] drop-shadow-[0_0_8px_rgba(255,92,168,0.5)]"
									: "text-[var(--text-3)] hover:text-[var(--text-1)]"
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
					<div className='flex items-center gap-2.5 w-full'>
						<span className='text-[10px] font-mono text-[var(--text-3)] w-8 text-right tabular-nums'>
							{formatTime(currentTime)}
						</span>
						<div className='flex-1 relative group/seek'>
							<Slider
								value={[currentTime]}
								max={duration || 100}
								step={0.5}
								className='w-full hover:cursor-grab active:cursor-grabbing'
								onValueChange={handleSeek}
							/>
						</div>
						<span className='text-[10px] font-mono text-[var(--text-3)] w-8 tabular-nums'>
							{formatTime(duration)}
						</span>
					</div>
				</div>

				{/* 3. Volume & Utility Controls */}
				<div className='hidden sm:flex items-center gap-2 min-w-[180px] w-[28%] justify-end'>
					<button
						onClick={() => toast("Synchronized lyrics — coming soon! 🎙️", { icon: "🎙️" })}
						title='Lyrics'
						className='p-1.5 rounded-lg text-[var(--text-3)] hover:text-[var(--accent-cyan)] hover:bg-[var(--overlay-soft)] transition-all'
					>
						<Mic2 className='size-3.5' />
					</button>

					<button
						onClick={() => setShowQueue(!showQueue)}
						title='Queue'
						className={`p-1.5 rounded-lg transition-all ${
							showQueue
								? "bg-[color-mix(in_srgb,var(--accent-purple)_16%,transparent)] text-[var(--accent-cyan)] border border-[color-mix(in_srgb,var(--accent-cyan)_40%,transparent)]"
								: "text-[var(--text-3)] hover:text-[var(--text-1)] hover:bg-[var(--overlay-soft)]"
						}`}
					>
						<ListMusic className='size-3.5' />
					</button>

					{/* Volume Slider with Mute */}
					<div className='flex items-center gap-2 pl-2 border-l border-[color-mix(in_srgb,var(--text-1)_10%,transparent)]'>
						<button
							onClick={toggleMute}
							title={isMuted ? "Unmute" : "Mute"}
							className='text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors'
						>
							{isMuted || volume === 0 ? (
								<VolumeX className='size-3.5 text-[var(--accent-pink)]' />
							) : volume < 50 ? (
								<Volume1 className='size-3.5' />
							) : (
								<Volume2 className='size-3.5 text-[var(--accent-cyan)]' />
							)}
						</button>

						<Slider
							value={[isMuted ? 0 : volume]}
							max={100}
							step={1}
							className='w-20 hover:cursor-grab active:cursor-grabbing'
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
