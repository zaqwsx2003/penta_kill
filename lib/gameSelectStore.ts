import { create } from "zustand";

type SelectedGame = {
    matchId: string;
    teamCode: string;
    selected: boolean;
};

type SelectedTeamStore = {
    game: SelectedGame | null;
    setGameSelection: (matchId: string, teamCode: string, selected: boolean) => void;
};

export const useSelectedTeam = create<SelectedTeamStore>((set) => ({
    game: null,
    setGameSelection: (matchId, teamCode, selected) =>
        set(() => ({
            game: { matchId, teamCode, selected },
        })),
}));
