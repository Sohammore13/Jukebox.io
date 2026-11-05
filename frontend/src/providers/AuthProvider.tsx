import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

const updateApiToken = (token: string | null) => {
	if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	else delete axiosInstance.defaults.headers.common["Authorization"];
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { getToken, userId } = useAuth();
	const [loading, setLoading] = useState(true);
	const { checkAdminStatus } = useAuthStore();
	const { initSocket, disconnectSocket } = useChatStore();

	useEffect(() => {
		const initAuth = async () => {
			try {
				const token = await getToken();
				updateApiToken(token);
				if (token) {
					await checkAdminStatus();
					// init socket
					if (userId) initSocket(userId);
				}
			} catch (error: any) {
				updateApiToken(null);
				console.log("Error in auth provider", error);
			} finally {
				setLoading(false);
			}
		};

		initAuth();

		// clean up
		return () => disconnectSocket();
	}, [getToken, userId, checkAdminStatus, initSocket, disconnectSocket]);

	if (loading)
		return (
			<div className='h-screen w-full flex flex-col items-center justify-center bg-[#080B16] gap-4 select-none'>
				<div className='relative size-12 flex items-center justify-center'>
					<div className='absolute inset-0 rounded-full border-2 border-t-[#9B5CFF] border-r-[#32D9FF] border-b-transparent border-l-transparent animate-spin' />
					<div className='size-2 rounded-full bg-[#32D9FF] shadow-[0_0_10px_#32D9FF]' />
				</div>
				<p className='text-xs font-semibold uppercase tracking-widest text-[#32D9FF]'>
					Initializing Midnight Aurora...
				</p>
			</div>
		);

	return <>{children}</>;
};
export default AuthProvider;
