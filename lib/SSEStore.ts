import { create } from "zustand";
import { MatchNoticeType } from "@/model/SSE";

type SSEState = {
    matchNotices: MatchNoticeType[];
    setMatchNotices: (notices: MatchNoticeType[]) => void;
    addMatchNotice: (notice: MatchNoticeType) => void;
    removeNotice: (index: number) => void;
};

export const useSSEState = create<SSEState>((set) => ({
    matchNotices: [],
    setMatchNotices: (notices: MatchNoticeType[]) =>
        set({ matchNotices: notices }),
    addMatchNotice: (notice: MatchNoticeType) =>
        set((state) => ({ matchNotices: [...state.matchNotices, notice] })),
    removeNotice: (index: number) =>
        set((state) => ({
            matchNotices: state.matchNotices.filter((_, i) => i !== index),
        })),
}));
