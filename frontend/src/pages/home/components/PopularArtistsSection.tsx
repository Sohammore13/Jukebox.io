import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Sparkles, Play, Radio, Users } from "lucide-react";
import { useMemo } from "react";

export const PopularArtistsSection = () => {
	const { songs } = useMusicStore();
	const { setCurrentSong } = usePlayerStore();

	// Deduplicate artists from songs
	const artists = useMemo(() => {
		const artistMap = new Map<string, { artist: string; imageUrl: string; firstSong: any; songCount: number }>();
		songs.forEach((s) => {
			if (!artistMap.has(s.artist)) {
				artistMap.set(s.artist, {
					artist: s.artist,
					imageUrl: s.imageUrl,
					firstSong: s,
					songCount: 1,
				});
			} else {
				artistMap.get(s.artist)!.songCount++;
			}
		});
		return Array.from(artistMap.values()).slice(0, 10);
	}, [songs]);

	if (artists.length === 0) return null;

	return (
		<div className='mb-10 select-none'>
			<div className='flex items-end justify-between mb-5'>
				<div>
					<h2 className='text-xl sm:text-2xl font-extrabold text-[var(--text-1)] tracking-tight flex items-center gap-2'>
						<Users className='size-5 text-[var(--accent-pink)]' />
						<span>Popular Artists</span>
					</h2>
					<p className='text-xs text-[var(--text-3)] mt-1'>
						Trending creators across the galactic soundscape
					</p>
				</div>
				<button className='text-xs font-semibold text-[var(--accent-cyan)] hover:text-[var(--text-1)] hover:underline underline-offset-4 transition-colors'>
					See All →
				</button>
			</div>

			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
				{artists.map((item, idx) => (
					<div
						key={item.artist}
						onClick={() => setCurrentSong(item.firstSong)}
						className='p-4 rounded-2xl glass-panel border border-[#9B5CFF]/12 hover:border-[#32D9FF]/40 text-center flex flex-col items-center group cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_14px_35px_rgba(155,92,255,0.2)] relative overflow-hidden'
					>
						{/* Background glow on hover */}
						<div className='absolute inset-0 bg-gradient-to-b from-[#9B5CFF]/0 to-[#9B5CFF]/0 group-hover:from-[#9B5CFF]/5 group-hover:to-[#32D9FF]/5 transition-all duration-500 rounded-2xl' />

						{/* Circular Artist Avatar with Holographic Glow */}
						<div className='relative size-24 sm:size-28 rounded-full mb-3'>
							{/* Animated gradient ring */}
							<div className='absolute inset-0 rounded-full bg-gradient-to-tr from-[#9B5CFF] via-[#32D9FF] to-[#FF5CA8] p-[2px] shadow-[0_0_20px_rgba(155,92,255,0.3)] group-hover:shadow-[0_0_30px_rgba(50,217,255,0.5)] transition-all duration-500'>
								<div className='size-full rounded-full overflow-hidden bg-[#080B16] relative'>
									<img
										src={item.imageUrl}
										alt={item.artist}
										className='size-full object-cover group-hover:scale-110 transition-transform duration-500'
									/>
									{/* Hover overlay with play button */}
									<div className='absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100'>
										<div className='size-9 rounded-full bg-gradient-to-r from-[#9B5CFF] to-[#32D9FF] flex items-center justify-center text-white shadow-lg'>
											<Play className='size-4 fill-current ml-0.5' />
										</div>
									</div>
								</div>
							</div>
						</div>

						<h3 className='relative z-10 font-bold text-sm text-white group-hover:text-[#32D9FF] transition-colors truncate w-full'>
							{item.artist}
						</h3>
						<div className='relative z-10 flex items-center justify-center gap-1 mt-1'>
							<Radio className='size-2.5 text-[#32D9FF]' />
							<span className='text-[11px] text-[#94A3B8]'>
								{(1.8 + idx * 0.4).toFixed(1)}M Monthly
							</span>
						</div>
						<div className='relative z-10 mt-1.5'>
							<span className='text-[9px] font-bold uppercase tracking-wider text-[#9B5CFF] px-1.5 py-0.5 rounded bg-[#9B5CFF]/10 border border-[#9B5CFF]/20'>
								{item.songCount} {item.songCount === 1 ? "Track" : "Tracks"}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PopularArtistsSection;
