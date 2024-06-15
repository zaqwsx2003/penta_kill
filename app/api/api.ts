import instance from "@/app/api/instance";
import { signIn } from "@/auth";
import Cookies from "js-cookie";

// 회원가입
export type RegisterParams = {
    username: string;
    email: string;
    password: string;
};

export const userRegister = async ({
    username,
    email,
    password,
}: RegisterParams): Promise<RegisterParams> => {
    try {
        const response = await instance.post("/users/signup", {
            username,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 로그인
type LoginParams = Pick<RegisterParams, "email" | "password">;

export const userLogin = async ({ email, password }: LoginParams) => {
    try {
        const response = await instance.post("/users/login", {
            email,
            password,
        });

        // Extract the token from the Authorization header
        const authHeader = response.headers["authorization"];
        const accessToken = authHeader && authHeader.split(" ")[1];

        if (accessToken) {
            Cookies.set("Access_Token", accessToken, { sameSite: "strict" });
        }

        return response.data;
    } catch (error) {
        throw error;
    }
};

// 승부예측(일정)
export const getMatchPredictionList = async () => {
    try {
        const response = await instance.get("/bets/recentTournament/schedules");
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 베팅하기
export const postBettingPoint = async (data: {
    matchId: string;
    teamCode: string;
    point: number;
}) => {
    try {
        const response = await instance.post("/points/bettings", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 경기일정 (수정해야함)
export const getMatchList = async () => {
    try {
        const response = await instance.get("/schedules/leagues?league=lck");
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
        const response = await instance.get(`/posts`, {
            params: { page, size },
        });
        console.log("게시판 불러오기: ", response);
        return response;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};
