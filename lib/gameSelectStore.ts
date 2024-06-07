import { create } from "zustand";

type BetInfo = {
    matchId: string;
    teamCode: string;
    points: number | null; // Points bet on the team
};

type SelectedGameStore = {
    betInfo: BetInfo | null;
    setBet: (matchId: string, teamCode: string, points: number | null) => void;
    clearBet: () => void;
};

export const useSelectedGameStore = create<SelectedGameStore>((set) => ({
    betInfo: null,
    setBet: (matchId, teamCode, points) =>
        set(() => ({
            betInfo: { matchId, teamCode, points },
        })),
    clearBet: () => set(() => ({ betInfo: null })),
}));
