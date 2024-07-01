"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

import { useSelectedGameStore } from "@/lib/gameSelectStore";
import { useMatchState } from "@/lib/matchStore";
import { useTeamState } from "@/lib/teamStore";
import useBettingMutation from "@/app/(service)/(landing)/_lib/useBettingMutation";
import { ImageLoaderProps } from "@/model/match";

export default function BettingPhaseTwo() {
    const { data: session } = useSession();
    const [point, setPoint] = useState<number>(0);
    const [error, setError] = useState<string>("");
    const { setBet, betInfo } = useSelectedGameStore();
    const { mutation } = useBettingMutation({ setError });
    const match = useMatchState((state) => state);
    const team = useTeamState((state) => state);

    const handleConfirm = useCallback(() => {
        setBet(match.id, team.code, point);
        mutation.mutate({
            matchId: match.id,
            teamCode: team.code,
            point,
        });
    }, [match.id, team.code, point, mutation, setBet]);

    const handleIncrement = () => {
        setPoint((prevPoint) => {
            const newPoint = prevPoint + 100;
            return newPoint > session?.user?.point ? prevPoint : newPoint;
        });
    };

    const handleDecrement = () => {
        setPoint((prevPoint) =>
            prevPoint >= 100 ? prevPoint - 100 : prevPoint,
        );
    };

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 1, x: 400 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 1, x: -800 }}
                transition={{ duration: 0.7 }}
                className="flex h-full w-full items-center justify-center font-semibold text-white"
            >
                {error}
            </motion.div>
        );
    }

    const teamImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
        return `${team.image}?w=${width}&q=${quality || 75}`;
    };

    return (
        <>
            <motion.div
                key="phaseTwo"
                initial={{ opacity: 1, x: 700 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 1, x: -400 }}
                transition={{ duration: 0.7 }}
                className="flex flex-col justify-center px-2 text-center font-semibold text-white"
            >
                <div className="flex flex-col items-center justify-center gap-8 py-5 text-center font-semibold text-white">
                    <div>
                        <div>{team.code}</div>
                        <div className="flex justify-center">
                            <Image
                                loader={teamImageLoader}
                                src={team.image}
                                alt={team.name}
                                width={100}
                                height={100}
                            />
                        </div>
                        <div>{team.name}</div>
                    </div>
                    <div>
                        <div className="flex flex-row items-center">
                            <span>내 포인트 : </span>
                            <span>{session?.user?.point}</span>
                            <Image
                                src="/pointbeed.png"
                                alt="point"
                                width={20}
                                height={20}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.3 }}
                            className="rounded px-4 py-2"
                            onClick={handleDecrement}
                        >
                            <Image
                                src="/chevron-down.svg"
                                alt="chevron-down"
                                width={20}
                                height={20}
                            />
                        </motion.button>
                        <span className="text-3xl font-bold">{point}</span>
                        <motion.button
                            className="rounded px-4 py-2"
                            onClick={handleIncrement}
                        >
                            <Image
                                src="/chevron-up.svg"
                                alt="chevron-up"
                                width={20}
                                height={20}
                            />
                        </motion.button>
                    </div>

                    <div className="flex items-center justify-center text-center text-base">
                        <motion.button
                            disabled={point < 99}
                            whileHover={{ scale: 1.1 }}
                            className="mt-2 inline-block w-32 cursor-pointer rounded bg-blue-800 px-2 py-2 text-white ease-in-out hover:bg-blue-300 hover:font-semibold"
                            onClick={handleConfirm}
                        >
                            확인
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
