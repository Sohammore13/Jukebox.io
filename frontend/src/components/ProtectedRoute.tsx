import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { isSignedIn, isLoaded } = useAuth();

	// While Clerk is loading, render nothing (AuthProvider handles the loading spinner)
	if (!isLoaded) return null;

	if (!isSignedIn) {
		return <Navigate to='/login' replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;

