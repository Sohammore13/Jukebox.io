import { useAuthStore } from "@/stores/useAuthStore";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Disc, Music, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import { Link } from "react-router-dom";

const AdminPage = () => {
	const { isAdmin, isLoading } = useAuthStore();
	const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore();

	useEffect(() => {
		fetchAlbums();
		fetchSongs();
		fetchStats();
	}, [fetchAlbums, fetchSongs, fetchStats]);

	if (!isAdmin && !isLoading) {
		return (
			<div className='min-h-screen bg-[#080B16] flex items-center justify-center p-6 text-center select-none'>
				<div className='glass-panel p-8 rounded-3xl border border-[#FF5CA8]/30 max-w-md space-y-4 shadow-2xl'>
					<div className='size-14 rounded-2xl bg-[#FF5CA8]/20 border border-[#FF5CA8]/40 flex items-center justify-center text-[#FF5CA8] mx-auto'>
						<Sparkles className='size-7' />
					</div>
					<h2 className='text-2xl font-bold text-white'>Access Restricted</h2>
					<p className='text-xs text-[#94A3B8] leading-relaxed'>
						Only authorized Aurora Studio Administrators are permitted inside this frequency.
					</p>
					<Link
						to='/'
						className='inline-block px-6 py-2.5 rounded-full bg-gradient-to-r from-[#9B5CFF] to-[#32D9FF] text-white font-bold text-xs shadow-lg'
					>
						Return to Aurora Home
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-[#080B16] text-[#F5F3FF] p-6 sm:p-8 md:p-10 relative overflow-hidden select-none'>
			{/* Ambient Aurora Orbs */}
			<div className='absolute top-0 right-10 w-[500px] h-[500px] bg-[#9B5CFF]/10 rounded-full blur-[120px] pointer-events-none' />
			<div className='absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#32D9FF]/10 rounded-full blur-[120px] pointer-events-none' />

			<div className='max-w-7xl mx-auto relative z-10'>
				<Header />

				<DashboardStats />

				<Tabs defaultValue='songs' className='space-y-6'>
					<TabsList className='p-1.5 glass-panel border border-[#9B5CFF]/20 rounded-2xl bg-[#11162A]/80'>
						<TabsTrigger
							value='songs'
							className='rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#9B5CFF] data-[state=active]:to-[#7B42FF] data-[state=active]:text-white font-semibold text-xs px-5 py-2 transition-all'
						>
							<Music className='mr-2 size-4 text-[#32D9FF]' />
							Tracks Library
						</TabsTrigger>
						<TabsTrigger
							value='albums'
							className='rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#9B5CFF] data-[state=active]:to-[#7B42FF] data-[state=active]:text-white font-semibold text-xs px-5 py-2 transition-all'
						>
							<Disc className='mr-2 size-4 text-[#FF5CA8]' />
							Master Albums
						</TabsTrigger>
					</TabsList>

					<TabsContent value='songs'>
						<SongsTabContent />
					</TabsContent>
					<TabsContent value='albums'>
						<AlbumsTabContent />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default AdminPage;
