import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Play, Pause, Sparkles, Heart, Radio, Disc, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import AnimatedEqualizer from "@/components/AnimatedEqualizer";

export const HeroBanner = () => {
	const { albums, featuredSongs } = useMusicStore();
	const { currentSong, isPlaying, playAlbum, setCurrentSong, togglePlay } = usePlayerStore();
	const [isLiked, setIsLiked] = useState(false);

	// Featured album or fallback to first album / song
	const featuredAlbum = albums[0] || null;
	const heroSong = featuredSongs[0] || null;

	if (!featuredAlbum && !heroSong) return null;

	const isAlbumPlaying =
		isPlaying &&
		featuredAlbum?.songs?.some((s) => s._id === currentSong?._id);

	const handlePlayHero = () => {
		if (featuredAlbum && featuredAlbum.songs?.length > 0) {
			if (isAlbumPlaying) {
				togglePlay();
			} else {
				playAlbum(featuredAlbum.songs, 0);
			}
		} else if (heroSong) {
			if (currentSong?._id === heroSong._id) {
				togglePlay();
			} else {
				setCurrentSong(heroSong);
			}
		}
	};

	const displayTitle = featuredAlbum?.title || heroSong?.title || "Aurora Odyssey";
	const displayArtist = featuredAlbum?.artist || heroSong?.artist || "Midnight Collective";
	const displayImage = featuredAlbum?.imageUrl || heroSong?.imageUrl || "/cover-images/1.jpg";
	const isCurrentlyPlaying = isAlbumPlaying || (currentSong?._id === heroSong?._id && isPlaying);

	return (
		<div className='relative w-full rounded-3xl overflow-hidden glass-panel border border-[#9B5CFF]/25 shadow-[0_20px_60px_rgba(0,0,0,0.5)] mb-10 group'>
			{/* Dynamic Aurora Backdrop */}
			<div
				className='absolute inset-0 bg-cover bg-center opacity-20 blur-3xl scale-130 transition-transform duration-1000 group-hover:scale-140 pointer-events-none'
				style={{ backgroundImage: `url(${displayImage})` }}
			/>
			<div className='absolute inset-0 bg-gradient-to-r from-[#080B16]/95 via-[#080B16]/75 to-[#080B16]/30 z-0' />
			<div className='absolute inset-0 bg-gradient-to-t from-[#080B16]/60 via-transparent to-transparent z-0' />

			{/* Aurora accent glows */}
			<div className='absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-[#9B5CFF]/25 to-[#32D9FF]/15 rounded-full blur-3xl pointer-events-none' />
			<div className='absolute -bottom-20 -left-10 w-60 h-60 bg-gradient-to-tr from-[#FF5CA8]/15 to-transparent rounded-full blur-3xl pointer-events-none' />

			{/* Banner Content */}
			<div className='relative z-10 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center md:items-end justify-between gap-8'>
				{/* Left text column */}
				<div className='space-y-4 max-w-xl text-center md:text-left'>
					<div className='flex items-center justify-center md:justify-start gap-2 flex-wrap'>
						<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#9B5CFF]/20 to-[#32D9FF]/20 border border-[color-mix(in_srgb,var(--accent-cyan)_35%,transparent)] text-xs font-semibold text-[var(--accent-cyan)] backdrop-blur-md'>
							<Sparkles className='size-3 text-[var(--accent-cyan)] animate-pulse' />
							<span>SPOTLIGHT · MASTER QUALITY</span>
						</div>
						{featuredAlbum && (
							<div className='inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#FF5CA8]/15 border border-[#FF5CA8]/30 text-[10px] font-bold text-[#FF5CA8]'>
								<TrendingUp className='size-2.5' />
								<span>FEATURED ALBUM</span>
							</div>
						)}
					</div>

					<div className='space-y-2'>
						<h1 className='text-3xl sm:text-5xl md:text-5xl font-extrabold tracking-tight text-[var(--text-1)] leading-tight'>
							{displayTitle}
						</h1>
						<p className='text-sm sm:text-base text-[var(--text-2)] font-medium flex items-center justify-center md:justify-start gap-2 flex-wrap'>
							<span>
								By{" "}
								<span className='text-[var(--text-1)] font-bold'>{displayArtist}</span>
							</span>
							{featuredAlbum && (
								<>
									<span className='size-1 rounded-full bg-[#32D9FF]' />
									<span className='text-xs px-2 py-0.5 rounded-lg bg-white/8 text-[#32D9FF] font-semibold border border-[#32D9FF]/20'>
										{featuredAlbum.songs?.length || 5} Tracks
									</span>
									<span className='size-1 rounded-full bg-[#9B5CFF]' />
									<span className='text-xs text-[var(--text-3)]'>
										{featuredAlbum.releaseYear}
									</span>
								</>
							)}
						</p>
					</div>

					{/* Action Controls */}
					<div className='flex items-center justify-center md:justify-start gap-3 pt-1 flex-wrap'>
						<button
							onClick={handlePlayHero}
							className='flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#9B5CFF] via-[#8545FF] to-[#32D9FF] text-white font-bold text-sm shadow-[0_0_25px_rgba(155,92,255,0.6)] hover:shadow-[0_0_40px_rgba(50,217,255,0.8)] hover:scale-105 active:scale-95 transition-all duration-300'
						>
							{isCurrentlyPlaying ? (
								<>
									<Pause className='size-4.5 fill-current' />
									<span>Pause Stream</span>
								</>
							) : (
								<>
									<Play className='size-4.5 fill-current' />
									<span>Stream Now</span>
								</>
							)}
						</button>

						{featuredAlbum && (
							<Link
								to={`/albums/${featuredAlbum._id}`}
								className='flex items-center gap-2 px-5 py-3 rounded-full bg-white/8 hover:bg-white/14 text-white font-semibold text-sm border border-white/12 hover:border-[#9B5CFF]/50 backdrop-blur-md transition-all duration-200'
							>
								<Disc className='size-4 text-[#9B5CFF]' />
								<span>View Album</span>
							</Link>
						)}

						<button
							onClick={() => setIsLiked(!isLiked)}
							title={isLiked ? "Saved" : "Save to library"}
							className={`size-11 rounded-full glass-panel flex items-center justify-center border transition-all ${
								isLiked
									? "text-[#FF5CA8] border-[#FF5CA8] shadow-[0_0_15px_rgba(255,92,168,0.4)] scale-110"
									: "text-[#94A3B8] hover:text-white border-white/10 hover:border-[#FF5CA8]/40 hover:scale-105"
							}`}
						>
							<Heart className={`size-4.5 ${isLiked ? "fill-current" : ""}`} />
						</button>
					</div>
				</div>

				{/* Right artwork card */}
				<div className='relative shrink-0'>
					{/* Glow ring */}
					<div
						className={`absolute -inset-3 rounded-3xl blur-xl transition-opacity duration-500 ${
							isCurrentlyPlaying ? "opacity-70" : "opacity-30 group-hover:opacity-60"
						}`}
						style={{
							background: `radial-gradient(ellipse, rgba(155,92,255,0.5), rgba(50,217,255,0.3))`,
						}}
					/>

					<div className='relative size-44 sm:size-52 md:size-60 rounded-2xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.9)] border border-white/12 group-hover:border-[#32D9FF]/50 transition-all duration-500'>
						<img
							src={displayImage}
							alt={displayTitle}
							className='size-full object-cover group-hover:scale-105 transition-transform duration-700'
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-[#080B16]/80 via-transparent to-transparent' />

						{/* Playing overlay */}
						{isCurrentlyPlaying && (
							<div className='absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-xs'>
								<div className='p-3 rounded-full bg-black/60 border border-[#32D9FF]/30'>
									<AnimatedEqualizer size='md' isPlaying={true} />
								</div>
							</div>
						)}

						{/* Info badge at bottom */}
						<div className='absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-semibold text-white/90 backdrop-blur-md bg-black/50 px-3 py-1.5 rounded-xl border border-white/8'>
							<span className='flex items-center gap-1'>
								<Radio className='size-2.5 text-[#32D9FF] animate-pulse' />
								FLAC 24-Bit / 96kHz
							</span>
							<span className='text-[#9B5CFF]'>Spatial 3D</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroBanner;
