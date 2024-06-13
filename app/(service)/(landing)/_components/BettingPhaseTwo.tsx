"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postBettingPoint } from "@/app/api/api";
import { useSelectedGameStore } from "@/lib/gameSelectStore";
import { MatchDetails, MatchTeams } from "@/model/match";
import { useMatchState } from "@/lib/matchStore";
import { useTeamState } from "@/lib/teamStore";

type BettingPhaseTwoProps = {
    match: MatchDetails;
    closing: boolean;
    setBetPhase: React.Dispatch<React.SetStateAction<0 | 1 | 2 | 3>>;
};

export default function BettingPhaseTwo({
    closing,
    setBetPhase,
}: BettingPhaseTwoProps) {
    const [inputValue, setInputValue] = useState<string>("");
    const [inputOpen, setInputOpen] = useState<boolean>(false);
    const { setBet, betInfo } = useSelectedGameStore();
    const queryClient = useQueryClient();
    const match = useMatchState((state) => state);
    const team = useTeamState((state) => state);

    const mutation = useMutation({
        mutationKey: ["betting"],
        mutationFn: postBettingPoint,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["match", "betting"],
            });
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const toggleBet = () => {
        if (
            !inputOpen &&
            betInfo?.teamCode === team.code &&
            betInfo?.matchId === match.id
        ) {
            setBet(match.id, team.code, null);
        } else {
            const points = parseInt(inputValue, 10);
            if (!isNaN(points)) {
                setBet(match.id, team.code, points);
                mutation.mutate({
                    matchId: match.id,
                    teamCode: team.code,
                    point: points,
                });
            }
        }
        setBetPhase(3);
    };

    console.log(team);

    const setPointCancelHandler = () => {
        setInputOpen(false);
    };
    return (
        <motion.div
            key="phaseTwo"
            initial={{ opacity: 1, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={closing ? { opacity: 1, x: 0 } : { opacity: 1, x: -800 }}
            transition={{ duration: 0.7 }}
            className="flex h-[300px] w-full flex-col items-center justify-center gap-4"
        >
            <input
                type="text"
                placeholder="배팅 포인트를 입력하세요"
                className="w-full rounded border-none px-3 py-2 text-right text-black outline-none"
                onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="flex flex-row items-center justify-center gap-4">
                <div
                    className="cursor-pointer rounded bg-blue-500 p-2 text-white hover:bg-blue-300"
                    onClick={toggleBet}
                >
                    확인
                </div>
                <div
                    className="cursor-pointer rounded bg-red-500 p-2 text-white hover:bg-red-300"
                    onClick={setPointCancelHandler}
                >
                    취소
                </div>
            </div>
        </motion.div>
    );
}
