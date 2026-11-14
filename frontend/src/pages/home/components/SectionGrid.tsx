import { Song } from "@/types";
import SectionGridSkeleton from "./SectionGridSkeleton";
import PlayButton from "./PlayButton";
import { usePlayerStore } from "@/stores/usePlayerStore";
import AnimatedEqualizer from "@/components/AnimatedEqualizer";
import { formatDuration } from "@/pages/album/AlbumPage";
import { Sparkles } from "lucide-react";

type SectionGridProps = {
	title: string;
	subtitle?: string;
	songs: Song[];
	isLoading: boolean;
};

const SectionGrid = ({ songs, title, subtitle, isLoading }: SectionGridProps) => {
	const { currentSong, isPlaying } = usePlayerStore();

	if (isLoading) return <SectionGridSkeleton />;

	return (
		<div className='mb-10 select-none'>
			{/* Section Header */}
			<div className='flex items-end justify-between mb-5'>
				<div>
					<h2 className='text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2'>
						<span>{title}</span>
						<Sparkles className='size-4 text-[#32D9FF]' />
					</h2>
					{subtitle && (
						<p className='text-xs text-[#94A3B8] mt-0.5'>{subtitle}</p>
					)}
				</div>
				<button className='text-xs font-semibold text-[#32D9FF] hover:text-white hover:underline transition-colors'>
					Explore All
				</button>
			</div>

			{/* Cards Grid */}
			<div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
				{songs.map((song) => {
					const isCurrent = currentSong?._id === song._id;

					return (
						<div
							key={song._id}
							className={`p-3.5 rounded-2xl glass-panel border transition-all duration-300 group cursor-pointer relative flex flex-col ${
								isCurrent
									? "border-[#32D9FF]/50 bg-[#11162A]/90 shadow-[0_0_25px_rgba(50,217,255,0.2)]"
									: "border-[#9B5CFF]/15 hover:border-[#9B5CFF]/40 hover:bg-[#18203B]/60 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] hover:scale-[1.02]"
							}`}
						>
							{/* Large Album Artwork */}
							<div className='relative aspect-square rounded-xl overflow-hidden mb-3.5 shadow-md'>
								<img
									src={song.imageUrl}
									alt={song.title}
									className='size-full object-cover transition-transform duration-700 group-hover:scale-108'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-[#080B16]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity' />

								{/* Animated equalizer if playing */}
								{isCurrent && isPlaying && (
									<div className='absolute top-2.5 left-2.5 px-2 py-1 rounded-md bg-[#080B16]/80 backdrop-blur-md border border-[#32D9FF]/30'>
										<AnimatedEqualizer size='sm' isPlaying={isPlaying} />
									</div>
								)}

								{/* Floating Play Button */}
								<div className='absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2'>
									<PlayButton song={song} size='md' />
								</div>
							</div>

							{/* Song Details */}
							<div className='flex-1 flex flex-col justify-between'>
								<div>
									<h3
										className={`font-bold text-sm truncate transition-colors ${
											isCurrent ? "text-[#32D9FF]" : "text-white group-hover:text-white"
										}`}
									>
										{song.title}
									</h3>
									<p className='text-xs text-[#94A3B8] truncate mt-1'>
										{song.artist}
									</p>
								</div>

								<div className='flex items-center justify-between text-[11px] text-[#94A3B8] pt-2 mt-2 border-t border-white/5'>
									<span className='uppercase font-semibold tracking-wider text-[10px] text-[#9B5CFF]'>
										Spatial
									</span>
									<span>{formatDuration(song.duration)}</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SectionGrid;
