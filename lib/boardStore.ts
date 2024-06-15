import { create } from "zustand";
import { BoardState, Post } from "@/model/board";

export const useBoardStore = create<BoardState>((set) => ({
    posts: [],
    page: 0,
    size: 10,
    hasMore: true,
    totalPosts: 0,
    totalPages: 0,

    setPosts: (posts) => set({ posts }),
    setPage: (page) => set({ page }),
    setHasMore: (hasMore) => set({ hasMore }),
    setTotalPosts: (totalPosts) => set({ totalPosts }),
    setTotalPages: (totalPages) => set({ totalPages }),
}));
