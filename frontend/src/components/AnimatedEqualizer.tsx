import React from "react";

interface EqualizerProps {
	isPlaying?: boolean;
	size?: "sm" | "md" | "lg";
	className?: string;
}

export const AnimatedEqualizer: React.FC<EqualizerProps> = ({
	isPlaying = true,
	size = "sm",
	className = "",
}) => {
	const heightClass = size === "sm" ? "h-3.5" : size === "md" ? "h-5" : "h-7";
	const barWidth = size === "sm" ? "w-0.5" : size === "md" ? "w-1" : "w-1.5";
	const gapClass = size === "sm" ? "gap-0.5" : "gap-1";

	return (
		<div className={`flex items-end justify-center ${heightClass} ${gapClass} ${className}`}>
			<span
				className={`${barWidth} bg-gradient-to-t from-[#9B5CFF] to-[#32D9FF] rounded-full transition-all duration-300 ${
					isPlaying ? "animate-equalizer-1" : "h-1"
				}`}
			/>
			<span
				className={`${barWidth} bg-gradient-to-t from-[#9B5CFF] to-[#FF5CA8] rounded-full transition-all duration-300 ${
					isPlaying ? "animate-equalizer-2" : "h-1.5"
				}`}
			/>
			<span
				className={`${barWidth} bg-gradient-to-t from-[#32D9FF] to-[#9B5CFF] rounded-full transition-all duration-300 ${
					isPlaying ? "animate-equalizer-3" : "h-2"
				}`}
			/>
			<span
				className={`${barWidth} bg-gradient-to-t from-[#FF5CA8] to-[#32D9FF] rounded-full transition-all duration-300 ${
					isPlaying ? "animate-equalizer-4" : "h-1"
				}`}
			/>
		</div>
	);
};

export default AnimatedEqualizer;

