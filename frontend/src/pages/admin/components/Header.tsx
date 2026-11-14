import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import MidnightAuroraLogo from "@/components/MidnightAuroraLogo";
import { ArrowLeft } from "lucide-react";

const Header = () => {
	return (
		<div className='flex items-center justify-between mb-8 select-none'>
			<div className='flex items-center gap-5'>
				<Link to='/' className='p-2 rounded-xl glass-panel text-[#94A3B8] hover:text-white border border-[#9B5CFF]/20 hover:border-[#32D9FF]/40 transition-colors'>
					<ArrowLeft className='size-5' />
				</Link>

				<Link to='/'>
					<MidnightAuroraLogo size='md' />
				</Link>

				<div className='hidden sm:block border-l border-white/10 pl-5'>
					<div className='flex items-center gap-2'>
						<h1 className='text-2xl font-black text-white tracking-tight'>Aurora Control Matrix</h1>
						<span className='px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#9B5CFF]/20 text-[#32D9FF] border border-[#32D9FF]/30'>
							Admin Studio
						</span>
					</div>
					<p className='text-xs text-[#94A3B8] mt-0.5'>Publish, manage and monitor your audio catalog</p>
				</div>
			</div>

			<div className='flex items-center gap-3'>
				<div className='p-1 rounded-full ring-2 ring-[#9B5CFF]/40'>
					<UserButton />
				</div>
			</div>
		</div>
	);
};
export default Header;
