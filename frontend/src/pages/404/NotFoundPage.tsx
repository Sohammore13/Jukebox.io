import { Home, Compass, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import MidnightAuroraLogo from "@/components/MidnightAuroraLogo";

export default function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<div className='h-screen bg-[#080B16] flex items-center justify-center relative overflow-hidden select-none'>
			{/* Ambient Aurora Orbs */}
			<div className='absolute -top-40 -left-40 size-96 bg-[#9B5CFF]/12 rounded-full blur-[120px] pointer-events-none animate-pulse' />
			<div className='absolute -bottom-40 -right-40 size-96 bg-[#32D9FF]/12 rounded-full blur-[120px] pointer-events-none animate-pulse' />
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-64 bg-[#FF5CA8]/6 rounded-full blur-[80px] pointer-events-none' />

			<div className='text-center space-y-8 px-6 relative z-10 max-w-lg glass-panel p-10 rounded-3xl border border-[#9B5CFF]/20 shadow-[0_30px_80px_rgba(0,0,0,0.6)]'>
				<div className='flex justify-center'>
					<MidnightAuroraLogo size='lg' />
				</div>

				{/* Animated 404 Icon */}
				<div className='flex items-center justify-center gap-4'>
					<div className='relative'>
						<div className='absolute inset-0 bg-gradient-to-r from-[#9B5CFF] to-[#32D9FF] rounded-2xl blur-xl opacity-50 animate-pulse' />
						<div className='relative size-16 rounded-2xl bg-[#11162A] border border-[#9B5CFF]/35 flex items-center justify-center'>
							<Music className='size-8 text-[#9B5CFF]' />
						</div>
					</div>
				</div>

				<div className='space-y-3'>
					<h1 className='text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#9B5CFF] via-[#32D9FF] to-[#FF5CA8] tracking-tight'>
						404
					</h1>
					<h2 className='text-xl font-bold text-white'>Signal Lost in the Aurora</h2>
					<p className='text-sm text-[#94A3B8] max-w-sm mx-auto leading-relaxed'>
						The frequency you're tuning into doesn't exist or has drifted into deep space. Let's get you back on track.
					</p>
				</div>

				<div className='flex flex-col sm:flex-row gap-3 justify-center items-center'>
					<Button
						onClick={() => navigate(-1)}
						variant='outline'
						className='border-white/10 text-white hover:bg-white/8 rounded-xl text-xs w-full sm:w-auto h-10 gap-2'
					>
						<Compass className='size-3.5 text-[#32D9FF]' />
						Previous Frequency
					</Button>
					<Button
						onClick={() => navigate("/")}
						className='bg-gradient-to-r from-[#9B5CFF] via-[#7B42FF] to-[#32D9FF] text-white hover:opacity-92 rounded-xl text-xs font-bold w-full sm:w-auto h-10 gap-2 shadow-[0_0_20px_rgba(155,92,255,0.4)] hover:shadow-[0_0_30px_rgba(50,217,255,0.5)] transition-shadow'
					>
						<Home className='size-3.5' />
						Aurora Dashboard
					</Button>
				</div>
			</div>
		</div>
	);
}
