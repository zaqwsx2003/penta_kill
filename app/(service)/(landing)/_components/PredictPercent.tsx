"use client";

import React from "react";

import { Do_Hyeon } from "next/font/google";
import { cn } from "@/lib/utils";
import useAnimated from "@/app/(service)/(landing)/_lib/useAnimated";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "@/lib/axiosHooks/useAxiosAuth";

const font = Do_Hyeon({
    subsets: ["latin"],
    weight: "400",
});

export default function PredictPercent() {
    const { data, isLoading, isSuccess, isError } = useQuery({
        queryKey: ["AI"],
        queryFn: async () => {
            const response = await axiosAuth.get(`/bets/accuracy`);
            return response.data;
        },
    });

    const accuracy = data?.data?.accuracy;
    const AIRatio = accuracy ? Math.round(accuracy * 100) : 0;
    const { isCompleted, rounded } = useAnimated({ targetRatio: AIRatio });
    const axiosAuth = useAxiosAuth();

    console.log(AIRatio);

    return (
        <div
            className={cn(
                "flex items-center justify-center text-4xl font-bold text-white",
                font.className,
            )}
        >
            <div>
                <span className="text-red-400"> AI </span> 정확도
            </div>

            <motion.p
                key="aiWinCount"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`pl-4`}
            >
                {rounded}
            </motion.p>
        </div>
    );
}
