import { create } from "zustand";

type selectMatchState = {
    selectWeek: string;
    setSelectWeek: (week: string) => void;
};

export const useSelectMatchStore = create<selectMatchState>((set) => ({
    selectWeek: "",
    setSelectWeek: (week: string) => set({ selectWeek: week }),
}));
