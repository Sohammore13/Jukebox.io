import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Sparkles, Play, Radio } from "lucide-react";
import { useMemo } from "react";

export const PopularArtistsSection = () => {
	const { songs } = useMusicStore();
	const { setCurrentSong } = usePlayerStore();

	// Deduplicate artists from songs
	const artists = useMemo(() => {
		const artistMap = new Map<string, { artist: string; imageUrl: string; firstSong: any }>();
		songs.forEach((s) => {
			if (!artistMap.has(s.artist)) {
				artistMap.set(s.artist, {
					artist: s.artist,
					imageUrl: s.imageUrl,
					firstSong: s,
				});
			}
		});
		return Array.from(artistMap.values());
	}, [songs]);

	if (artists.length === 0) return null;

	return (
		<div className='mb-10 select-none'>
			<div className='flex items-center justify-between mb-5'>
				<div>
					<h2 className='text-xl sm:text-2xl font-bold text-white flex items-center gap-2'>
						<Sparkles className='size-5 text-[#9B5CFF]' />
						Popular Artists in the Aurora
					</h2>
					<p className='text-xs text-[#94A3B8] mt-0.5'>Trending creators across the galaxy</p>
				</div>
			</div>

			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
				{artists.map((item, idx) => (
					<div
						key={item.artist}
						onClick={() => setCurrentSong(item.firstSong)}
						className='p-4 rounded-2xl glass-panel border border-[#9B5CFF]/15 hover:border-[#32D9FF]/40 text-center flex flex-col items-center group cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_30px_rgba(155,92,255,0.2)]'
					>
						{/* Circular Artist Avatar with Holographic Glow */}
						<div className='relative size-28 sm:size-32 rounded-full p-1 bg-gradient-to-tr from-[#9B5CFF] via-[#32D9FF] to-[#FF5CA8] shadow-[0_0_20px_rgba(155,92,255,0.3)] group-hover:shadow-[0_0_30px_rgba(50,217,255,0.6)] transition-all duration-500 mb-3'>
							<div className='size-full rounded-full overflow-hidden bg-[#080B16] relative'>
								<img
									src={item.imageUrl}
									alt={item.artist}
									className='size-full object-cover group-hover:scale-110 transition-transform duration-500'
								/>
								<div className='absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100'>
									<div className='size-10 rounded-full bg-gradient-to-r from-[#9B5CFF] to-[#32D9FF] flex items-center justify-center text-white shadow-lg'>
										<Play className='size-5 fill-current ml-0.5' />
									</div>
								</div>
							</div>
						</div>

						<h3 className='font-bold text-sm text-white group-hover:text-[#32D9FF] transition-colors truncate w-full'>
							{item.artist}
						</h3>
						<span className='text-[11px] text-[#94A3B8] flex items-center gap-1 mt-1'>
							<Radio className='size-2.5 text-[#32D9FF]' />
							{(1.8 + idx * 0.4).toFixed(1)}M Monthly
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default PopularArtistsSection;

