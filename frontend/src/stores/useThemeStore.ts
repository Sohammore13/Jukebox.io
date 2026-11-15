import { create } from "zustand";

export type ThemeMode = "dark" | "light";

const STORAGE_KEY = "jukebox-theme";

const getInitialTheme = (): ThemeMode => {
	if (typeof window === "undefined") return "dark";
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === "light" || stored === "dark") return stored;
	return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

const applyThemeClass = (theme: ThemeMode) => {
	const root = document.documentElement;
	root.classList.toggle("dark", theme === "dark");
	root.classList.toggle("light", theme === "light");
	root.dataset.theme = theme;
	root.style.colorScheme = theme;
};

interface ThemeStore {
	theme: ThemeMode;
	setTheme: (theme: ThemeMode) => void;
	toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => {
	const theme = getInitialTheme();
	applyThemeClass(theme);

	return {
		theme,
		setTheme: (next) => {
			localStorage.setItem(STORAGE_KEY, next);
			applyThemeClass(next);
			set({ theme: next });
		},
		toggleTheme: () => {
			const next: ThemeMode = get().theme === "dark" ? "light" : "dark";
			get().setTheme(next);
		},
	};
});
