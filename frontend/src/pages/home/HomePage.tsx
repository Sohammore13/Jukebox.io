import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect, useMemo } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";
import HeroBanner from "./components/HeroBanner";
import PopularArtistsSection from "./components/PopularArtistsSection";
import { useUser } from "@clerk/clerk-react";
import { Sparkles, Clock } from "lucide-react";

const HomePage = () => {
	const {
		fetchFeaturedSongs,
		fetchMadeForYouSongs,
		fetchTrendingSongs,
		fetchAlbums,
		fetchSongs,
		isLoading,
		madeForYouSongs,
		featuredSongs,
		trendingSongs,
	} = useMusicStore();

	const { initializeQueue } = usePlayerStore();
	const { user } = useUser();

	useEffect(() => {
		fetchFeaturedSongs();
		fetchMadeForYouSongs();
		fetchTrendingSongs();
		fetchAlbums();
		fetchSongs();
	}, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs, fetchAlbums, fetchSongs]);

	useEffect(() => {
		if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
			const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
			initializeQueue(allSongs);
		}
	}, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);

	// Personalized greeting based on local time
	const greeting = useMemo(() => {
		const hour = new Date().getHours();
		if (hour < 12) return "Good morning";
		if (hour < 18) return "Good afternoon";
		return "Good evening";
	}, []);

	return (
		<main className='rounded-2xl overflow-hidden h-full flex flex-col glass-panel border border-[#9B5CFF]/15 relative select-none'>
			{/* Ambient Aurora Glow in background */}
			<div className='absolute top-0 right-10 w-[500px] h-[500px] bg-gradient-to-b from-[#9B5CFF]/15 via-[#32D9FF]/10 to-transparent rounded-full blur-[100px] pointer-events-none -z-10 animate-aurora-flow' />
			<div className='absolute bottom-1/3 left-10 w-[400px] h-[400px] bg-gradient-to-tr from-[#FF5CA8]/10 via-[#9B5CFF]/10 to-transparent rounded-full blur-[90px] pointer-events-none -z-10' />

			<Topbar />

			<ScrollArea className='flex-1 h-[calc(100vh-170px)]'>
				<div className='p-5 sm:p-7 md:p-9 max-w-7xl mx-auto'>
					{/* Personalized Greeting Header */}
					<div className='mb-7 flex flex-col sm:flex-row sm:items-end justify-between gap-3'>
						<div>
							<div className='inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-wider mb-1.5'>
								<Sparkles className='size-3.5 text-[var(--accent-cyan)]' />
								<span>Jukebox · Your Personal Sound Universe</span>
							</div>
							<h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-1)]'>
								{greeting}
								{user?.firstName && (
									<span className='text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-purple)] via-[var(--accent-cyan)] to-[var(--accent-pink)]'>
										, {user.firstName}
									</span>
								)}
							</h1>
							<p className='text-xs text-[var(--text-3)] mt-1.5 font-medium'>
								Ready to discover something extraordinary today?
							</p>
						</div>

						<div className='flex items-center gap-2 text-xs text-[var(--text-3)] font-medium hidden sm:flex'>
							<div className='flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel border border-[#9B5CFF]/20'>
								<span className='size-1.5 rounded-full bg-[#32D9FF] animate-pulse' />
								<span>✨ 320kbps Lossless Audio</span>
							</div>
						</div>
					</div>

					{/* 1. Hero Spotlight Banner */}
					<HeroBanner />

					{/* 2. Recently Played / Quick Mix Section */}
					<div className='mb-8'>
						<div className='flex items-center justify-between mb-4'>
							<div className='flex items-center gap-2'>
								<div className='p-1.5 rounded-lg bg-[color-mix(in_srgb,var(--accent-purple)_15%,transparent)] border border-[color-mix(in_srgb,var(--accent-purple)_30%,transparent)]'>
									<Clock className='size-3.5 text-[var(--accent-purple)]' />
								</div>
								<h2 className='text-lg sm:text-xl font-bold text-[var(--text-1)]'>
									Recently Played &amp; Quick Mix
								</h2>
							</div>
							<button className='text-xs font-semibold text-[var(--accent-cyan)] hover:text-[var(--text-1)] transition-colors hidden sm:block'>
								View All →
							</button>
						</div>
						<FeaturedSection />
					</div>

					{/* 3. Made For You Section */}
					<SectionGrid
						title='Crafted For You'
						subtitle='Algorithmically tuned to your listening frequency'
						songs={madeForYouSongs}
						isLoading={isLoading}
					/>

					{/* 4. Popular Artists Section */}
					<PopularArtistsSection />

					{/* 5. Trending Tracks Section */}
					<SectionGrid
						title='Trending Now'
						subtitle='Most streamed tracks across the cosmos right now'
						songs={trendingSongs}
						isLoading={isLoading}
					/>

					{/* Footer padding */}
					<div className='h-4' />
				</div>
			</ScrollArea>
		</main>
	);
};

export default HomePage;
