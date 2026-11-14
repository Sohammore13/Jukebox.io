import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { Send } from "lucide-react";
import { useState } from "react";

const MessageInput = () => {
	const [newMessage, setNewMessage] = useState("");
	const { user } = useUser();
	const { selectedUser, sendMessage } = useChatStore();

	const handleSend = () => {
		if (!selectedUser || !user || !newMessage.trim()) return;
		sendMessage(selectedUser.clerkId, user.id, newMessage.trim());
		setNewMessage("");
	};

	return (
		<div className='p-4 border-t border-white/5 bg-[#11162A]/60 backdrop-blur-md'>
			<div className='flex items-center gap-2 max-w-4xl mx-auto'>
				<Input
					placeholder={`Message ${selectedUser?.fullName || "friend"}...`}
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					className='bg-[#080B16]/80 border border-[#9B5CFF]/20 focus-visible:border-[#32D9FF] text-white placeholder-[#94A3B8] rounded-xl h-11'
					onKeyDown={(e) => e.key === "Enter" && handleSend()}
				/>

				<Button
					size={"icon"}
					onClick={handleSend}
					disabled={!newMessage.trim()}
					className='size-11 rounded-xl bg-gradient-to-r from-[#9B5CFF] to-[#32D9FF] text-white hover:opacity-90 shadow-[0_0_15px_rgba(155,92,255,0.4)] disabled:opacity-30 shrink-0'
				>
					<Send className='size-4' />
				</Button>
			</div>
		</div>
	);
};
export default MessageInput;
