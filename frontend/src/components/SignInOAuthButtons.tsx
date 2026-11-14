import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
	const { signIn, isLoaded } = useSignIn();

	if (!isLoaded) {
		return null;
	}

	const signInWithGoogle = () => {
		signIn.authenticateWithRedirect({
			strategy: "oauth_google",
			redirectUrl: "/sso-callback",
			redirectUrlComplete: "/auth-callback",
		});
	};

	return (
		<Button
			onClick={signInWithGoogle}
			className='relative group overflow-hidden bg-gradient-to-r from-[#9B5CFF] to-[#32D9FF] text-[#080B16] font-bold text-xs px-4 h-9 rounded-xl shadow-[0_0_20px_rgba(155,92,255,0.4)] hover:shadow-[0_0_30px_rgba(50,217,255,0.6)] transition-all duration-300 hover:scale-[1.02] flex items-center gap-2'
		>
			<img src='/google.png' alt='Google' className='size-4 bg-white rounded-full p-0.5' />
			<span className='tracking-wide'>Sign In</span>
		</Button>
	);
};
export default SignInOAuthButtons;
