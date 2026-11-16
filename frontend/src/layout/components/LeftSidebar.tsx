import { useState } from "react";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { SignedIn } from "@clerk/clerk-react";
import {
	Home,
	Search,
	Library,
	Heart,
	Clock,
	PlusCircle,
	MessageSquare,
	Radio,
	TrendingUp,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MidnightAuroraLogo from "@/components/MidnightAuroraLogo";
import AnimatedEqualizer from "@/components/AnimatedEqualizer";

const LeftSidebar = () => {
	const { albums, fetchAlbums, isLoading, songs } = useMusicStore();
	const { currentSong, isPlaying } = usePlayerStore();
	const location = useLocation();
	const [activeFilter, setActiveFilter] = useState<"all" | "liked" | "recent">("all");

	useEffect(() => {
		fetchAlbums();
	}, [fetchAlbums]);

	const navItems = [
		{ label: "Home", path: "/", icon: Home },
		{ label: "Search", path: "/search", icon: Search },
	];

	return (
		<div className='h-full flex flex-col gap-2 p-2 select-none'>
			{/* Brand & Primary Navigation */}
			<div className='rounded-2xl glass-panel px-3.5 py-4 flex flex-col gap-3.5 border border-[#9B5CFF]/15 shadow-[0_8px_32px_rgba(0,0,0,0.36)]'>
				<div className='px-0.5'>
					<Link to='/' className='inline-block'>
						<MidnightAuroraLogo size='md' />
					</Link>
				</div>

				<nav className='flex flex-col gap-1'>
					{navItems.map((item) => {
						const Icon = item.icon;
						const isActive = location.pathname === item.path;
						return (
							<Link
								key={item.path}
								to={item.path}
								className={cn(
									"group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
									isActive
										? "text-[var(--text-1)] bg-gradient-to-r from-[#9B5CFF]/22 to-transparent border-l-2 border-[var(--accent-purple)] pl-2.5"
										: "text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--overlay-soft)] border-l-2 border-transparent"
								)}
							>
								<Icon
									className={cn(
										"size-4.5 transition-all duration-200 group-hover:scale-110",
										isActive
											? "text-[var(--accent-cyan)]"
											: "text-[var(--text-3)] group-hover:text-[var(--accent-purple)]"
									)}
								/>
								<span className='hidden md:inline'>{item.label}</span>
								{isActive && (
									<span className='hidden md:block ml-auto size-1.5 rounded-full bg-[#32D9FF] shadow-[0_0_6px_#32D9FF]' />
								)}
							</Link>
						);
					})}

					<SignedIn>
						<Link
							to='/chat'
							className={cn(
								"group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
								location.pathname === "/chat"
									? "text-[var(--text-1)] bg-gradient-to-r from-[#9B5CFF]/22 to-transparent border-l-2 border-[var(--accent-purple)] pl-2.5"
									: "text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--overlay-soft)] border-l-2 border-transparent"
							)}
						>
							<div className='relative'>
								<MessageSquare
									className={cn(
										"size-4.5 transition-all duration-200 group-hover:scale-110",
										location.pathname === "/chat"
											? "text-[var(--accent-cyan)]"
											: "text-[var(--text-3)] group-hover:text-[var(--accent-purple)]"
									)}
								/>
								<span className='absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-[var(--accent-cyan)] animate-pulse' />
							</div>
							<span className='hidden md:inline'>Aurora Chat</span>
						</Link>
					</SignedIn>
				</nav>
			</div>

			{/* Library & Playlists Section */}
			<div className='flex-1 rounded-2xl glass-panel px-3.5 py-4 flex flex-col gap-3 min-h-0 border border-[#9B5CFF]/15 shadow-[0_8px_32px_rgba(0,0,0,0.36)]'>
				{/* Library Header */}
				<div className='flex items-center justify-between pb-2 px-0.5 border-b border-[color-mix(in_srgb,var(--text-1)_10%,transparent)]'>
					<div className='flex items-center gap-2 text-sm font-bold text-[var(--text-1)]'>
						<div className='p-1.5 rounded-lg bg-[color-mix(in_srgb,var(--accent-purple)_14%,transparent)] text-[var(--accent-purple)] border border-[color-mix(in_srgb,var(--accent-purple)_28%,transparent)]'>
							<Library className='size-3.5' />
						</div>
						<span className='hidden md:inline tracking-wide'>Your Library</span>
					</div>

					<button
						title='Create Playlist'
						onClick={() => alert("Playlist created in your Aurora library! ✨")}
						className='hidden md:flex items-center gap-1 text-[10px] text-[var(--accent-cyan)] hover:text-[var(--text-1)] hover:bg-[color-mix(in_srgb,var(--accent-cyan)_10%,transparent)] px-2 py-1 rounded-lg border border-[color-mix(in_srgb,var(--accent-cyan)_22%,transparent)] transition-all duration-200 group'
					>
						<PlusCircle className='size-3 group-hover:rotate-90 transition-transform duration-300' />
						<span>New</span>
					</button>
				</div>

				{/* Quick Action Filters */}
				<div className='hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar'>
					{[
						{ id: "all", label: "All Albums", icon: null },
						{ id: "liked", label: "Liked", icon: Heart },
						{ id: "recent", label: "Recent", icon: Clock },
					].map((f) => (
						<button
							key={f.id}
							onClick={() => setActiveFilter(f.id as "all" | "liked" | "recent")}
							className={cn(
								"flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all duration-200 shrink-0",
								activeFilter === f.id
									? f.id === "liked"
										? "bg-gradient-to-r from-[#FF5CA8] to-[#9B5CFF] text-white shadow-[0_0_10px_rgba(255,92,168,0.4)]"
										: f.id === "recent"
										? "bg-[#32D9FF] text-[#080B16] shadow-[0_0_10px_rgba(50,217,255,0.4)]"
										: "bg-[#9B5CFF] text-white shadow-[0_0_10px_rgba(155,92,255,0.4)]"
									: "bg-white/5 text-[#94A3B8] hover:text-white hover:bg-white/8"
							)}
						>
							{f.icon && <f.icon className='size-2.5 fill-current' />}
							<span>{f.label}</span>
						</button>
					))}
				</div>

				{/* Library List */}
				<ScrollArea className='flex-1 h-[calc(100vh-420px)]'>
					<div className='space-y-1 pr-0.5'>
						{/* Liked Songs Quick Card */}
						{activeFilter !== "recent" && (
							<div
								onClick={() => {
									if (songs.length > 0) {
										usePlayerStore.getState().setCurrentSong(songs[0]);
									}
								}}
								className='p-2 hover:bg-gradient-to-r hover:from-[#FF5CA8]/12 hover:to-transparent rounded-xl flex items-center gap-2.5 group cursor-pointer transition-all duration-200 border border-transparent hover:border-[#FF5CA8]/20'
							>
								<div className='size-10 rounded-lg bg-gradient-to-br from-[#FF5CA8] via-[#9B5CFF] to-[#32D9FF] flex items-center justify-center flex-shrink-0 shadow-[0_4px_12px_rgba(255,92,168,0.3)] group-hover:scale-105 transition-transform'>
									<Heart className='size-4 text-white fill-white' />
								</div>
								<div className='flex-1 min-w-0 hidden md:block'>
									<p className='font-semibold text-sm text-white group-hover:text-[#FF5CA8] transition-colors truncate'>
										Liked Songs
									</p>
									<p className='text-[11px] text-[#94A3B8] truncate'>
										Playlist · {songs.length} tracks
									</p>
								</div>
							</div>
						)}

						{/* Now Playing Quick Card */}
						{currentSong && (
							<div className='p-2 rounded-xl flex items-center gap-2.5 border border-[#32D9FF]/20 bg-[#32D9FF]/5'>
								<div className='size-10 rounded-lg overflow-hidden shrink-0 relative'>
									<img
										src={currentSong.imageUrl}
										alt={currentSong.title}
										className='size-full object-cover'
									/>
									<div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
										<AnimatedEqualizer size='sm' isPlaying={isPlaying} />
									</div>
								</div>
								<div className='flex-1 min-w-0 hidden md:block'>
									<div className='flex items-center gap-1 mb-0.5'>
										<TrendingUp className='size-2.5 text-[#32D9FF] shrink-0' />
										<span className='text-[9px] font-bold text-[#32D9FF] uppercase tracking-wider'>
											Now Playing
										</span>
									</div>
									<p className='font-semibold text-sm text-white truncate leading-tight'>
										{currentSong.title}
									</p>
									<p className='text-[11px] text-[#94A3B8] truncate'>{currentSong.artist}</p>
								</div>
							</div>
						)}

						{/* Albums & Playlists */}
						{isLoading ? (
							<PlaylistSkeleton />
						) : (
							albums.map((album) => {
								const isAlbumPlaying =
									isPlaying && album.songs?.some((s) => s._id === currentSong?._id);

								return (
									<Link
										to={`/albums/${album._id}`}
										key={album._id}
										className={cn(
											"p-2 rounded-xl flex items-center gap-2.5 group cursor-pointer transition-all duration-200 border",
											location.pathname === `/albums/${album._id}`
												? "bg-[#9B5CFF]/12 border-[#9B5CFF]/30 text-white"
												: "hover:bg-white/4 border-transparent text-[#CBD5E1]"
										)}
									>
										<div className='relative size-10 flex-shrink-0'>
											<img
												src={album.imageUrl}
												alt={album.title}
												className='size-full rounded-lg object-cover shadow-md group-hover:scale-105 transition-transform duration-300'
											/>
											{isAlbumPlaying && (
												<div className='absolute inset-0 bg-[#080B16]/60 backdrop-blur-xs rounded-lg flex items-center justify-center'>
													<Radio className='size-3 text-[#32D9FF] animate-pulse' />
												</div>
											)}
										</div>

										<div className='flex-1 min-w-0 hidden md:block'>
											<p
												className={cn(
													"font-medium text-sm truncate transition-colors",
													isAlbumPlaying
														? "text-[#32D9FF] font-semibold"
														: "group-hover:text-white text-white"
												)}
											>
												{album.title}
											</p>
											<p className='text-[11px] text-[#94A3B8] truncate'>
												Album · {album.artist}
											</p>
										</div>
									</Link>
								);
							})
						)}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};

export default LeftSidebar;
