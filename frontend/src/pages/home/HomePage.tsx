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
							<div className='inline-flex items-center gap-1.5 text-xs font-semibold text-[#32D9FF] uppercase tracking-wider mb-1'>
								<Sparkles className='size-3.5 text-[#32D9FF]' />
								<span>Aurora Sound Matrix</span>
							</div>
							<h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white'>
								{greeting}
								{user?.firstName && (
									<span className='text-transparent bg-clip-text bg-gradient-to-r from-[#9B5CFF] via-[#32D9FF] to-[#FF5CA8]'>
										, {user.firstName}
									</span>
								)}
							</h1>
						</div>

						<div className='text-xs text-[#94A3B8] font-medium hidden sm:block'>
							✨ 320kbps High-Definition Spatial Sound
						</div>
					</div>

					{/* 1. Hero Spotlight Banner */}
					<HeroBanner />

					{/* 2. Recently Played / Quick Mix Section */}
					<div className='mb-6'>
						<div className='flex items-center gap-2 mb-4'>
							<Clock className='size-4 text-[#9B5CFF]' />
							<h2 className='text-lg sm:text-xl font-bold text-white'>
								Recently Played & Quick Mix
							</h2>
						</div>
						<FeaturedSection />
					</div>

					{/* 3. Made For You Section */}
					<SectionGrid
						title='Crafted For You'
						subtitle='Algorithmically tuned to your cosmic frequency'
						songs={madeForYouSongs}
						isLoading={isLoading}
					/>

					{/* 4. Popular Artists Section */}
					<PopularArtistsSection />

					{/* 5. Trending Tracks Section */}
					<SectionGrid
						title='Trending Across Aurora'
						subtitle='Most streamed tracks in this galactic quadrant'
						songs={trendingSongs}
						isLoading={isLoading}
					/>
				</div>
			</ScrollArea>
		</main>
	);
};

export default HomePage;
