import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import FriendsActivity from "./components/FriendsActivity";
import AudioPlayer from "./components/AudioPlayer";
import { PlaybackControls } from "./components/PlaybackControls";
import { useEffect, useState } from "react";

const MainLayout = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return (
		<div className='h-screen bg-[#080B16] text-[#F5F3FF] flex flex-col overflow-hidden relative'>
			{/* Ambient Aurora Gradient Orbs behind entire app */}
			<div className='fixed -top-40 -left-40 w-96 h-96 bg-[#9B5CFF]/10 rounded-full blur-[120px] pointer-events-none' />
			<div className='fixed top-1/2 -right-40 w-96 h-96 bg-[#32D9FF]/10 rounded-full blur-[120px] pointer-events-none' />

			<ResizablePanelGroup direction='horizontal' className='flex-1 flex h-full overflow-hidden p-2 gap-2'>
				<AudioPlayer />

				{/* Left Sidebar */}
				<ResizablePanel defaultSize={22} minSize={isMobile ? 0 : 15} maxSize={30} className='transition-all duration-300'>
					<LeftSidebar />
				</ResizablePanel>

				<ResizableHandle className='w-1.5 bg-[#9B5CFF]/10 hover:bg-[#32D9FF]/40 rounded-full transition-colors' />

				{/* Center Main View */}
				<ResizablePanel defaultSize={isMobile ? 100 : 58} className='transition-all duration-300'>
					<Outlet />
				</ResizablePanel>

				{!isMobile && (
					<>
						<ResizableHandle className='w-1.5 bg-[#9B5CFF]/10 hover:bg-[#32D9FF]/40 rounded-full transition-colors' />

						{/* Right Sidebar: Friends Activity */}
						<ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0} className='transition-all duration-300'>
							<FriendsActivity />
						</ResizablePanel>
					</>
				)}
			</ResizablePanelGroup>

			{/* Floating Bottom Music Player */}
			<PlaybackControls />
		</div>
	);
};

export default MainLayout;
