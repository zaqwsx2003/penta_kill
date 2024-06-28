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
    views: number;
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

export interface Comment {
    id: number;
    content: string;
    createAt: string;
    nickname: string;
    replyCount: number;
    email: string;
}

export interface CommentState {
    comments: Comment[];
    page: number;
    size: number;
    hasMore: boolean;
    setComments: (comments: Comment[]) => void;
    setPage: (page: number) => void;
    setHasMore: (hasMore: boolean) => void;
    addComments: (comments: Comment[]) => void;
}

// types.ts
export interface Reply {
    id: number;
    content: string;
    createAt: string;
    modifiedAt: string;
    nickname: string;
}

export interface ReplyState {
    replies: Reply[];
    page: number;
    size: number;
    hasMore: boolean;
    setReplies: (replies: Reply[], reset?: boolean) => void;
    addReplies: (replies: Reply[]) => void;
    setPage: (page: number) => void;
    setHasMore: (hasMore: boolean) => void;
}
