import axios, { AxiosRequestConfig } from "axios";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

axios.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get("Access_Token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
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

                return instance(originalRequest);
            } catch (error) {
                console.error("token error", error);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
