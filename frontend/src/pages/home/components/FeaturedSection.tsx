import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import PlayButton from "./PlayButton";
import AnimatedEqualizer from "@/components/AnimatedEqualizer";

const FeaturedSection = () => {
	const { isLoading, featuredSongs, error } = useMusicStore();
	const { currentSong, isPlaying } = usePlayerStore();

	if (isLoading) return <FeaturedGridSkeleton />;

	if (error) return <p className='text-[#FF5CA8] mb-4 text-sm font-medium'>{error}</p>;

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-10 select-none'>
			{featuredSongs.map((song) => {
				const isCurrent = currentSong?._id === song._id;

				return (
					<div
						key={song._id}
						className={`flex items-center rounded-2xl overflow-hidden glass-panel border transition-all duration-300 group cursor-pointer relative ${
							isCurrent
								? "border-[#32D9FF]/50 bg-[#11162A]/90 shadow-[0_0_20px_rgba(50,217,255,0.25)]"
								: "border-[#9B5CFF]/15 hover:border-[#9B5CFF]/40 hover:bg-[#18203B]/70 hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)]"
						}`}
					>
						<div className='relative size-18 sm:size-20 shrink-0'>
							<img
								src={song.imageUrl}
								alt={song.title}
								className='size-full object-cover group-hover:scale-105 transition-transform duration-500'
							/>
							{isCurrent && isPlaying && (
								<div className='absolute inset-0 bg-[#080B16]/60 backdrop-blur-xs flex items-center justify-center'>
									<AnimatedEqualizer size='sm' isPlaying={isPlaying} />
								</div>
							)}
						</div>

						<div className='flex-1 p-3.5 min-w-0 pr-12'>
							<p
								className={`font-semibold text-sm truncate transition-colors ${
									isCurrent ? "text-[#32D9FF]" : "text-white group-hover:text-white"
								}`}
							>
								{song.title}
							</p>
							<p className='text-xs text-[#94A3B8] truncate mt-0.5'>{song.artist}</p>
						</div>

						<div className='absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-100 scale-90'>
							<PlayButton song={song} size='sm' />
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default FeaturedSection;
