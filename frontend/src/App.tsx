import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SearchPage from "./pages/search/SearchPage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/chat/ChatPage";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";
import AuthPage from "./pages/auth/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";

import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/404/NotFoundPage";

function App() {
	return (
		<>
			<Routes>
				{/* Public authentication routes */}
				<Route path='/login' element={<AuthPage />} />
				<Route path='/signup' element={<AuthPage />} />
				<Route
					path='/sso-callback'
					element={
						<AuthenticateWithRedirectCallback
							signInForceRedirectUrl={"/auth-callback"}
							signUpForceRedirectUrl={"/auth-callback"}
						/>
					}
				/>
				<Route path='/auth-callback' element={<AuthCallbackPage />} />

				{/* Protected Admin Route */}
				<Route
					path='/admin'
					element={
						<ProtectedRoute>
							<AdminPage />
						</ProtectedRoute>
					}
				/>

				{/* Protected App Routes - user must be signed in to access home/search/chat/albums */}
				<Route
					element={
						<ProtectedRoute>
							<MainLayout />
						</ProtectedRoute>
					}
				>
					<Route path='/' element={<HomePage />} />
					<Route path='/search' element={<SearchPage />} />
					<Route path='/chat' element={<ChatPage />} />
					<Route path='/albums/:albumId' element={<AlbumPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Route>
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
