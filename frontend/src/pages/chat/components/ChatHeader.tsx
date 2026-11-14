import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";

const ChatHeader = () => {
	const { selectedUser, onlineUsers } = useChatStore();

	if (!selectedUser) return null;
	const isOnline = onlineUsers.has(selectedUser.clerkId);

	return (
		<div className='p-4 border-b border-white/5 bg-[#11162A]/60 backdrop-blur-md'>
			<div className='flex items-center gap-3.5'>
				<div className='relative'>
					<Avatar className='size-10 border border-[#9B5CFF]/30'>
						<AvatarImage src={selectedUser.imageUrl} />
						<AvatarFallback className='bg-[#11162A] text-white'>
							{selectedUser.fullName?.[0]}
						</AvatarFallback>
					</Avatar>
					<div
						className={`absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-[#080B16] ${
							isOnline ? "bg-[#32D9FF] shadow-[0_0_8px_#32D9FF]" : "bg-[#475569]"
						}`}
					/>
				</div>
				<div>
					<h2 className='font-bold text-sm text-white'>{selectedUser.fullName}</h2>
					<p className='text-xs font-medium text-[#32D9FF]'>
						{isOnline ? "Transmitting Online" : "Last seen recently"}
					</p>
				</div>
			</div>
		</div>
	);
};
export default ChatHeader;
