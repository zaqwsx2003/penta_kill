import axios from "axios";
import Cookies from "js-cookie";
import { getSession } from "next-auth/react";

type SessionType = {
    accessToken?: string;
    user: UserType;
    expires: string;
};

type UserType = {
    id: string;
    email: string;
    name: string;
};

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    async (config) => {
        const session: SessionType | null = await getSession();
        const token = session?.accessToken;
        console.log(token);
        config.headers.authorization = `${session?.accessToken}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = Cookies.get("Refresh_Token");
                const response = await axios.post(
                    "/api/refresh-token",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    }
                );
                const newAccessToken = response.data.accessToken;
                Cookies.set("Access_Token", newAccessToken, { sameSite: "strict" });

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return instance(originalRequest);
            } catch (error) {
                console.error("token error", error);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
