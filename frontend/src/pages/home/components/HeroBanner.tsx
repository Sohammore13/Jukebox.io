import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Play, Pause, Sparkles, Heart, Radio, Disc } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

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

	return (
		<div className='relative w-full rounded-3xl overflow-hidden glass-panel border border-[#9B5CFF]/25 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-10 group'>
			{/* Dynamic Aurora Backdrop Glows */}
			<div
				className='absolute inset-0 bg-cover bg-center opacity-25 blur-3xl scale-125 transition-transform duration-1000 group-hover:scale-135 pointer-events-none'
				style={{ backgroundImage: `url(${displayImage})` }}
			/>
			<div className='absolute inset-0 bg-gradient-to-r from-[#080B16] via-[#080B16]/80 to-transparent z-0' />
			<div className='absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-[#9B5CFF]/30 to-[#32D9FF]/20 rounded-full blur-3xl pointer-events-none' />

			{/* Banner Content */}
			<div className='relative z-10 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center md:items-end justify-between gap-8'>
				{/* Left text column */}
				<div className='space-y-4 max-w-xl text-center md:text-left'>
					<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#9B5CFF]/20 to-[#32D9FF]/20 border border-[#32D9FF]/30 text-xs font-semibold text-[#32D9FF] backdrop-blur-md shadow-[0_0_15px_rgba(50,217,255,0.2)]'>
						<Sparkles className='size-3.5 text-[#32D9FF] animate-pulse' />
						<span>AURORA SPOTLIGHT • MASTER QUALITY</span>
					</div>

					<div className='space-y-2'>
						<h1 className='text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight'>
							{displayTitle}
						</h1>
						<p className='text-base sm:text-lg text-[#CBD5E1] font-medium flex items-center justify-center md:justify-start gap-2'>
							<span>By <span className='text-white font-bold'>{displayArtist}</span></span>
							{featuredAlbum && (
								<>
									<span className='size-1 rounded-full bg-[#32D9FF]' />
									<span className='text-xs px-2 py-0.5 rounded bg-white/10 text-[#32D9FF] font-semibold'>
										{featuredAlbum.songs?.length || 5} Tracks
									</span>
								</>
							)}
						</p>
					</div>

					{/* Action Controls */}
					<div className='flex items-center justify-center md:justify-start gap-4 pt-2'>
						<button
							onClick={handlePlayHero}
							className='flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#9B5CFF] via-[#8545FF] to-[#32D9FF] text-white font-bold text-sm shadow-[0_0_25px_rgba(155,92,255,0.6)] hover:shadow-[0_0_35px_rgba(50,217,255,0.8)] hover:scale-105 active:scale-95 transition-all duration-300'
						>
							{isAlbumPlaying || (currentSong?._id === heroSong?._id && isPlaying) ? (
								<>
									<Pause className='size-5 fill-current' />
									<span>Pause Stream</span>
								</>
							) : (
								<>
									<Play className='size-5 fill-current' />
									<span>Stream Now</span>
								</>
							)}
						</button>

						{featuredAlbum && (
							<Link
								to={`/albums/${featuredAlbum._id}`}
								className='flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 hover:border-[#9B5CFF]/40 backdrop-blur-md transition-all'
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
									? "text-[#FF5CA8] border-[#FF5CA8] shadow-[0_0_15px_rgba(255,92,168,0.4)]"
									: "text-[#94A3B8] hover:text-white border-white/10 hover:border-[#FF5CA8]/40"
							}`}
						>
							<Heart className={`size-5 ${isLiked ? "fill-current" : ""}`} />
						</button>
					</div>
				</div>

				{/* Right artwork card */}
				<div className='relative shrink-0'>
					<div className='relative size-48 sm:size-56 md:size-64 rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.8)] border border-white/10 group-hover:border-[#32D9FF]/50 transition-all duration-500'>
						<img
							src={displayImage}
							alt={displayTitle}
							className='size-full object-cover group-hover:scale-105 transition-transform duration-700'
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-[#080B16]/80 via-transparent to-transparent' />
						<div className='absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-semibold text-white/90 backdrop-blur-md bg-black/40 px-3 py-1.5 rounded-xl border border-white/10'>
							<span className='flex items-center gap-1.5'>
								<Radio className='size-3 text-[#32D9FF] animate-pulse' />
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

