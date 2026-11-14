import UsersListSkeleton from "@/components/skeletons/UsersListSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";

const UsersList = () => {
	const { users, selectedUser, isLoading, setSelectedUser, onlineUsers } = useChatStore();

	return (
		<div className='border-r border-white/5 bg-[#080B16]/60 backdrop-blur-md'>
			<div className='flex flex-col h-full'>
				<ScrollArea className='h-[calc(100vh-220px)]'>
					<div className='space-y-1.5 p-3'>
						{isLoading ? (
							<UsersListSkeleton />
						) : (
							users.map((user) => {
								const isSelected = selectedUser?.clerkId === user.clerkId;
								const isOnline = onlineUsers.has(user.clerkId);

								return (
									<div
										key={user._id}
										onClick={() => setSelectedUser(user)}
										className={`flex items-center justify-center lg:justify-start gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-200 border ${
											isSelected
												? "bg-[#9B5CFF]/20 border-[#9B5CFF]/40 text-white shadow-[0_0_15px_rgba(155,92,255,0.2)]"
												: "hover:bg-white/5 border-transparent text-[#CBD5E1]"
										}`}
									>
										<div className='relative shrink-0'>
											<Avatar className='size-9 sm:size-10 border border-[#9B5CFF]/30'>
												<AvatarImage src={user.imageUrl} />
												<AvatarFallback className='bg-[#11162A] text-white text-xs font-bold'>
													{user.fullName?.[0]}
												</AvatarFallback>
											</Avatar>
											<div
												className={`absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-[#080B16] ${
													isOnline
														? "bg-[#32D9FF] shadow-[0_0_8px_#32D9FF]"
														: "bg-[#475569]"
												}`}
											/>
										</div>

										<div className='flex-1 min-w-0 lg:block hidden'>
											<span className='font-semibold text-xs truncate block'>
												{user.fullName}
											</span>
											<span className='text-[10px] text-[#94A3B8]'>
												{isOnline ? "Online" : "Offline"}
											</span>
										</div>
									</div>
								);
							})
						)}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};

export default UsersList;
