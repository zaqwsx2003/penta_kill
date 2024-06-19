// import axios from "axios";
// import { getSession, signIn } from "next-auth/react";

// import RefreshAccess from "./refreshAccess";

// type SessionType = {
//     accessToken?: string;
//     refreshToken?: string;
//     user: UserType;
//     expires: string;
// };

// type UserType = {
//     id: string;
//     email: string;
//     name: string;
// };

// const instance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
//     withCredentials: true,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// instance.interceptors.request.use(
//     async (config) => {
//         const session: SessionType | null = await getSession();
//         config.headers.authorization = session ? session?.accessToken : null;
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     },
// );

// instance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response && error.response.status === 401) {
//             try {
//                 await RefreshAccess();
//             } catch (err) {
//                 await signIn();
//             }
//         }

//         return Promise.reject(error);
//     },
// );

// export default instance;
