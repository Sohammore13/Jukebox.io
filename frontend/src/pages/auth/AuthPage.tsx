import { SignIn, SignUp, useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import MidnightAuroraLogo from "@/components/MidnightAuroraLogo";

const clerkAppearance = {
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
		footer: "hidden", // We provide our own styled toggle and footer
	},
};

const AuthPage = () => {
	const { isSignedIn, isLoaded } = useAuth();
	const [searchParams] = useSearchParams();
	const initialMode = searchParams.get("mode") === "signup" ? "signup" : "signin";
	const [mode, setMode] = useState<"signin" | "signup">(initialMode);

	useEffect(() => {
		const paramMode = searchParams.get("mode");
		if (paramMode === "signup" || paramMode === "signin") {
			setMode(paramMode);
		}
	}, [searchParams]);

	// If user is already authenticated, redirect to home page
	if (isLoaded && isSignedIn) {
		return <Navigate to='/' replace />;
	}

	return (
		<div className='min-h-screen w-full bg-[#080B16] flex flex-col items-center justify-center p-4 relative overflow-x-hidden select-none'>
			{/* Ambient Aurora Gradient Orbs */}
			<div className='fixed -top-40 -left-40 w-[550px] h-[550px] bg-[#9B5CFF]/15 rounded-full blur-[140px] pointer-events-none animate-pulse' />
			<div className='fixed -bottom-40 -right-40 w-[550px] h-[550px] bg-[#32D9FF]/15 rounded-full blur-[140px] pointer-events-none animate-pulse' />
			<div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#FF5CA8]/8 rounded-full blur-[120px] pointer-events-none' />

			{/* Center Container */}
			<div className='relative z-10 w-full max-w-md flex flex-col items-center gap-5 my-6'>
				{/* App Brand Header */}
				<div className='flex flex-col items-center gap-2'>
					<MidnightAuroraLogo size='lg' />
					<p className='text-xs font-semibold text-[#94A3B8] tracking-widest uppercase mt-1'>
						{mode === "signin"
							? "✦ Welcome back to Jukebox.io ✦"
							: "✦ Join the next-generation sound stream ✦"}
					</p>
				</div>

				{/* Mode Switcher Tabs */}
				<div className='flex w-full bg-[#11162A]/90 p-1.5 rounded-2xl border border-[#9B5CFF]/25 shadow-[0_0_20px_rgba(155,92,255,0.15)]'>
					<button
						type='button'
						onClick={() => setMode("signin")}
						className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${
							mode === "signin"
								? "bg-gradient-to-r from-[#9B5CFF] to-[#32D9FF] text-[#080B16] shadow-[0_0_20px_rgba(155,92,255,0.5)] scale-[1.02]"
								: "text-[#94A3B8] hover:text-white"
						}`}
					>
						Sign In
					</button>
					<button
						type='button'
						onClick={() => setMode("signup")}
						className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${
							mode === "signup"
								? "bg-gradient-to-r from-[#9B5CFF] to-[#32D9FF] text-[#080B16] shadow-[0_0_20px_rgba(155,92,255,0.5)] scale-[1.02]"
								: "text-[#94A3B8] hover:text-white"
						}`}
					>
						Sign Up
					</button>
				</div>

				{/* Clerk Component (Sign In / Sign Up) */}
				<div className='w-full flex justify-center'>
					{mode === "signin" ? (
						<SignIn
							routing='hash'
							fallbackRedirectUrl='/auth-callback'
							forceRedirectUrl='/auth-callback'
							signUpUrl='/login?mode=signup'
							appearance={clerkAppearance}
						/>
					) : (
						<SignUp
							routing='hash'
							fallbackRedirectUrl='/auth-callback'
							forceRedirectUrl='/auth-callback'
							signInUrl='/login?mode=signin'
							appearance={clerkAppearance}
						/>
					)}
				</div>

				{/* Toggle prompt */}
				<div className='text-center text-xs text-[#94A3B8] mt-1'>
					{mode === "signin" ? (
						<p>
							Don't have an account yet?{" "}
							<button
								type='button'
								onClick={() => setMode("signup")}
								className='text-[#32D9FF] hover:text-[#9B5CFF] font-semibold underline underline-offset-4 transition-colors'
							>
								Create an account
							</button>
						</p>
					) : (
						<p>
							Already have a Jukebox account?{" "}
							<button
								type='button'
								onClick={() => setMode("signin")}
								className='text-[#32D9FF] hover:text-[#9B5CFF] font-semibold underline underline-offset-4 transition-colors'
							>
								Sign in here
							</button>
						</p>
					)}
				</div>

				{/* Trust badge */}
				<div className='text-center'>
					<p className='text-[#94A3B8]/40 text-[10px] tracking-widest uppercase'>
						End-to-End Encrypted Music Streaming ✦ Jukebox.io
					</p>
				</div>
			</div>
		</div>
	);
};

export default AuthPage;
