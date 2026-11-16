import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { Headphones, Radio, Sparkles, Users, Wifi, WifiOff } from "lucide-react";
import { useEffect } from "react";
import AnimatedEqualizer from "@/components/AnimatedEqualizer";

const FriendsActivity = () => {
	const { users, fetchUsers, onlineUsers, userActivities } = useChatStore();
	const { user } = useUser();

	useEffect(() => {
		if (user) fetchUsers();
	}, [fetchUsers, user]);

	const onlineCount = onlineUsers.size;

	return (
		<div className='h-full glass-panel rounded-2xl flex flex-col border border-[#9B5CFF]/15 select-none shadow-[0_8px_32px_rgba(0,0,0,0.36)] overflow-hidden'>
			{/* Header */}
			<div className='p-4 flex justify-between items-center border-b border-white/5 shrink-0'>
				<div className='flex items-center gap-2.5'>
					<div className='p-1.5 rounded-lg bg-[#32D9FF]/12 text-[#32D9FF] border border-[#32D9FF]/25'>
						<Users className='size-3.5' />
					</div>
					<div>
						<h2 className='font-bold text-sm text-white leading-tight'>Live Radar</h2>
						<p className='text-[10px] text-[#32D9FF] font-semibold'>Community Frequencies</p>
					</div>
				</div>

				<div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
					onlineCount > 0
						? "bg-[#32D9FF]/8 border-[#32D9FF]/25 text-[#32D9FF]"
						: "bg-white/5 border-white/10 text-[#94A3B8]"
				}`}>
					{onlineCount > 0 ? (
						<Wifi className='size-2.5' />
					) : (
						<WifiOff className='size-2.5' />
					)}
					<span>{onlineCount} Online</span>
				</div>
			</div>

			{!user && <LoginPrompt />}

			{user && (
				<ScrollArea className='flex-1 h-[calc(100vh-220px)]'>
					<div className='p-3 space-y-1.5'>
						{users.length === 0 ? (
							<div className='py-10 text-center space-y-3'>
								<div className='size-12 rounded-2xl bg-[#9B5CFF]/10 border border-[#9B5CFF]/20 flex items-center justify-center mx-auto'>
									<Headphones className='size-5 text-[#9B5CFF]' />
								</div>
								<div>
									<p className='text-xs font-semibold text-white'>No listeners yet</p>
									<p className='text-[11px] text-[#94A3B8] mt-0.5'>
										Invite friends to listen in sync!
									</p>
								</div>
							</div>
						) : (
							users.map((friend) => {
								const activity = userActivities.get(friend.clerkId);
								const isListening = activity && activity !== "Idle";
								const isOnline = onlineUsers.has(friend.clerkId);

								return (
									<div
										key={friend._id}
										className='p-2.5 rounded-xl transition-all duration-200 hover:bg-white/4 group border border-transparent hover:border-[#9B5CFF]/20'
									>
										<div className='flex items-start gap-3'>
											<div className='relative shrink-0'>
												<Avatar className='size-9 border border-[#9B5CFF]/25 shadow-sm'>
													<AvatarImage src={friend.imageUrl} alt={friend.fullName} />
													<AvatarFallback className='bg-[#11162A] text-white text-xs font-bold'>
														{friend.fullName?.[0] || "U"}
													</AvatarFallback>
												</Avatar>
												<div
													className={`absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-[#080B16] ${
														isOnline
															? "bg-[#32D9FF] shadow-[0_0_6px_#32D9FF]"
															: "bg-[#475569]"
													}`}
													aria-hidden='true'
												/>
											</div>

											<div className='flex-1 min-w-0'>
												<div className='flex items-center justify-between'>
													<span className='font-semibold text-xs text-white truncate'>
														{friend.fullName}
													</span>
													{isListening && (
														<AnimatedEqualizer size='sm' isPlaying={true} />
													)}
												</div>

												{isListening ? (
													<div className='mt-1'>
														<div className='text-xs text-[#32D9FF] font-medium truncate flex items-center gap-1'>
															<Radio className='size-2.5 shrink-0 animate-pulse' />
															<span>{activity.replace("Playing ", "").split(" by ")[0]}</span>
														</div>
														<div className='text-[10px] text-[#94A3B8] truncate'>
															{activity.split(" by ")[1] || "Unknown Artist"}
														</div>
													</div>
												) : (
													<div className='mt-1 text-[11px] text-[#94A3B8] italic'>
														{isOnline ? "Exploring soundscapes..." : "Station offline"}
													</div>
												)}
											</div>
										</div>
									</div>
								);
							})
						)}
					</div>
				</ScrollArea>
			)}
		</div>
	);
};

export default FriendsActivity;

const LoginPrompt = () => (
	<div className='flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4 select-none'>
		<div className='relative'>
			<div className='absolute -inset-3 bg-gradient-to-r from-[#9B5CFF] to-[#32D9FF] rounded-full blur-xl opacity-50 animate-pulse' />
			<div className='relative size-14 rounded-2xl bg-[#11162A] border border-[#9B5CFF]/35 flex items-center justify-center text-[#32D9FF] shadow-inner'>
				<Headphones className='size-7' />
			</div>
		</div>

		<div className='space-y-1.5 max-w-[200px]'>
			<div className='inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#9B5CFF]'>
				<Sparkles className='size-3 text-[#32D9FF]' />
				<span>Social Sync</span>
			</div>
			<h3 className='text-sm font-bold text-white'>Connect with Peers</h3>
			<p className='text-xs text-[#94A3B8] leading-relaxed'>
				Sign in to see live listening streams from friends.
			</p>
		</div>
	</div>
);
