import { create } from "zustand";

interface ModalState {
    bettingIsOpen: boolean;
    matchId: string | null;
    teamCode: string | null;
    BettingOnOpen: (matchId: string, teamCode: string) => void;
    BettingOnClose: () => void;
}

export const useBettingModalState = create<ModalState>((set) => ({
    bettingIsOpen: false,
    matchId: null,
    teamCode: null,
    BettingOnOpen: (matchId: string, teamCode: string) =>
        set({ bettingIsOpen: true, matchId, teamCode }),
    BettingOnClose: () => set({ bettingIsOpen: false, matchId: null, teamCode: null }),
}));
