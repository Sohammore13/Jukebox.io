import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { Headphones, Radio, Sparkles, Users } from "lucide-react";
import { useEffect } from "react";
import AnimatedEqualizer from "@/components/AnimatedEqualizer";

const FriendsActivity = () => {
	const { users, fetchUsers, onlineUsers, userActivities } = useChatStore();
	const { user } = useUser();

	useEffect(() => {
		if (user) fetchUsers();
	}, [fetchUsers, user]);

	return (
		<div className='h-full glass-panel rounded-2xl flex flex-col border border-[#9B5CFF]/15 select-none shadow-[0_8px_32px_rgba(0,0,0,0.36)]'>
			{/* Header */}
			<div className='p-4.5 flex justify-between items-center border-b border-white/5'>
				<div className='flex items-center gap-2.5'>
					<div className='p-1.5 rounded-lg bg-[#32D9FF]/15 text-[#32D9FF] border border-[#32D9FF]/30'>
						<Users className='size-4' />
					</div>
					<div>
						<h2 className='font-bold text-sm text-white'>Live Radar</h2>
						<p className='text-[10px] text-[#32D9FF] font-medium'>Community Frequencies</p>
					</div>
				</div>

				<div className='flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#11162A] border border-[#9B5CFF]/20 text-[10px] text-[#94A3B8]'>
					<span className='size-1.5 rounded-full bg-[#32D9FF] animate-pulse' />
					<span>{onlineUsers.size} Online</span>
				</div>
			</div>

			{!user && <LoginPrompt />}

			{user && (
				<ScrollArea className='flex-1 h-[calc(100vh-220px)]'>
					<div className='p-3.5 space-y-2'>
						{users.length === 0 ? (
							<div className='py-8 text-center text-xs text-[#94A3B8]'>
								No listeners nearby yet. Invite friends to listen in sync!
							</div>
						) : (
							users.map((friend) => {
								const activity = userActivities.get(friend.clerkId);
								const isListening = activity && activity !== "Idle";
								const isOnline = onlineUsers.has(friend.clerkId);

								return (
									<div
										key={friend._id}
										className='p-2.5 rounded-xl transition-all duration-200 glass-panel border border-transparent hover:border-[#9B5CFF]/25 hover:bg-white/5 group'
									>
										<div className='flex items-start gap-3'>
											<div className='relative'>
												<Avatar className='size-9 border border-[#9B5CFF]/30 shadow-sm'>
													<AvatarImage src={friend.imageUrl} alt={friend.fullName} />
													<AvatarFallback className='bg-[#11162A] text-white text-xs font-bold'>
														{friend.fullName?.[0] || "U"}
													</AvatarFallback>
												</Avatar>
												<div
													className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-[#080B16] ${
														isOnline
															? "bg-[#32D9FF] shadow-[0_0_8px_#32D9FF]"
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
														{isOnline ? "Exploring soundscapes" : "Station offline"}
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
	<div className='h-full flex flex-col items-center justify-center p-6 text-center space-y-4 select-none'>
		<div className='relative'>
			<div className='absolute -inset-2 bg-gradient-to-r from-[#9B5CFF] to-[#32D9FF] rounded-full blur-xl opacity-60 animate-pulse' />
			<div className='relative size-14 rounded-full bg-[#11162A] border border-[#9B5CFF]/40 flex items-center justify-center text-[#32D9FF] shadow-inner'>
				<Headphones className='size-7' />
			</div>
		</div>

		<div className='space-y-1.5 max-w-[220px]'>
			<div className='inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#9B5CFF]'>
				<Sparkles className='size-3 text-[#32D9FF]' />
				<span>Social Sync</span>
			</div>
			<h3 className='text-base font-bold text-white'>Connect with Peers</h3>
			<p className='text-xs text-[#94A3B8] leading-relaxed'>
				Sign in to witness live listening streams from friends across the cosmos.
			</p>
		</div>
	</div>
);
