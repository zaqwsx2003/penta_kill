import { create } from "zustand";

type User = {
    name: string;
    email: string;
};

type SessionState = {
    session: User | null;
    loading: boolean;
    accessToken: string | null;
    setSession: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    setAccessToken: (accessToken: string | null) => void;
};

export const useSessionStore = create<SessionState>((set) => ({
    session: null,
    loading: true,
    accessToken: null,
    setSession: (user) => set({ session: user }),
    setLoading: (loading) => set({ loading }),
    setAccessToken: (accessToken) => set({ accessToken }),
}));
