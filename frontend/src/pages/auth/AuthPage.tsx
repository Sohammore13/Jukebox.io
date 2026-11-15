import { SignIn, SignUp, useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import MidnightAuroraLogo from "@/components/MidnightAuroraLogo";
import ThemeToggle from "@/components/ThemeToggle";
import { useThemeStore } from "@/stores/useThemeStore";

const clerkAppearanceDark = {
	elements: {
		rootBox: "w-full flex justify-center",
		cardBox: "w-full max-w-[440px] shadow-2xl",
		card: "bg-[#11162A]/90 backdrop-blur-2xl border border-[#9B5CFF]/30 shadow-[0_0_50px_rgba(155,92,255,0.25)] rounded-3xl p-6 text-white",
		headerTitle: "text-white font-extrabold text-2xl tracking-tight",
		headerSubtitle: "text-[#94A3B8] text-sm",
		socialButtonsBlockButton:
			"bg-[#161D36] border border-[#9B5CFF]/30 text-white hover:bg-[#1E2749] hover:border-[#32D9FF]/60 hover:shadow-[0_0_20px_rgba(50,217,255,0.3)] transition-all rounded-xl h-11",
		socialButtonsBlockButtonText: "text-white font-semibold text-sm",
		socialButtonsProviderIcon: "size-5",
		dividerLine: "bg-[#9B5CFF]/20",
		dividerText: "text-[#94A3B8] text-xs uppercase tracking-widest font-semibold",
		formFieldLabel: "text-[#CBD5E1] text-xs font-semibold uppercase tracking-wider mb-1",
		formFieldInput:
			"bg-[#080B16] border border-[#9B5CFF]/30 text-white rounded-xl focus:border-[#32D9FF] focus:ring-1 focus:ring-[#32D9FF] transition-all h-11 text-sm placeholder:text-[#94A3B8]/40",
		formButtonPrimary:
			"bg-gradient-to-r from-[#9B5CFF] via-[#7B4DFF] to-[#32D9FF] text-[#080B16] font-bold text-sm h-11 rounded-xl shadow-[0_0_25px_rgba(155,92,255,0.5)] hover:shadow-[0_0_35px_rgba(50,217,255,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 uppercase tracking-wide",
		footerActionText: "text-[#94A3B8] text-xs",
		footerActionLink: "text-[#32D9FF] hover:text-[#9B5CFF] font-semibold transition-colors underline-offset-4",
		identityPreviewText: "text-white font-medium",
		identityPreviewEditButtonIcon: "text-[#32D9FF]",
		formFieldAction: "text-[#32D9FF] hover:text-[#9B5CFF] text-xs font-medium",
		formResendCodeLink: "text-[#32D9FF] hover:text-[#9B5CFF]",
		otpCodeFieldInput: "bg-[#080B16] border border-[#9B5CFF]/40 text-white rounded-xl text-xl",
		alertText: "text-sm text-red-300",
		alert: "bg-red-500/10 border border-red-500/30 rounded-xl",
		footer: "hidden",
	},
};

const clerkAppearanceLight = {
	elements: {
		rootBox: "w-full flex justify-center",
		cardBox: "w-full max-w-[440px] shadow-2xl",
		card: "bg-white border border-[#6D28D9]/25 shadow-[0_20px_50px_rgba(15,23,42,0.12)] rounded-3xl p-6 text-[#0B1220]",
		headerTitle: "text-[#0B1220] font-extrabold text-2xl tracking-tight",
		headerSubtitle: "text-[#1E293B] text-sm font-medium",
		socialButtonsBlockButton:
			"bg-[#DDE3F0] border-2 border-[#5B21B6]/35 text-[#0B1220] hover:bg-[#D0D7E8] hover:border-[#0F766E] hover:shadow-[0_8px_20px_rgba(15,23,42,0.12)] transition-all rounded-xl h-11",
		socialButtonsBlockButtonText: "text-[#0B1220] font-bold text-sm",
		socialButtonsProviderIcon: "size-5",
		dividerLine: "bg-[#5B21B6]/25",
		dividerText: "text-[#475569] text-xs uppercase tracking-widest font-semibold",
		formFieldLabel: "text-[#1E293B] text-xs font-semibold uppercase tracking-wider mb-1",
		formFieldInput:
			"bg-[#F8FAFC] border border-[#94A3B8] text-[#0B1220] rounded-xl focus:border-[#5B21B6] focus:ring-1 focus:ring-[#5B21B6] transition-all h-11 text-sm placeholder:text-[#64748B]",
		formButtonPrimary:
			"bg-gradient-to-r from-[#9B5CFF] via-[#7B4DFF] to-[#32D9FF] text-[#080B16] font-bold text-sm h-11 rounded-xl shadow-[0_0_25px_rgba(155,92,255,0.35)] hover:shadow-[0_0_35px_rgba(50,217,255,0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 uppercase tracking-wide",
		footerActionText: "text-[#475569] text-xs",
		footerActionLink: "text-[#0F766E] hover:text-[#5B21B6] font-semibold transition-colors underline-offset-4",
		identityPreviewText: "text-[#0B1220] font-medium",
		identityPreviewEditButtonIcon: "text-[#0F766E]",
		formFieldAction: "text-[#0F766E] hover:text-[#5B21B6] text-xs font-medium",
		formResendCodeLink: "text-[#0F766E] hover:text-[#5B21B6]",
		otpCodeFieldInput: "bg-[#F8FAFC] border border-[#CBD5E1] text-[#0B1220] rounded-xl text-xl",
		alertText: "text-sm text-red-700",
		alert: "bg-red-50 border border-red-200 rounded-xl",
		footer: "hidden",
	},
};

const AuthPage = () => {
	const { isSignedIn, isLoaded } = useAuth();
	const { theme } = useThemeStore();
	const [searchParams] = useSearchParams();
	const initialMode = searchParams.get("mode") === "signup" ? "signup" : "signin";
	const [mode, setMode] = useState<"signin" | "signup">(initialMode);
	const clerkAppearance = theme === "light" ? clerkAppearanceLight : clerkAppearanceDark;

	useEffect(() => {
		const paramMode = searchParams.get("mode");
		if (paramMode === "signup" || paramMode === "signin") {
			setMode(paramMode);
		}
	}, [searchParams]);

	if (isLoaded && isSignedIn) {
		return <Navigate to='/' replace />;
	}

	return (
		<div className='min-h-screen w-full theme-surface flex flex-col items-center justify-center p-4 relative overflow-x-hidden select-none transition-colors duration-300'>
			<div className='fixed -top-40 -left-40 w-[550px] h-[550px] bg-[#9B5CFF]/15 rounded-full blur-[140px] pointer-events-none animate-pulse' />
			<div className='fixed -bottom-40 -right-40 w-[550px] h-[550px] bg-[#32D9FF]/15 rounded-full blur-[140px] pointer-events-none animate-pulse' />
			<div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#FF5CA8]/8 rounded-full blur-[120px] pointer-events-none' />

			<div className='absolute top-4 right-4 z-20'>
				<ThemeToggle />
			</div>

			<div className='relative z-10 w-full max-w-md flex flex-col items-center gap-5 my-6'>
				<div className='flex flex-col items-center gap-2'>
					<MidnightAuroraLogo size='lg' />
					<p className='text-xs font-bold text-[var(--text-2)] tracking-widest uppercase mt-1'>
						{mode === "signin"
							? "✦ Welcome back to the audio cosmos ✦"
							: "✦ Join the next-generation sound stream ✦"}
					</p>
				</div>

				<div className='flex w-full glass-panel p-1.5 rounded-2xl border border-[color-mix(in_srgb,var(--accent-purple)_28%,transparent)] shadow-[0_0_20px_rgba(155,92,255,0.12)]'>
					<button
						type='button'
						onClick={() => setMode("signin")}
						className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${
							mode === "signin"
								? "bg-gradient-to-r from-[#9B5CFF] to-[#32D9FF] text-[#080B16] shadow-[0_0_20px_rgba(155,92,255,0.45)] scale-[1.02]"
								: "text-[var(--text-3)] hover:text-[var(--text-1)]"
						}`}
					>
						Sign In
					</button>
					<button
						type='button'
						onClick={() => setMode("signup")}
						className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${
							mode === "signup"
								? "bg-gradient-to-r from-[#9B5CFF] to-[#32D9FF] text-[#080B16] shadow-[0_0_20px_rgba(155,92,255,0.45)] scale-[1.02]"
								: "text-[var(--text-3)] hover:text-[var(--text-1)]"
						}`}
					>
						Sign Up
					</button>
				</div>

				<div className='w-full flex justify-center'>
					{mode === "signin" ? (
						<SignIn
							key={`signin-${theme}`}
							routing='hash'
							fallbackRedirectUrl='/auth-callback'
							forceRedirectUrl='/auth-callback'
							signUpUrl='/login?mode=signup'
							appearance={clerkAppearance}
						/>
					) : (
						<SignUp
							key={`signup-${theme}`}
							routing='hash'
							fallbackRedirectUrl='/auth-callback'
							forceRedirectUrl='/auth-callback'
							signInUrl='/login?mode=signin'
							appearance={clerkAppearance}
						/>
					)}
				</div>

				<div className='text-center text-xs text-[var(--text-2)] mt-1'>
					{mode === "signin" ? (
						<p>
							Don't have an account yet?{" "}
							<button
								type='button'
								onClick={() => setMode("signup")}
								className='text-[var(--accent-cyan)] hover:text-[var(--accent-purple)] font-bold underline underline-offset-4 transition-colors'
							>
								Create an account
							</button>
						</p>
					) : (
						<p>
							Already have an Aurora account?{" "}
							<button
								type='button'
								onClick={() => setMode("signin")}
								className='text-[var(--accent-cyan)] hover:text-[var(--accent-purple)] font-bold underline underline-offset-4 transition-colors'
							>
								Sign in here
							</button>
						</p>
					)}
				</div>

				<div className='text-center'>
					<p className='text-[var(--text-3)] text-[10px] font-semibold tracking-widest uppercase'>
						End-to-End Encrypted Cosmic Audio ✦ Midnight Aurora
					</p>
				</div>
			</div>
		</div>
	);
};

export default AuthPage;
