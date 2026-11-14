import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types";
import { Pause, Play } from "lucide-react";

interface PlayButtonProps {
	song: Song;
	size?: "sm" | "md" | "lg";
	className?: string;
}

const PlayButton = ({ song, size = "md", className = "" }: PlayButtonProps) => {
	const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore();
	const isCurrentSong = currentSong?._id === song._id;

	const handlePlay = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (isCurrentSong) {
			togglePlay();
		} else {
			setCurrentSong(song);
		}
	};

	const sizeClasses = {
		sm: "size-9",
		md: "size-11",
		lg: "size-14",
	}[size];

	const iconSizes = {
		sm: "size-4",
		md: "size-5",
		lg: "size-6",
	}[size];

	return (
		<Button
			size='icon'
			onClick={handlePlay}
			aria-label={isCurrentSong && isPlaying ? "Pause" : "Play"}
			className={`rounded-full shadow-lg transition-all duration-300 transform active:scale-95 ${sizeClasses} ${
				isCurrentSong && isPlaying
					? "bg-gradient-to-r from-[#9B5CFF] to-[#32D9FF] text-white shadow-[0_0_20px_rgba(155,92,255,0.6)] opacity-100 scale-100"
					: "bg-gradient-to-r from-[#9B5CFF] via-[#7B42FF] to-[#32D9FF] text-white shadow-[0_4px_16px_rgba(155,92,255,0.4)] hover:shadow-[0_0_25px_rgba(50,217,255,0.6)] hover:scale-105"
			} ${className}`}
		>
			{isCurrentSong && isPlaying ? (
				<Pause className={`${iconSizes} fill-current`} />
			) : (
				<Play className={`${iconSizes} fill-current ml-0.5`} />
			)}
		</Button>
	);
};

export default PlayButton;
