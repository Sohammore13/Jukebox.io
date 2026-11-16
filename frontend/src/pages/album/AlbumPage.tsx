import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Clock, Pause, Play, Sparkles, Disc, Share2, Heart, Music } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnimatedEqualizer from "@/components/AnimatedEqualizer";
import Topbar from "@/components/Topbar";

export const formatDuration = (seconds: number) => {
	if (isNaN(seconds)) return "0:00";
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const AlbumPage = () => {
	const { albumId } = useParams();
	const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
	const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();
	const [isLiked, setIsLiked] = useState(false);

	useEffect(() => {
		if (albumId) fetchAlbumById(albumId);
	}, [fetchAlbumById, albumId]);

	if (isLoading) {
		return (
			<div className='h-full flex items-center justify-center glass-panel rounded-2xl'>
				<div className='flex flex-col items-center gap-4'>
					<div className='relative size-16'>
						<Disc className='size-16 text-[#9B5CFF] animate-spin' style={{ animationDuration: "2s" }} />
						<div className='absolute inset-0 flex items-center justify-center'>
							<div className='size-6 rounded-full bg-[#080B16] border-2 border-[#9B5CFF]/40' />
						</div>
					</div>
					<div className='text-center'>
						<p className='text-sm font-semibold text-white'>Loading album</p>
						<p className='text-xs text-[#94A3B8] mt-0.5'>Calibrating Aurora Audio Stream...</p>
					</div>
				</div>
			</div>
		);
	}

	const isCurrentAlbumPlaying =
		isPlaying && currentAlbum?.songs?.some((song) => song._id === currentSong?._id);

	const handlePlayAlbum = () => {
		if (!currentAlbum || !currentAlbum.songs?.length) return;

		if (isCurrentAlbumPlaying) {
			togglePlay();
		} else {
			playAlbum(currentAlbum.songs, 0);
		}
	};

	const handlePlaySong = (index: number) => {
		if (!currentAlbum) return;
		playAlbum(currentAlbum.songs, index);
	};

	// Calculate total duration
	const totalDuration = currentAlbum?.songs?.reduce((acc, s) => acc + (s.duration || 0), 0) || 0;
	const totalMins = Math.floor(totalDuration / 60);

	return (
		<div className='h-full rounded-2xl overflow-hidden flex flex-col glass-panel border border-[#9B5CFF]/15 select-none'>
			<Topbar />

			<ScrollArea className='flex-1 h-[calc(100vh-170px)]'>
				{/* Album Hero Section */}
				<div className='relative min-h-full'>
					{/* Ambient Aurora Glow */}
					<div
						className='absolute inset-0 bg-cover bg-center opacity-18 blur-3xl scale-130 pointer-events-none'
						style={{ backgroundImage: `url(${currentAlbum?.imageUrl})` }}
					/>
					<div className='absolute inset-0 bg-gradient-to-b from-[#080B16]/30 via-[#080B16]/75 to-[#080B16] pointer-events-none' />

					{/* Content Container */}
					<div className='relative z-10 p-6 sm:p-8 md:p-10'>
						{/* Album Details Banner */}
						<div className='flex flex-col md:flex-row items-center md:items-end gap-7 pb-8'>
							{/* Album Art */}
							<div className='relative shrink-0'>
								<div className='absolute -inset-3 rounded-3xl opacity-50'
									style={{
										background: "radial-gradient(ellipse, rgba(155,92,255,0.4), rgba(50,217,255,0.2), transparent 70%)",
										filter: "blur(16px)",
									}}
								/>
								<div className='relative size-52 sm:size-60 md:size-64 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] border border-[#9B5CFF]/30 group'>
									<img
										src={currentAlbum?.imageUrl}
										alt={currentAlbum?.title}
										className='size-full object-cover group-hover:scale-105 transition-transform duration-700'
									/>
									{isCurrentAlbumPlaying && (
										<div className='absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-xs'>
											<div className='p-4 rounded-full bg-black/60 border border-[#32D9FF]/30'>
												<AnimatedEqualizer size='md' isPlaying={isPlaying} />
											</div>
										</div>
									)}
								</div>
							</div>

							<div className='flex flex-col justify-end text-center md:text-left space-y-3 min-w-0'>
								<div className='inline-flex items-center justify-center md:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-[#32D9FF]'>
									<Sparkles className='size-3.5 text-[#32D9FF]' />
									<span>Aurora Master Series</span>
								</div>

								<h1 className='text-3xl sm:text-5xl md:text-5xl font-black text-white tracking-tight leading-tight'>
									{currentAlbum?.title}
								</h1>

								<div className='flex flex-wrap items-center justify-center md:justify-start gap-2 text-sm text-[#CBD5E1] pt-1'>
									<span className='font-bold text-white text-base'>{currentAlbum?.artist}</span>
									<span className='size-1 rounded-full bg-[#9B5CFF]' />
									<span>{currentAlbum?.songs?.length || 0} Songs</span>
									<span className='size-1 rounded-full bg-[#9B5CFF]' />
									<span>{currentAlbum?.releaseYear}</span>
									{totalMins > 0 && (
										<>
											<span className='size-1 rounded-full bg-[#9B5CFF]' />
											<span>{totalMins} min</span>
										</>
									)}
									<span className='size-1 rounded-full bg-[#9B5CFF]' />
									<span className='px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#9B5CFF]/20 text-[#32D9FF] border border-[#32D9FF]/30'>
										Lossless FLAC
									</span>
								</div>
							</div>
						</div>

						{/* Action Buttons Row */}
						<div className='py-4 flex items-center justify-center md:justify-start gap-4 border-y border-white/5'>
							<Button
								onClick={handlePlayAlbum}
								size='icon'
								className='size-14 rounded-full bg-gradient-to-r from-[#9B5CFF] via-[#7B42FF] to-[#32D9FF] text-white shadow-[0_0_25px_rgba(155,92,255,0.6)] hover:shadow-[0_0_40px_rgba(50,217,255,0.8)] hover:scale-105 active:scale-95 transition-all'
							>
								{isCurrentAlbumPlaying ? (
									<Pause className='size-6 fill-current' />
								) : (
									<Play className='size-6 fill-current ml-0.5' />
								)}
							</Button>

							<button
								onClick={() => setIsLiked(!isLiked)}
								className={`size-11 rounded-full glass-panel flex items-center justify-center border transition-all ${
									isLiked
										? "text-[#FF5CA8] border-[#FF5CA8] shadow-[0_0_15px_rgba(255,92,168,0.4)] scale-110"
										: "text-[#94A3B8] hover:text-white border-white/10 hover:border-[#FF5CA8]/40 hover:scale-105"
								}`}
							>
								<Heart className={`size-5 ${isLiked ? "fill-current" : ""}`} />
							</button>

							<button
								onClick={() => alert("Copied album link to clipboard! 🌌")}
								className='size-11 rounded-full glass-panel flex items-center justify-center text-[#94A3B8] hover:text-white border border-white/10 hover:border-white/30 transition-all hover:scale-105'
							>
								<Share2 className='size-5' />
							</button>
						</div>

						{/* Tracklist Table */}
						<div className='pt-6'>
							{/* Table Header */}
							<div className='grid grid-cols-[32px_4fr_2fr_1fr] gap-4 px-4 py-2.5 text-[11px] font-bold text-[#94A3B8] uppercase tracking-widest border-b border-white/5'>
								<div className='text-center'>#</div>
								<div className='flex items-center gap-2'>
									<Music className='size-3.5' />
									Title
								</div>
								<div className='hidden sm:block'>Added</div>
								<div className='flex justify-end'>
									<Clock className='size-3.5' />
								</div>
							</div>

							{/* Tracks List */}
							<div className='space-y-1 py-3'>
								{currentAlbum?.songs.map((song, index) => {
									const isCurrentSong = currentSong?._id === song._id;

									return (
										<div
											key={song._id}
											onClick={() => handlePlaySong(index)}
											className={`grid grid-cols-[32px_4fr_2fr_1fr] gap-4 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer items-center group border ${
												isCurrentSong
													? "bg-[#9B5CFF]/18 border-[#9B5CFF]/35 text-white shadow-[0_0_20px_rgba(155,92,255,0.12)]"
													: "hover:bg-white/4 border-transparent text-[#CBD5E1] hover:border-white/5"
											}`}
										>
											{/* Track Index or Equalizer */}
											<div className='flex items-center justify-center'>
												{isCurrentSong && isPlaying ? (
													<AnimatedEqualizer size='sm' isPlaying={isPlaying} />
												) : (
													<>
														<span className='group-hover:hidden text-xs text-[#94A3B8] tabular-nums'>
															{index + 1}
														</span>
														<Play className='size-4 hidden group-hover:block text-[#32D9FF] fill-current' />
													</>
												)}
											</div>

											{/* Song Info */}
											<div className='flex items-center gap-3.5 min-w-0'>
												<div className='relative size-10 shrink-0'>
													<img
														src={song.imageUrl}
														alt={song.title}
														className='size-full rounded-lg object-cover shadow-sm'
													/>
													{isCurrentSong && isPlaying && (
														<div className='absolute inset-0 bg-black/40 rounded-lg' />
													)}
												</div>
												<div className='min-w-0'>
													<p
														className={`font-semibold text-sm truncate leading-tight ${
															isCurrentSong ? "text-[#32D9FF]" : "text-white"
														}`}
													>
														{song.title}
													</p>
													<p className='text-xs text-[#94A3B8] truncate mt-0.5'>{song.artist}</p>
												</div>
											</div>

											{/* Date Added */}
											<div className='hidden sm:flex items-center text-xs text-[#94A3B8]'>
												{song.createdAt?.split("T")[0] || "Recent"}
											</div>

											{/* Duration */}
											<div className='flex items-center justify-end text-xs text-[#94A3B8] font-mono tabular-nums'>
												{formatDuration(song.duration)}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</ScrollArea>
		</div>
	);
};

export default AlbumPage;
