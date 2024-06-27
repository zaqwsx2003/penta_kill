"use client";

import React from "react";

import { Do_Hyeon } from "next/font/google";
import { cn } from "@/lib/utils";
import useAnimated from "../_lib/useAnimated";
import { motion } from "framer-motion";

const font = Do_Hyeon({
    subsets: ["latin"],
    weight: "400",
});

export default function PredictPercent() {
    const { isCompleted, rounded } = useAnimated({ targetRatio: 74 });
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
