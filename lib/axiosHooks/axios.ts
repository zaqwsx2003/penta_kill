import axios from "axios";

export default axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
    headers: { "Content-Type": "application/json" },
});

export const axiosAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
    headers: { "Content-Type": "application/json" },
});
