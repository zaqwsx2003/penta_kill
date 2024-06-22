"use client";

import React, { useEffect, useState } from "react";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import useAnimated from "../_lib/useAnimated";

export default function UserPredictComponent({
    winRatio,
    winTeam,
}: {
    winRatio: number;
    winTeam: string;
}) {
    const { isCompleted, rounded } = useAnimated({ targetRatio: winRatio });

    return (
        <div className="relative flex flex-1 flex-col items-center justify-center">
            <p className="pb-3 text-sm">유저 예측</p>
            <div>
                <motion.p className="text-3xl font-bold">{rounded}</motion.p>
                {isCompleted && (
                    <motion.p
                        key="userWinCount"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-full mt-2 text-lg"
                    >
                        {winTeam}
                    </motion.p>
                )}
            </div>
        </div>
    );
}
