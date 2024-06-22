import { create } from "zustand";

type TeamState = {
    position: number;
    code: string;
    image: string;
    name: string;
    ratio: number;
    record: { losses: number; wins: number };
    result: { gameWins: number; outcome: string | null };

    setTeamData: (data: Partial<TeamState>) => void;
};

export const useTeamState = create<TeamState>((set) => ({
    position: 0,
    code: "",
    image: "",
    name: "",
    ratio: 0,
    record: { losses: 0, wins: 0 },
    result: { gameWins: 0, outcome: "" },

    setTeamData: (data) => set((state) => ({ ...state, ...data })),
}));
