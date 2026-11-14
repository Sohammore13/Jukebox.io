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
} from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MidnightAuroraLogo from "@/components/MidnightAuroraLogo";

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
		<div className='h-full flex flex-col gap-2.5 p-2 select-none'>
			{/* Brand & Primary Navigation */}
			<div className='rounded-2xl glass-panel p-4 flex flex-col gap-4 border border-[#9B5CFF]/15 shadow-[0_8px_32px_rgba(0,0,0,0.36)]'>
				<div className='px-1 pt-1'>
					<Link to='/' className='inline-block'>
						<MidnightAuroraLogo size='md' />
					</Link>
				</div>

				<nav className='flex flex-col gap-1.5'>
					{navItems.map((item) => {
						const Icon = item.icon;
						const isActive = location.pathname === item.path;
						return (
							<Link
								key={item.path}
								to={item.path}
								className={cn(
									"group relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
									isActive
										? "text-white bg-gradient-to-r from-[#9B5CFF]/25 to-transparent border-l-2 border-[#9B5CFF] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_0_20px_rgba(155,92,255,0.2)]"
										: "text-[#CBD5E1] hover:text-white hover:bg-white/5"
								)}
							>
								<Icon
									className={cn(
										"size-5 transition-transform duration-300 group-hover:scale-110",
										isActive
											? "text-[#32D9FF] drop-shadow-[0_0_8px_rgba(50,217,255,0.6)]"
											: "text-[#94A3B8] group-hover:text-[#9B5CFF]"
									)}
								/>
								<span className='hidden md:inline'>{item.label}</span>
								{isActive && (
									<span className='hidden md:block ml-auto size-1.5 rounded-full bg-[#32D9FF] shadow-[0_0_8px_#32D9FF]' />
								)}
							</Link>
						);
					})}

					<SignedIn>
						<Link
							to='/chat'
							className={cn(
								"group relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
								location.pathname === "/chat"
									? "text-white bg-gradient-to-r from-[#9B5CFF]/25 to-transparent border-l-2 border-[#9B5CFF] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_0_20px_rgba(155,92,255,0.2)]"
									: "text-[#CBD5E1] hover:text-white hover:bg-white/5"
							)}
						>
							<div className='relative'>
								<MessageSquare
									className={cn(
										"size-5 transition-transform duration-300 group-hover:scale-110",
										location.pathname === "/chat"
											? "text-[#32D9FF] drop-shadow-[0_0_8px_rgba(50,217,255,0.6)]"
											: "text-[#94A3B8] group-hover:text-[#9B5CFF]"
									)}
								/>
								<span className='absolute -top-0.5 -right-0.5 size-2 rounded-full bg-[#32D9FF] animate-pulse' />
							</div>
							<span className='hidden md:inline'>Aurora Chat</span>
						</Link>
					</SignedIn>
				</nav>
			</div>

			{/* Library & Playlists Section */}
			<div className='flex-1 rounded-2xl glass-panel p-4 flex flex-col gap-3 min-h-0 border border-[#9B5CFF]/15 shadow-[0_8px_32px_rgba(0,0,0,0.36)]'>
				{/* Library Header */}
				<div className='flex items-center justify-between pb-1 px-1 border-b border-white/5'>
					<div className='flex items-center gap-2.5 text-sm font-semibold text-white'>
						<div className='p-1.5 rounded-lg bg-[#9B5CFF]/15 text-[#9B5CFF] border border-[#9B5CFF]/30'>
							<Library className='size-4' />
						</div>
						<span className='hidden md:inline tracking-wide'>Your Library</span>
					</div>

					<button
						title='Create Playlist'
						onClick={() => alert("Playlist created in your Aurora library! ✨")}
						className='hidden md:flex items-center gap-1 text-xs text-[#32D9FF] hover:text-white hover:bg-[#32D9FF]/10 px-2 py-1 rounded-lg border border-[#32D9FF]/20 transition-all duration-200 group'
					>
						<PlusCircle className='size-3.5 group-hover:rotate-90 transition-transform duration-300' />
						<span>New</span>
					</button>
				</div>

				{/* Quick Action Filters */}
				<div className='hidden md:flex items-center gap-1.5 py-1 overflow-x-auto no-scrollbar'>
					<button
						onClick={() => setActiveFilter("all")}
						className={cn(
							"px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 shrink-0",
							activeFilter === "all"
								? "bg-[#9B5CFF] text-white shadow-[0_0_12px_rgba(155,92,255,0.5)]"
								: "bg-white/5 text-[#94A3B8] hover:text-white hover:bg-white/10"
						)}
					>
						All Albums
					</button>
					<button
						onClick={() => setActiveFilter("liked")}
						className={cn(
							"flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 shrink-0",
							activeFilter === "liked"
								? "bg-gradient-to-r from-[#FF5CA8] to-[#9B5CFF] text-white shadow-[0_0_12px_rgba(255,92,168,0.5)]"
								: "bg-white/5 text-[#94A3B8] hover:text-white hover:bg-white/10"
						)}
					>
						<Heart className='size-3 fill-current' />
						<span>Liked</span>
					</button>
					<button
						onClick={() => setActiveFilter("recent")}
						className={cn(
							"flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 shrink-0",
							activeFilter === "recent"
								? "bg-[#32D9FF] text-[#080B16] font-semibold shadow-[0_0_12px_rgba(50,217,255,0.5)]"
								: "bg-white/5 text-[#94A3B8] hover:text-white hover:bg-white/10"
						)}
					>
						<Clock className='size-3' />
						<span>Recent</span>
					</button>
				</div>

				{/* Library List */}
				<ScrollArea className='flex-1 h-[calc(100vh-420px)]'>
					<div className='space-y-1.5 pr-1'>
						{/* Liked Songs Quick Card */}
						{activeFilter !== "recent" && (
							<div
								onClick={() => {
									if (songs.length > 0) {
										usePlayerStore.getState().setCurrentSong(songs[0]);
									}
								}}
								className='p-2 hover:bg-gradient-to-r hover:from-[#FF5CA8]/15 hover:to-transparent rounded-xl flex items-center gap-3 group cursor-pointer transition-all duration-200 border border-transparent hover:border-[#FF5CA8]/20'
							>
								<div className='size-11 rounded-lg bg-gradient-to-br from-[#FF5CA8] via-[#9B5CFF] to-[#32D9FF] flex items-center justify-center flex-shrink-0 shadow-[0_4px_12px_rgba(255,92,168,0.3)] group-hover:scale-105 transition-transform'>
									<Heart className='size-5 text-white fill-white' />
								</div>
								<div className='flex-1 min-w-0 hidden md:block'>
									<p className='font-semibold text-sm text-white group-hover:text-[#FF5CA8] transition-colors truncate'>
										Liked Songs
									</p>
									<p className='text-xs text-[#94A3B8] truncate'>
										Playlist • {songs.length} tracks
									</p>
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
											"p-2 rounded-xl flex items-center gap-3 group cursor-pointer transition-all duration-200 border",
											location.pathname === `/albums/${album._id}`
												? "bg-[#9B5CFF]/15 border-[#9B5CFF]/30 text-white"
												: "hover:bg-white/5 border-transparent text-[#CBD5E1]"
										)}
									>
										<div className='relative size-11 flex-shrink-0'>
											<img
												src={album.imageUrl}
												alt={album.title}
												className='size-full rounded-lg object-cover shadow-md group-hover:scale-105 transition-transform duration-300'
											/>
											{isAlbumPlaying && (
												<div className='absolute inset-0 bg-[#080B16]/60 backdrop-blur-xs rounded-lg flex items-center justify-center'>
													<Radio className='size-4 text-[#32D9FF] animate-pulse' />
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
											<p className='text-xs text-[#94A3B8] truncate'>
												Album • {album.artist}
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
