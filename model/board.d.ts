export interface Post {
    id: number;
    title: string;
    content: string;
    isLike: boolean | null;
    likeCount: number;
    dislikeCount: number;
    commentCount: number;
    views: number;
    createdAt: string;
    modifiedAt: string;
    nickname: string;
}

export interface BoardState {
    posts: Post[];
    page: number;
    size: number;
    hasMore: boolean;
    totalPosts: number;
    totalPages: number;
    setPosts: (posts: Post[]) => void;
    setPage: (page: number) => void;
    setHasMore: (hasMore: boolean) => void;
    setTotalPosts: (totalPosts: number) => void;
    setTotalPages: (totalPages: number) => void;
}
