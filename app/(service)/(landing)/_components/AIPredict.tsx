"use client";

import React from "react";
import { motion } from "framer-motion";

import { useMatchState } from "@/lib/matchStore";
import { useTeamState } from "@/lib/teamStore";
import useAnimated from "@/app/(service)/(landing)/_lib/useAnimated";

export default function AIPredict({
    aiWinRatio,
    aiWinTeam,
}: {
    aiWinRatio: number;
    aiWinTeam: string;
}) {
    const { isCompleted, rounded } = useAnimated({ targetRatio: aiWinRatio });
    const team = useTeamState((state) => state);
    const match = useMatchState((state) => state);

    const aiPredictionSuccess =
        match.teams.find((team) => team.code === aiWinTeam)?.result.outcome ===
        "win";

    return (
        <div className="relative flex flex-1 flex-col items-center justify-center">
            <p className="pb-3 text-sm">AI 예측</p>
            <motion.p className="text-3xl font-bold">{rounded}</motion.p>
            {isCompleted && (
                <motion.p
                    key="aiWinCount"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-full mt-2 text-lg"
                >
                    {aiWinTeam}승리
                    {match.matchState === "completed" ? (
                        aiPredictionSuccess ? (
                            <span className="mt-1 block text-sm text-green-500">
                                AI 예측 성공
                            </span>
                        ) : (
                            <span className="mt-1 block text-sm text-red-500">
                                AI 예측 실패
                            </span>
                        )
                    ) : null}
                </motion.p>
            )}
        </div>
    );
}
