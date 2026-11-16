import { useState, useEffect, useMemo } from "react";
import Topbar from "@/components/Topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Search, X, Sparkles, Music, Disc, Play, Radio, Flame, TrendingUp } from "lucide-react";
import PlayButton from "../home/components/PlayButton";
import { Link } from "react-router-dom";
import { formatDuration } from "../album/AlbumPage";

const GENRES = [
	{
		name: "Cyberpunk & Synth",
		gradient: "from-[#9B5CFF] to-[#32D9FF]",
		bg: "bg-gradient-to-br from-[#9B5CFF]/30 via-[#11162A] to-[#32D9FF]/20",
		border: "border-[#9B5CFF]/40",
		tag: "Popular",
		emoji: "⚡",
	},
	{
		name: "Midnight Ambient",
		gradient: "from-[#1E1B4B] to-[#4338CA]",
		bg: "bg-gradient-to-br from-[#4338CA]/30 via-[#11162A] to-[#6366F1]/20",
		border: "border-[#6366F1]/40",
		tag: "Chill",
		emoji: "🌙",
	},
	{
		name: "Neo-Pop & Dance",
		gradient: "from-[#FF5CA8] to-[#9B5CFF]",
		bg: "bg-gradient-to-br from-[#FF5CA8]/30 via-[#11162A] to-[#9B5CFF]/20",
		border: "border-[#FF5CA8]/40",
		tag: "Trending",
		emoji: "💃",
	},
	{
		name: "Acoustic Aurora",
		gradient: "from-[#32D9FF] to-[#10B981]",
		bg: "bg-gradient-to-br from-[#32D9FF]/30 via-[#11162A] to-[#10B981]/20",
		border: "border-[#32D9FF]/40",
		tag: "Organic",
		emoji: "🎸",
	},
	{
		name: "Deep Focus Flow",
		gradient: "from-[#6366F1] to-[#EC4899]",
		bg: "bg-gradient-to-br from-[#6366F1]/30 via-[#11162A] to-[#EC4899]/20",
		border: "border-[#6366F1]/40",
		tag: "Focus",
		emoji: "🧘",
	},
	{
		name: "Heavy Bass & Electronic",
		gradient: "from-[#8B5CF6] to-[#F43F5E]",
		bg: "bg-gradient-to-br from-[#8B5CF6]/30 via-[#11162A] to-[#F43F5E]/20",
		border: "border-[#8B5CF6]/40",
		tag: "Energetic",
		emoji: "🔊",
	},
];

const TRENDING_TAGS = [
	"Sarah Mitchell",
	"Electric Dreams",
	"Midnight Drive",
	"Summer Daze",
	"Lost in Tokyo",
	"Night Runners",
];

