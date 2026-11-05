import { Home, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import MidnightAuroraLogo from "@/components/MidnightAuroraLogo";

export default function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<div className='h-screen bg-[#080B16] flex items-center justify-center relative overflow-hidden select-none'>
			{/* Ambient Aurora Orbs */}
			<div className='absolute -top-40 -left-40 size-96 bg-[#9B5CFF]/15 rounded-full blur-[120px] pointer-events-none' />
			<div className='absolute -bottom-40 -right-40 size-96 bg-[#32D9FF]/15 rounded-full blur-[120px] pointer-events-none' />

			<div className='text-center space-y-6 px-4 relative z-10 max-w-lg glass-panel p-10 rounded-3xl border border-[#9B5CFF]/20 shadow-2xl'>
				<div className='flex justify-center'>
					<MidnightAuroraLogo size='lg' />
				</div>

				<div className='space-y-3'>
					<h1 className='text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#9B5CFF] via-[#32D9FF] to-[#FF5CA8] tracking-tight'>
						404
					</h1>
					<h2 className='text-xl font-bold text-white'>Signal Lost in the Aurora</h2>
					<p className='text-xs text-[#94A3B8] max-w-sm mx-auto leading-relaxed'>
						The frequency you are trying to tune into does not exist or has drifted into deep space.
					</p>
				</div>

				<div className='flex flex-col sm:flex-row gap-3 justify-center items-center pt-2'>
					<Button
						onClick={() => navigate(-1)}
						variant='outline'
						className='border-white/10 text-white hover:bg-white/10 rounded-xl text-xs w-full sm:w-auto h-10'
					>
						<Compass className='mr-2 size-3.5 text-[#32D9FF]' />
						Previous Frequency
					</Button>
					<Button
						onClick={() => navigate("/")}
						className='bg-gradient-to-r from-[#9B5CFF] to-[#32D9FF] text-white hover:opacity-90 rounded-xl text-xs font-bold w-full sm:w-auto h-10 shadow-[0_0_20px_rgba(155,92,255,0.4)]'
					>
						<Home className='mr-2 size-3.5' />
						Aurora Dashboard
					</Button>
				</div>
			</div>
		</div>
	);
}
