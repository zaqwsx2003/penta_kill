import instance from "@/app/api/instance";
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
        const response = await instance.post("/users/signup", { username, email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 로그인
type LoginParams = Pick<RegisterParams, "email" | "password">;

export const userLogin = async ({ email, password }: LoginParams) => {
    try {
        const response = await instance.post("/users/login", { email, password });

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

// 경기일정
export const getMatchList = async () => {
    try {
        const response = await instance.get("/schedules/leagues?league=lck");
        return response.data;
    } catch (error) {
        throw error;
    }
};

