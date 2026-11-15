import { SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { LayoutDashboardIcon, Sparkles, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import ThemeToggle from "./ThemeToggle";

const Topbar = () => {
	const { isAdmin } = useAuthStore();
	const { user } = useUser();

	return (
		<header className='flex items-center justify-between px-6 py-3.5 sticky top-0 theme-surface/80 backdrop-blur-xl border-b border-[#9B5CFF]/15 z-30 transition-all bg-[color-mix(in_srgb,var(--surface-0)_80%,transparent)]'>
			{/* Left side: Greeting badge / Brand tagline */}
			<div className='flex items-center gap-3'>
				<div className='hidden sm:flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-[#9B5CFF]/20 text-xs font-medium text-[var(--text-2)] shadow-[0_0_15px_rgba(155,92,255,0.15)]'>
					<Sparkles className='size-3.5 text-[#32D9FF] animate-pulse' />
					<span>Spatial Audio <span className='text-[#9B5CFF] font-semibold'>v2.0</span></span>
				</div>
			</div>

			{/* Right side: Actions & User */}
			<div className='flex items-center gap-3.5'>
				{isAdmin && (
					<Link
						to={"/admin"}
						className={cn(
							buttonVariants({ variant: "outline" }),
							"border-[#9B5CFF]/40 bg-[#9B5CFF]/10 text-[var(--text-1)] hover:bg-[#9B5CFF]/20 hover:border-[#9B5CFF] shadow-[0_0_15px_rgba(155,92,255,0.2)] text-xs rounded-xl"
						)}
					>
						<LayoutDashboardIcon className='size-3.5 mr-1.5 text-[#32D9FF]' />
						Admin Studio
					</Link>
				)}

				<ThemeToggle />

				<button
					aria-label='Notifications'
					onClick={() => alert("All streams are operating at 320kbps Lossless ⚡")}
					className='size-9 rounded-xl glass-panel flex items-center justify-center text-[var(--text-3)] hover:text-[var(--text-1)] hover:border-[#9B5CFF]/40 transition-colors'
				>
					<Bell className='size-4' />
				</button>

				<SignedOut>
					<SignInOAuthButtons />
				</SignedOut>

				{user && (
					<div className='flex items-center gap-2.5 pl-2 border-l border-[color-mix(in_srgb,var(--text-1)_12%,transparent)]'>
						<div className='hidden md:flex flex-col items-end leading-tight'>
							<span className='text-xs font-semibold text-[var(--text-1)]'>
								{user.firstName || user.username || "Listener"}
							</span>
							<span className='text-[10px] text-[#32D9FF] font-medium'>
								Aurora VIP
							</span>
						</div>
						<div className='p-0.5 rounded-full ring-2 ring-[#9B5CFF]/50 shadow-[0_0_12px_rgba(155,92,255,0.4)]'>
							<UserButton />
						</div>
					</div>
				)}
			</div>
		</header>
	);
};

export default Topbar;
