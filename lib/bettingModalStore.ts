import { create } from "zustand";

interface ModalState {
    bettingPhase: number;
    bettingIsOpen: boolean;
    matchId: string | null;
    teamCode: string | null;
    setBettingPhase: (phase: number) => void;
    BettingOnOpen: (matchId: string, teamCode: string) => void;
    BettingOnClose: () => void;
}

export const useBettingModalState = create<ModalState>((set) => ({
    bettingPhase: 1,
    bettingIsOpen: false,
    matchId: null,
    teamCode: null,
    setBettingPhase: (phase) => set({ bettingPhase: phase }),
    BettingOnOpen: (matchId: string, teamCode: string) =>
        set({ bettingIsOpen: true, matchId, teamCode }),
    BettingOnClose: () =>
        set({
            bettingIsOpen: false,
            matchId: null,
            teamCode: null,
        }),
}));
