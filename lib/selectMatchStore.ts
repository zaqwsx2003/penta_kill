import { create } from "zustand";

type selectMatchState = {
    selectWeek: number | undefined;
    setSelectWeek: (week: number) => void;
};

export const useSelectMatchStore = create<selectMatchState>((set) => ({
    selectWeek: undefined,
    setSelectWeek: (week: number) => set({ selectWeek: week }),
}));