const SearchPage = () => {
	const [query, setQuery] = useState("");
	const { songs, albums, fetchSongs, fetchAlbums } = useMusicStore();
	const { currentSong, setCurrentSong } = usePlayerStore();

	useEffect(() => {
		if (songs.length === 0) fetchSongs();
		if (albums.length === 0) fetchAlbums();
	}, [fetchSongs, fetchAlbums, songs.length, albums.length]);

	const filteredSongs = useMemo(() => {
		if (!query.trim()) return [];
		const q = query.toLowerCase();
		return songs.filter(
			(s) =>
				s.title.toLowerCase().includes(q) ||
				s.artist.toLowerCase().includes(q)
		);
	}, [query, songs]);

	const filteredAlbums = useMemo(() => {
		if (!query.trim()) return [];
		const q = query.toLowerCase();
		return albums.filter(
			(a) =>
				a.title.toLowerCase().includes(q) ||
				a.artist.toLowerCase().includes(q)
		);
	}, [query, albums]);

	const topResult = filteredSongs[0] || null;

	return (
		<main className='rounded-2xl overflow-hidden h-full flex flex-col glass-panel border border-[#9B5CFF]/15 relative select-none'>
			{/* Ambient Aurora Glow */}
			<div className='absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-b from-[#9B5CFF]/12 to-[#32D9FF]/8 rounded-full blur-3xl pointer-events-none -z-10' />
			<div className='absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-tr from-[#FF5CA8]/8 to-[#9B5CFF]/8 rounded-full blur-3xl pointer-events-none -z-10' />

			<Topbar />

			<ScrollArea className='flex-1 h-[calc(100vh-170px)]'>
				<div className='p-6 md:p-8 max-w-7xl mx-auto space-y-8'>
					{/* Search Header & Bar */}
					<div className='space-y-5'>
						<div className='space-y-2'>
							<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9B5CFF]/10 border border-[#9B5CFF]/25 text-xs text-[#32D9FF] font-semibold'>
								<Sparkles className='size-3.5' />
								<span>Universal Sonic Search</span>
							</div>
							<h1 className='text-3xl md:text-4xl font-extrabold tracking-tight text-white'>
								Search the{" "}
								<span className='text-transparent bg-clip-text bg-gradient-to-r from-[#9B5CFF] via-[#32D9FF] to-[#FF5CA8]'>
									Aurora Cosmos
								</span>
							</h1>
						</div>

						{/* Search Bar Input */}
						<div className='relative max-w-2xl group'>
							<div className='absolute inset-0 bg-gradient-to-r from-[#9B5CFF] to-[#32D9FF] rounded-2xl blur-md opacity-25 group-focus-within:opacity-70 transition-opacity duration-300' />
							<div className='relative flex items-center bg-[#11162A]/95 backdrop-blur-xl border border-[#9B5CFF]/30 rounded-2xl px-4 py-3.5 shadow-2xl transition-all group-focus-within:border-[#32D9FF]'>
								<Search className='size-5 text-[#32D9FF] shrink-0 mr-3' />
								<input
									type='text'
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									placeholder='Search songs, artists, albums...'
									className='w-full bg-transparent text-white placeholder-[#94A3B8]/60 text-base focus:outline-none'
									autoFocus
								/>
								{query && (
									<button
										onClick={() => setQuery("")}
										className='size-7 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors shrink-0 ml-2'
									>
										<X className='size-3.5' />
									</button>
								)}
							</div>
						</div>

						{/* Trending Search Pills */}
						<div className='flex items-center gap-2 flex-wrap pt-1'>
							<div className='flex items-center gap-1.5 text-xs text-[#94A3B8] mr-1'>
								<Flame className='size-3.5 text-[#FF5CA8]' />
								<span className='font-semibold'>Trending:</span>
							</div>
							{TRENDING_TAGS.map((tag) => (
								<button
									key={tag}
									onClick={() => setQuery(tag)}
									className='px-3 py-1 rounded-full text-xs font-medium bg-[#11162A] hover:bg-[#9B5CFF]/18 text-[#CBD5E1] hover:text-[#32D9FF] border border-[#9B5CFF]/18 hover:border-[#32D9FF]/45 transition-all duration-200'
								>
									{tag}
								</button>
							))}
						</div>
					</div>

					{/* If Query Is Empty: Show Genres / Aurora Vibes */}
					{!query.trim() && (
						<div className='space-y-5'>
							<div className='flex items-center justify-between'>
								<div>
									<h2 className='text-xl md:text-2xl font-bold text-white flex items-center gap-2'>
										<TrendingUp className='size-5 text-[var(--accent-cyan)]' />
										Explore Soundscapes
									</h2>
									<p className='text-xs text-[#94A3B8] mt-1'>
										Curated genres powered by spatial audio
									</p>
								</div>
							</div>

							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
								{GENRES.map((genre) => (
									<div
										key={genre.name}
										onClick={() => setQuery(genre.name.split(" ")[0])}
										className={`p-6 rounded-2xl ${genre.bg} border ${genre.border} cursor-pointer group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_14px_35px_rgba(0,0,0,0.5)]`}
									>
										<div className='relative z-10 flex flex-col justify-between h-28'>
											<div className='flex items-center justify-between'>
												<div className='flex items-center gap-2'>
													<span className='text-xl'>{genre.emoji}</span>
													<span className='px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-black/40 text-white backdrop-blur-md border border-white/10'>
														{genre.tag}
													</span>
												</div>
												<div className='size-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center text-white transition-colors'>
													<Radio className='size-4 group-hover:scale-110 transition-transform' />
												</div>
											</div>
											<h3 className='text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#32D9FF] transition-colors'>
												{genre.name}
											</h3>
										</div>
										<div className='absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500' />
									</div>
								))}
							</div>
						</div>
					)}

					{/* If Query Has Value: Show Search Results */}
					{query.trim() && (
						<div className='space-y-8'>
							{filteredSongs.length === 0 && filteredAlbums.length === 0 ? (
								<div className='py-16 text-center space-y-4'>
									<div className='size-16 rounded-2xl bg-[#9B5CFF]/12 border border-[#9B5CFF]/25 flex items-center justify-center mx-auto text-[#9B5CFF]'>
										<Music className='size-8' />
									</div>
									<div>
										<h3 className='text-xl font-bold text-white'>No audio signals detected</h3>
										<p className='text-sm text-[#94A3B8] max-w-sm mx-auto mt-2 leading-relaxed'>
											We couldn't find anything matching &quot;{query}&quot;. Try exploring trending artists or genres above!
										</p>
									</div>
								</div>
							) : (
								<>
									{/* Top Result + Songs Preview */}
									<div className='grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-6'>
										{/* Top Result Card */}
										{topResult && (
											<div className='space-y-3'>
												<h2 className='text-lg font-bold text-white flex items-center gap-2'>
													<Sparkles className='size-4 text-[#32D9FF]' />
													Top Result
												</h2>
												<div
													onClick={() => setCurrentSong(topResult)}
													className='p-6 rounded-2xl glass-panel border border-[#9B5CFF]/30 group hover:border-[#32D9FF]/60 cursor-pointer relative overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(155,92,255,0.25)] flex flex-col justify-between h-56'
												>
													<div className='flex items-start gap-4'>
														<div className='relative'>
															<img
																src={topResult.imageUrl}
																alt={topResult.title}
																className='size-24 rounded-xl object-cover shadow-2xl group-hover:scale-105 transition-transform duration-300'
															/>
															<div className='absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors rounded-xl' />
														</div>
														<div className='space-y-1.5 min-w-0 flex-1'>
															<span className='px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#9B5CFF]/20 text-[#32D9FF] border border-[#32D9FF]/30'>
																Track
															</span>
															<h3 className='text-2xl font-bold text-white group-hover:text-[#32D9FF] transition-colors truncate'>
																{topResult.title}
															</h3>
															<p className='text-sm text-[#94A3B8] truncate'>
																By{" "}
																<span className='text-white font-medium'>{topResult.artist}</span>
															</p>
														</div>
													</div>

													<div className='flex items-center justify-between pt-4 border-t border-white/5'>
														<span className='text-xs text-[#94A3B8] font-mono'>
															{formatDuration(topResult.duration)}
														</span>
														<PlayButton song={topResult} size='md' />
													</div>
												</div>
											</div>
										)}

										{/* Songs Matching List */}
										<div className='space-y-3'>
											<h2 className='text-lg font-bold text-white flex items-center gap-2'>
												<Music className='size-4 text-[#9B5CFF]' />
												Matching Tracks
												<span className='px-1.5 py-0.5 rounded-full bg-[#9B5CFF]/15 text-[#9B5CFF] text-xs font-bold border border-[#9B5CFF]/30'>
													{filteredSongs.length}
												</span>
											</h2>
											<div className='space-y-1.5'>
												{filteredSongs.slice(0, 6).map((song) => {
													const isCurrent = currentSong?._id === song._id;
													return (
														<div
															key={song._id}
															onClick={() => setCurrentSong(song)}
															className={`p-2.5 rounded-xl flex items-center gap-3.5 transition-all duration-200 cursor-pointer group border ${
																isCurrent
																	? "bg-[#9B5CFF]/18 border-[#9B5CFF]/35"
																	: "glass-panel border-transparent hover:border-[#9B5CFF]/22 hover:bg-white/4"
															}`}
														>
															<div className='relative size-11 shrink-0'>
																<img
																	src={song.imageUrl}
																	alt={song.title}
																	className='size-full rounded-lg object-cover'
																/>
																<div className='absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity'>
																	<Play className='size-4 text-white fill-current' />
																</div>
															</div>

															<div className='flex-1 min-w-0'>
																<p className={`font-semibold text-sm truncate ${isCurrent ? "text-[#32D9FF]" : "text-white"}`}>
																	{song.title}
																</p>
																<p className='text-xs text-[#94A3B8] truncate'>{song.artist}</p>
															</div>

															<span className='text-xs text-[#94A3B8] font-mono pr-1 shrink-0'>
																{formatDuration(song.duration)}
															</span>
														</div>
													);
												})}
											</div>
										</div>
									</div>

									{/* Albums Matching Section */}
									{filteredAlbums.length > 0 && (
										<div className='space-y-4'>
											<h2 className='text-lg font-bold text-white flex items-center gap-2'>
												<Disc className='size-4 text-[#FF5CA8]' />
												Matching Albums
												<span className='px-1.5 py-0.5 rounded-full bg-[#FF5CA8]/12 text-[#FF5CA8] text-xs font-bold border border-[#FF5CA8]/25'>
													{filteredAlbums.length}
												</span>
											</h2>
											<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
												{filteredAlbums.map((album) => (
													<Link
														key={album._id}
														to={`/albums/${album._id}`}
														className='p-4 rounded-2xl glass-panel border border-[#9B5CFF]/18 hover:border-[#9B5CFF]/50 transition-all duration-300 hover:scale-[1.02] group hover:shadow-[0_12px_30px_rgba(155,92,255,0.2)]'
													>
														<div className='aspect-square rounded-xl overflow-hidden mb-3 shadow-lg relative'>
															<img
																src={album.imageUrl}
																alt={album.title}
																className='size-full object-cover group-hover:scale-105 transition-transform duration-300'
															/>
															<div className='absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors' />
														</div>
														<h4 className='font-bold text-sm text-white group-hover:text-[#32D9FF] truncate transition-colors'>
															{album.title}
														</h4>
														<p className='text-xs text-[#94A3B8] truncate mt-0.5'>
															{album.artist} · {album.releaseYear}
														</p>
													</Link>
												))}
											</div>
										</div>
									)}
								</>
							)}
						</div>
					)}
				</div>
			</ScrollArea>
		</main>
	);
};

export default SearchPage;
