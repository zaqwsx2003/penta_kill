import axios from "axios";
import Cookies from "js-cookie";
import { getSession } from "next-auth/react";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
});

instance.interceptors.request.use(
    (config) => {
        const session = getSession();
        console.log(session);
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
