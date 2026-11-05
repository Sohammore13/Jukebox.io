import { Card, CardContent } from "@/components/ui/card";
import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MidnightAuroraLogo from "@/components/MidnightAuroraLogo";

const AuthCallbackPage = () => {
	const { isLoaded, user } = useUser();
	const navigate = useNavigate();
	const syncAttempted = useRef(false);

	useEffect(() => {
		const syncUser = async () => {
			if (!isLoaded || !user || syncAttempted.current) return;

			try {
				syncAttempted.current = true;

				await axiosInstance.post("/auth/callback", {
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					imageUrl: user.imageUrl,
				});
			} catch (error) {
				console.log("Error in auth callback", error);
			} finally {
				navigate("/");
			}
		};

		syncUser();
	}, [isLoaded, user, navigate]);

	return (
		<div className='h-screen w-full bg-[#080B16] flex items-center justify-center p-4 relative overflow-hidden select-none'>
			<div className='absolute -top-40 -left-40 size-96 bg-[#9B5CFF]/15 rounded-full blur-[120px] pointer-events-none' />
			<div className='absolute -bottom-40 -right-40 size-96 bg-[#32D9FF]/15 rounded-full blur-[120px] pointer-events-none' />

			<Card className='w-[90%] max-w-md glass-panel border border-[#9B5CFF]/30 rounded-3xl shadow-2xl relative z-10'>
				<CardContent className='flex flex-col items-center gap-4 py-8 text-center'>
					<MidnightAuroraLogo size='md' />

					<div className='relative size-12 flex items-center justify-center mt-2'>
						<div className='absolute inset-0 rounded-full border-2 border-t-[#9B5CFF] border-r-[#32D9FF] border-b-transparent border-l-transparent animate-spin' />
						<div className='size-2 rounded-full bg-[#32D9FF] shadow-[0_0_10px_#32D9FF]' />
					</div>

					<div className='space-y-1'>
						<h3 className='text-white text-lg font-bold'>Synchronizing Cosmic Identity</h3>
						<p className='text-[#94A3B8] text-xs'>Calibrating spatial audio stream...</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
export default AuthCallbackPage;
