import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/stores/useThemeStore";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
	className?: string;
};

const ThemeToggle = ({ className }: ThemeToggleProps) => {
	const { theme, toggleTheme } = useThemeStore();
	const isDark = theme === "dark";

	return (
		<button
			type='button'
			onClick={toggleTheme}
			aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
			title={isDark ? "Light theme" : "Dark theme"}
			className={cn(
				"size-9 rounded-xl glass-panel flex items-center justify-center border border-[#9B5CFF]/20 transition-all duration-300",
				"text-[var(--text-3)] hover:border-[#9B5CFF]/50 hover:shadow-[0_0_16px_rgba(155,92,255,0.25)]",
				className
			)}
		>
			{isDark ? (
				<Sun className='size-4 text-[#32D9FF] transition-transform duration-300 group-hover:rotate-45' />
			) : (
				<Moon className='size-4 text-[#9B5CFF] transition-transform duration-300' />
			)}
		</button>
	);
};

export default ThemeToggle;
