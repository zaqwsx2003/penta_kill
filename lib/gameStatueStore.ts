import { create } from "zustand";

type GameStatusState = {
    statuses: { [key: string]: string };
    setStatus: (id: string, status: string) => void;
};

export const useGameStatusState = create<GameStatusState>((set) => ({
    statuses: {},
    setStatus: (id, status) =>
        set((state) => ({
            statuses: { ...state.statuses, [id]: status },
        })),
}));
