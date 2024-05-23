import create from "zustand";
import { jwtDecode } from "jwt-decode";

interface User {
    username: string;
    email: string;
}

interface UserStore {
    user: User | null;
    setUser: (token: string) => void;
    clearUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (token) => set({ user: jwtDecode<User>(token) }),
    clearUser: () => set({ user: null }),
}));

export default useUserStore;
