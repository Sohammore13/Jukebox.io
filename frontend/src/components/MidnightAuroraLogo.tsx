import React from "react";

interface LogoProps {
	className?: string;
	showText?: boolean;
	size?: "sm" | "md" | "lg";
}

export const MidnightAuroraLogo: React.FC<LogoProps> = ({
	className = "",
	showText = true,
	size = "md",
}) => {
	const iconSize = size === "sm" ? "size-6" : size === "lg" ? "size-10" : "size-8";
	const textSize = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-lg";

	return (
		<div className={`flex items-center gap-2.5 group select-none ${className}`}>
			<div className={`relative ${iconSize} flex-shrink-0 flex items-center justify-center`}>
				{/* Background ambient glow */}
				<div className='absolute inset-0 rounded-xl bg-gradient-to-tr from-[#9B5CFF] via-[#32D9FF] to-[#FF5CA8] blur-[8px] opacity-70 group-hover:opacity-100 transition-opacity duration-500' />
				
				{/* Icon container */}
				<div className='relative w-full h-full rounded-xl bg-[#080B16] border border-[#9B5CFF]/30 flex items-center justify-center p-1.5 shadow-inner'>
					<svg
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='w-full h-full'
					>
						<defs>
							<linearGradient id='auroraGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
								<stop offset='0%' stopColor='#9B5CFF' />
								<stop offset='50%' stopColor='#32D9FF' />
								<stop offset='100%' stopColor='#FF5CA8' />
							</linearGradient>
						</defs>
						{/* Sound wave + aurora crescent */}
						<path
							d='M4 12V14M8 8V18M12 4V21M16 9V17M20 11V15'
							stroke='url(#auroraGradient)'
							strokeWidth='2.2'
							strokeLinecap='round'
						/>
					</svg>
				</div>
			</div>

			{showText && (
				<div className='flex flex-col min-w-0'>
					<span className={`font-bold tracking-tight text-white leading-none ${textSize}`}>
						Midnight <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#9B5CFF] via-[#32D9FF] to-[#FF5CA8]'>Aurora</span>
					</span>
					<span className='text-[10px] tracking-widest uppercase font-semibold text-[#32D9FF]/80 mt-0.5'>
						Next-Gen Audio
					</span>
				</div>
			)}
		</div>
	);
};

export default MidnightAuroraLogo;

