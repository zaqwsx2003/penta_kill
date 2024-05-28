// src/lib/sessionStore.ts
import { create } from "zustand";

type User = {
    userid: number;
    username: string;
    email: string;
};

type SessionState = {
    session: User | null;
    loading: boolean;
    login: boolean;
    accessToken: string | null;
    setSession: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    setLogin: (login: boolean) => void;
    setAccessToken: (accessToken: string | null) => void;
    logout: () => void; // 로그아웃 함수 추가
};

export const useSessionStore = create<SessionState>((set) => ({
    session: null,
    loading: true,
    login: false,
    accessToken: null,
    setSession: (user) => set({ session: user }),
    setLoading: (loading) => set({ loading }),
    setLogin: (login) => set({ login }),
    setAccessToken: (accessToken) => set({ accessToken }),
    logout: () => set({ session: null, accessToken: null }), // 로그아웃 구현
}));
