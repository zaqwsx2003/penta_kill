import { create } from "zustand";

import { BoardState, CommentState } from "@/model/board";

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

export const useCommentStore = create<CommentState>((set) => ({
    comments: [],
    page: 0,
    size: 5,
    hasMore: false,
    setComments: (comments) => set({ comments }),
    setPage: (page) => set({ page }),
    setSize: (size) => set({ size }),
    setHasMore: (hasMore) => set({ hasMore }),
    addComments: (newComments) =>
        set((state) => ({ comments: [...state.comments, ...newComments] })),
}));
