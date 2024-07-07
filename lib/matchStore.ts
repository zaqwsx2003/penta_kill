import { create } from "zustand";

type MatchState = {
    matchState: string;
    startTime: string;
    amount: number;
    betting: boolean;
    id: string;
    status: null | "unstarted" | "inProgress" | "win" | "loss";
    strategy: { count: number; type: string };
    teamCode: string | null;
    teams: {
        code: string;
        image: string;
        name: string;
        probability: number;
        ratio: number;
        record: { losses: number; wins: number };
        result: { gameWins: number; outcome: string | null };
    }[];
    setMatchData: (data: Partial<MatchState>) => void;
};

export const useMatchState = create<MatchState>((set) => ({
    matchState: "",
    startTime: "",
    amount: 0,
    betting: false,
    id: "",
    status: null,
    strategy: { count: 0, type: "" },
    teamCode: "",
    teams: [
        {
            code: "",
            image: "",
            name: "",
            probability: 0,
            ratio: 0,
            record: { losses: 0, wins: 0 },
            result: { gameWins: 0, outcome: "" },
        },
    ],
    setMatchData: (data) => set((state) => ({ ...state, ...data })),
}));
