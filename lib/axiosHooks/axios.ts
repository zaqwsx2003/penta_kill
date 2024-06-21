import axios from "axios";

export default axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

export const axiosAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
