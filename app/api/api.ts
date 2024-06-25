"use client";

import useAxiosAuth from "@/lib/axiosHooks/useAxiosAuth";
import axios from "axios";
import Cookies from "js-cookie";

const API_ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT_URL;

const PENTAAPI = axios.create({
    baseURL: API_ENDPOINT,
});

// 경기일정
export const fetchMatchSchedule = async ({
    page,
    size,
    year,
    month,
}: {
    page: number;
    size: number;
    year: number;
    month: number;
}) => {
    try {
        console.log("check params", page, size, year, month);
        const response = await PENTAAPI.get(`/schedules/leagues`, {
            params: { page, size, year, month },
        });
        console.log("경기일정", typeof response.data, response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

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