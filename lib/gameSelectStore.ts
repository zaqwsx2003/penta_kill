import { create } from "zustand";

type SelectedTeam = {
    id: string;
    selected: boolean;
    teamCode: string;
    setSelected: (id: string, selected: boolean, teamCode: string) => void;
};

export const useSelectedTeam = create<SelectedTeam>((set) => ({
    id: "",
    selected: false,
    teamCode: "",
    setSelected: (id, selected, teamCode) =>
        set((state) => ({
            id,
            selected,
            teamCode,
        })),
}));
