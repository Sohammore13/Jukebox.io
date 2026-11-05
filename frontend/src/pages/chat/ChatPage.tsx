import Topbar from "@/components/Topbar";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import UsersList from "./components/UsersList";
import ChatHeader from "./components/ChatHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import MessageInput from "./components/MessageInput";
import MidnightAuroraLogo from "@/components/MidnightAuroraLogo";
import { Radio } from "lucide-react";

const formatTime = (date: string) => {
	return new Date(date).toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
};

const ChatPage = () => {
	const { user } = useUser();
	const { messages, selectedUser, fetchUsers, fetchMessages } = useChatStore();

	useEffect(() => {
		if (user) fetchUsers();
	}, [fetchUsers, user]);

	useEffect(() => {
		if (selectedUser) fetchMessages(selectedUser.clerkId);
	}, [selectedUser, fetchMessages]);

	return (
		<main className='h-full rounded-2xl glass-panel border border-[#9B5CFF]/15 overflow-hidden flex flex-col select-none relative'>
			{/* Ambient Aurora Glow */}
			<div className='absolute top-0 right-10 w-96 h-96 bg-[#9B5CFF]/10 rounded-full blur-3xl pointer-events-none -z-10' />

			<Topbar />

			<div className='grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] flex-1 overflow-hidden'>
				<UsersList />

				{/* Chat Messages Panel */}
				<div className='flex flex-col h-full bg-[#080B16]/50'>
					{selectedUser ? (
						<>
							<ChatHeader />

							{/* Messages */}
							<ScrollArea className='flex-1 h-[calc(100vh-320px)]'>
								<div className='p-4 sm:p-6 space-y-4 max-w-4xl mx-auto'>
									{messages.map((message) => {
										const isMe = message.senderId === user?.id;

										return (
											<div
												key={message._id}
												className={`flex items-start gap-3 ${
													isMe ? "flex-row-reverse" : ""
												}`}
											>
												<Avatar className='size-8 border border-[#9B5CFF]/30 shadow-md'>
													<AvatarImage
														src={isMe ? user?.imageUrl : selectedUser.imageUrl}
													/>
													<AvatarFallback className='bg-[#11162A] text-white text-xs'>
														{isMe ? "Me" : selectedUser.fullName?.[0]}
													</AvatarFallback>
												</Avatar>

												<div
													className={`rounded-2xl px-4 py-2.5 max-w-[75%] sm:max-w-[65%] shadow-md ${
														isMe
															? "bg-gradient-to-r from-[#9B5CFF] to-[#7B42FF] text-white shadow-[0_0_15px_rgba(155,92,255,0.3)] rounded-tr-none"
															: "glass-panel bg-[#11162A]/90 border border-white/10 text-white rounded-tl-none"
													}`}
												>
													<p className='text-sm leading-relaxed'>{message.content}</p>
													<span
														className={`text-[10px] mt-1 block font-mono ${
															isMe ? "text-purple-200" : "text-[#94A3B8]"
														}`}
													>
														{formatTime(message.createdAt)}
													</span>
												</div>
											</div>
										);
									})}
								</div>
							</ScrollArea>

							<MessageInput />
						</>
					) : (
						<NoConversationPlaceholder />
					)}
				</div>
			</div>
		</main>
	);
};

export default ChatPage;

const NoConversationPlaceholder = () => (
	<div className='flex flex-col items-center justify-center h-full space-y-5 p-6 text-center select-none'>
		<div className='relative'>
			<div className='absolute -inset-3 bg-gradient-to-r from-[#9B5CFF] to-[#32D9FF] rounded-full blur-xl opacity-60 animate-pulse' />
			<div className='relative size-16 rounded-2xl bg-[#11162A] border border-[#9B5CFF]/40 flex items-center justify-center shadow-inner'>
				<Radio className='size-8 text-[#32D9FF]' />
			</div>
		</div>

		<div className='space-y-1.5 max-w-sm'>
			<h3 className='text-lg font-bold text-white'>No Active Aurora Frequency</h3>
			<p className='text-xs text-[#94A3B8] leading-relaxed'>
				Choose a friend from the transmission list on the left to start sharing beats and messages in real-time.
			</p>
		</div>

		<MidnightAuroraLogo size='sm' showText={false} />
	</div>
);
