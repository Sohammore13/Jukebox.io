import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",
	withCredentials: true,
});

// Dynamically inject fresh Clerk session token into every outgoing request
axiosInstance.interceptors.request.use(async (config) => {
	try {
		const clerk = typeof window !== "undefined" ? (window as any).Clerk : null;
		if (clerk?.session) {
			const token = await clerk.session.getToken();
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
	} catch (error) {
		console.warn("Failed to retrieve Clerk token for request:", error);
	}
	return config;
});
