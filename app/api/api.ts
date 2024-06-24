"use client";

import useAxiosAuth from "@/lib/axiosHooks/useAxiosAuth";
import axios from "axios";
import Cookies from "js-cookie";

const API_ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;

const PENTAAPI = axios.create({
    baseURL: API_ENDPOINT,
});

// 펜타톡
export const fetchPosts = async ({
    page,
    size,
}: {
    page: number;
    size: number;
}) => {
    try {
        const response = await PENTAAPI.get(`/posts`, {
            params: { page, size },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 게시글 상세
export const fetchPost = async (id: number) => {
    try {
        const response = await PENTAAPI.get(`/posts/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 댓글목록
export const fetchComments = async (
    postId: number,
    page: number,
    size: number,
) => {
    try {
        const response = await PENTAAPI.get(`/posts/${postId}/comments`, {
            params: { page, size },
        });
        console.log("댓글통신", response.data);
        return response.data;
    } catch (error) {
        console.error("댓글에러", error);
        throw error;
    }
};
